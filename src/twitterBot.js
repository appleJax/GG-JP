import DB from './dbOps';
import {
  HOURS,
  addLinks,
  calculateScore,
  getTimeUntil,
  tryCatch
} from 'Utils';
import {
  postMedia,
  retrieveAndCountMissedReplies
} from 'Utils/twitter';
import { evaluateResponse } from './evaluateTwitterReply';
import Twitter from './twitterConfig';
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

  const startTimes = [ 2, 8, 14, 20 ].map(getTimeUntil);
  const timeUntilTweet = Math.min(...startTimes);
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
    const scheduledAnswerTime = new Date(questionPostedAt).getTime() + 24*HOURS;
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
    questionText,
    questionImg,
    questionAltText,
    prevLineImg,
    prevLineAltText,
    answers
  } = await tryCatch(DB.getRandomQuestion());
  if (!cardId) return;

  const {
    questionId,
    questionPostedAt,
    mediaUrls
  } = await tryCatch(
    postMedia(
      questionText,
      questionImg,
      questionAltText,
      prevLineImg,
      prevLineAltText
    )
  );

  const liveQuestion = {
    cardId,
    questionId,
    questionText,
    answers,
    questionPostedAt,
    cachedPoints: [],
    alreadyAnswered: []
  };
  DB.addLiveQuestion(liveQuestion, mediaUrls);
  setTimeout(() => tweetAnswer(cardId, questionId), ANSWER_INTERVAL);
}

async function tweetAnswer(cardId, questionId) {
  const {
    answerText,
    answerImg,
    answerAltText
  } = await tryCatch(
    // EFFECTS:
    // - removes question from liveQuestions
    // - adds cached points to scoreboard
    //
    // RETURNS:
    // AnswerCard
    DB.revealAnswerWorkflow(cardId)
  );

  const { mediaUrls } = await tryCatch(
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
  // - adds answerCard to recentAnswers collection
  DB.processAnswerCard(cardId, mediaUrls);
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
