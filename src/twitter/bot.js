import DB from 'DB/ops';
import {
  fillTweetQueue,
  getNextCardToTweet
} from 'DB/tweetQueue';
import {
  HOURS,
  getTimeTilNextTweet,
  getTimeTilUpdates,
  tryCatch
} from 'Utils';
import {
  formatHardestQuestionTweet,
  formatTopTenTweet,
  postMedia,
  postTweet,
  processDMs
} from 'Twitter/utils';
import {
  addSponsor,
  formatAnswerStatus
} from 'DB/utils';


const ANSWER_INTERVAL = 24 * HOURS;
const QUESTION_INTERVAL = 6 * HOURS;
const POLL_DM_INTERVAL = 90 * 1000;


export default ({

  // tweet() {
  //   tweetQuestion();
  //   pollDMs();
  // },

  start() {
    scheduleActions();
  }

});

async function scheduleActions() {
  await pollDMs();
  await tryCatch(fillTweetQueue(5));
  const liveQuestions = await tryCatch(DB.getLiveQuestions());
  if (liveQuestions.length > 0) {
    tweetOrScheduleAnswers(liveQuestions);
  }

  const timeUntilTweet = getTimeTilNextTweet();
  const timeUntilUpdates = getTimeTilUpdates();

  setTimeout(() => {
    tweetQuestion();
    setInterval(tweetQuestion, QUESTION_INTERVAL);
  }, timeUntilTweet);

  setTimeout(() => {
    updateStats();
    setInterval(updateStats, 24*HOURS);
  }, timeUntilUpdates);
}

function tweetOrScheduleAnswers(liveQuestions) {
  liveQuestions.forEach(({ cardId, questionId, questionPostedAt }) => {
    const scheduledAnswerTime = questionPostedAt + 24 * HOURS;
    const now = new Date().getTime();

    if (scheduledAnswerTime < now) {
      tweetAnswer(cardId, questionId);
    } else {
      const after24Hours = scheduledAnswerTime - now;
      setTimeout(() => tweetAnswer(cardId, questionId), after24Hours);
    }
  });
}

async function tweetQuestion() {
  const {
    cardId,
    game,
    questionText,
    questionImages,
    questionAltText,
    prevLineImages,
    prevLineAltText,
    answers
  } = await tryCatch(getNextCardToTweet());
  if (!cardId) return;

  const status = await tryCatch(
    addSponsor(questionText)
  );

  const {
    mediaUrls,
    postedAt: questionPostedAt,
    tweetId:  questionId
  } = await tryCatch(
    postMedia(
      status,
      questionImages,
      questionAltText,
      prevLineImages,
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
    answerImages,
    answerAltText,
    userPoints
  } = await tryCatch(
    DB.getAnswerCard(cardId)
  );

  const status = await tryCatch(
    formatAnswerStatus(answerText, questionId, userPoints)
  );

  const {
    mediaUrls,
    postedAt: answerPostedAt,
    tweetId:  answerId
  } = await tryCatch(
    // Tweet the answer
    postMedia(
      status,
      answerImages,
      answerAltText
    )
  );

  // EFFECTS:
  // - fetches/processes DM replies
  // - removes base64 answer images from card
  // - adds mediaUrls to card
  // - adds userPoints to scoreboard
  // - moves card from LiveQuestion to OldCard
  DB.processAnswerWorkflow(answerId, answerPostedAt, cardId, mediaUrls);
}

async function pollDMs() {
  await processDMs();
  setInterval(processDMs, POLL_DM_INTERVAL);
}

async function tweetHardestQuestion() {
  const hardestQuestion = await DB.getHardestQuestion();
  const status = formatHardestQuestionTweet(hardestQuestion);

  return postTweet(status);
}

async function tweetTopTen(category = 'monthlyStats') {
  const topTen = await DB.fetchTopTen(category);
  const status = formatTopTenTweet(topTen, category);

  return postTweet(status)
}

async function updateStats() {
  const now = new Date().getTime();
  const tomorrow = new Date(now + 4 * HOURS);

  const newWeek = tomorrow.getUTCDay() === 0;
  const newMonth = tomorrow.getUTCDate() === 1;
  const newYear = newMonth && tomorrow.getUTCMonth() === 0;

  if (newWeek) {
    await tryCatch(tweetHardestQuestion());
    await tryCatch(tweetTopTen('weeklyStats'));
  }

  if (newMonth) await tryCatch(tweetTopTen('monthlyStats'));

  setTimeout(() => {
    DB.updateStats(newWeek, newMonth, newYear);
  }, 3*HOURS);
}