import DB                   from './dbOps';
import Twitter              from 'Config/twitterBot';
import { evaluateResponse } from './evaluateTwitterReply';
import {
  HOURS,
  addLinks,
  getTimeTilNextTweet,
  getTimeUntil,
  tryCatch
} from 'Utils';
import {
  postMedia,
  retrieveAndCountMissedReplies
} from 'Utils/twitter';

const { TWITTER_ACCOUNT } = process.env;

const ANSWER_INTERVAL = 24*HOURS;
const QUESTION_INTERVAL = 6*HOURS;

export default ({

  start() {
    openStream();
    scheduleActions();
  }

});

async function scheduleActions() {
  const liveQuestions = await tryCatch(DB.getLiveQuestions());
  if (liveQuestions.length > 0) {
    await retrieveAndCountMissedReplies(liveQuestions);
    tweetOrScheduleAnswers(liveQuestions);
  }

  const timeUntilTweet = getTimeTilNextTweet();
  const timeUntilMidnight = getTimeUntil(0);

  setTimeout(() => {
    tweetRandomQuestion();
    setInterval(tweetRandomQuestion, QUESTION_INTERVAL);
  }, timeUntilTweet);

  setTimeout(() => {
    updateStats();
    setInterval(updateStats, 24*HOURS);
  }, timeUntilMidnight);
}

function tweetOrScheduleAnswers(liveQuestions) {
  liveQuestions.forEach(({ cardId, questionId, questionPostedAt }) => {
    const scheduledAnswerTime = questionPostedAt + 24*HOURS;
    const now = new Date().getTime();

    if (scheduledAnswerTime < now) {
      tweetAnswer(cardId, questionId);
    } else {
      const after24Hours = scheduledAnswerTime - now;
      setTimeout(() => tweetAnswer(cardId, questionId), after24Hours);
    }
  });
}

async function tweetRandomQuestion() {
  const {
    cardId,
    game,
    questionText,
    questionImg,
    questionAltText,
    prevLineImg,
    prevLineAltText,
    answers
  } = await tryCatch(DB.getRandomQuestion());
  if (!cardId) return;

  const {
    mediaUrls,
    postedAt: questionPostedAt,
    tweetId:  questionId
  } = await tryCatch(
    postMedia(
      questionText,
      questionImg,
      questionAltText,
      prevLineImg,
      prevLineAltText
    )
  );

  const update = {
    cardId,
    mediaUrls,
    questionId,
    questionPostedAt
  };
  DB.updateLiveQuestion(update);
  setTimeout(() => tweetAnswer(cardId, questionId), ANSWER_INTERVAL);
}

async function tweetAnswer(cardId, questionId) {
  const {
    answerText,
    answerImg,
    answerAltText
  } = await tryCatch(
    DB.getAnswerCard(cardId)
  );

  const {
    mediaUrls,
    postedAt: answerPostedAt,
    tweetId:  answerId
  } = await tryCatch(
    // Tweet the answer
    postMedia(
      addLinks(answerText, questionId),
      answerImg,
      answerAltText
    )
  );

  // EFFECTS:
  // - adds mediaUrl to card
  // - removes base64 image from card
  // - adds userPoints to scoreboard
  // - moves card from liveQuestions to oldCards
  DB.processAnswerWorkflow(answerId, answerPostedAt, cardId, mediaUrls[0]);
}

function openStream() {
  const stream = Twitter.stream(
    'statuses/filter',
    { track: `@${TWITTER_ACCOUNT}` }
  );
  stream.on('tweet', evaluateResponse);

  stream.on('disconnect', (disconnectMsg) => {
    console.error('Tweet stream disconnected:', disconnectMsg);
    setTimeout(() => stream.start(), 100);
  });
}

function updateStats() {
  const now = new Date();
  const resetWeeklyStats  = now.getUTCDay()  === 0;
  const resetMonthlyStats = now.getUTCDate() === 1;
  DB.updateStats(resetWeeklyStats, resetMonthlyStats);
}
