import DB from 'DB/ops';
import {
  fillTweetQueue,
  getNextCardToTweet
} from 'DB/tweetQueue';
import Twitter from 'Config/twitter';
//import evaluateResponse from './evaluateResponse';
import {
  HOURS,
  addLink,
  getTimeTilNextTweet,
  getTimeUntil,
  tryCatch
} from 'Utils';
import {
  formatTopTenTweet,
  postMedia,
  postTweet,
  processDMs
} from 'Twitter/utils';

const {
  BOT_URL,
  TWITTER_ACCOUNT
} = process.env;

const ANSWER_INTERVAL = 24*HOURS;
const QUESTION_INTERVAL = 6*HOURS;
const POLL_DM_INTERVAL = 90*1000;


export default ({

  // tweet() {
  //   tweetRandomQuestion();
    // pollDMs();
  // },

  // listen() {
  //   pollDMs();
  // },

  // register() {
  //   Twitter.post('account_activity/webhooks',
  //   { url: `${BOT_URL}/webhook/twitter` },
  //   (err, data, response) => {
  //     console.log('Error:', err);
  //     console.log('Data:', data);
  //   });
  // },

  start() {
    //openStream();
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
    questionImages,
    questionAltText,
    prevLineImages,
    prevLineAltText,
    answers
  } = await tryCatch(getNextCardToTweet());
  if (!cardId) return;

  const {
    mediaUrls,
    postedAt: questionPostedAt,
    tweetId:  questionId
  } = await tryCatch(
    postMedia(
      questionText,
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
      addLink(answerText, questionId),
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

// function openStream() {
//   const stream = Twitter.stream(
//     'statuses/filter',
//     { track: `@${TWITTER_ACCOUNT}` }
//   );
//   stream.on('tweet', evaluateResponse);

//   stream.on('disconnect', (disconnectMsg) => {
//     console.error('Tweet stream disconnected:', disconnectMsg);
//     setTimeout(() => stream.start(), 100);
//   });
// }

async function tweetTopTen(category = 'monthlyStats') {
  const topTen = await DB.fetchTopTen(category);
  const status = formatTopTenTweet(topTen, category);

  postTweet(status)
}

async function updateStats() {
  const now = new Date();
  const newWeek  = now.getUTCDay()  === 0;
  const newMonth = now.getUTCDate() === 1;
  const newYear = newMonth && now.getUTCMonth() === 0;

  if (newWeek)  await tryCatch(tweetTopTen('weeklyStats'));
  if (newMonth) await tryCatch(tweetTopTen('monthlyStats'));

  await tryCatch(
    DB.updateStats(newWeek, newMonth, newYear)
  );
}
