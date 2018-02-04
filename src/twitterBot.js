const DB = require('./dbOps');
const {
  HOURS,
  addQuestionLink,
  calculateScore,
  contains,
  extractAnswer,
  getTimeUntil,
  postMedia,
  tryCatch
} = require('Utils');
const Twitter = require('./twitterConfig');
const { TWITTER_ACCOUNT } = process.env;

const ANSWER_INTERVAL = 40000;
let QUESTION_INTERVAL = 30000;

module.exports = {
  start: () => {
    openStream();
    setStartTimes();
  }
};

function setStartTimes() {
  const timeUntil7PM = getTimeUntil(19);
  const timeUntilMidnight = getTimeUntil(0);

  setTimeout(() => {
    setInterval(tweetRandomQuestion, QUESTION_INTERVAL);
  }, timeUntil7PM);

  setTimeout(() => {
    setInterval(weeklyMonthlyReset, 24*HOURS);
  }, timeUntilMidnight);
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
    questionPostedAt
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
    answers,
    questionPostedAt,
    cachedPoints: [],
    alreadyAnswered: []
  };
  DB.addLiveQuestion(liveQuestion);
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

  postMedia(
    addQuestionLink(answerText, questionId),
    answerImg,
    answerAltText
  );
}

function openStream() {
  const stream = Twitter.stream('statuses/filter', { track: `@${TWITTER_ACCOUNT}` });

  stream.on('tweet', async ({
    in_reply_to_status_id_str: questionId,
    created_at: answerPostedAt,
    text,
    user: {
      id: userId,
      name,
      screen_name: handle,
      profile_image_url_https: avatar,
      profile_banner_url: profileBanner
    }
  }) => {
    const liveQuestions = await tryCatch(DB.getLiveQuestions());
    const foundQuestion = liveQuestions.filter(
      obj => obj.questionId === questionId
    )[0];

    if (foundQuestion) {
      const {
        alreadyAnswered,
        answers: acceptedAnswers
      } = foundQuestion;
      if (contains(userId, alreadyAnswered))
        return;

      const userAnswer = extractAnswer(text);
      if (contains(userAnswer, acceptedAnswers)) {
        const points = calculateScore(answerPostedAt, foundQuestion);
        const following = await tryCatch(getFollowing(userId));
        const newUser = {
          userId,
          name,
          handle,
          avatar,
          profileBanner,
          following,
          score: 0,
          monthlyScore: 0,
          weeklyScore: 0,
          correctAnswers: []
        };
        DB.addNewUser(newUser);
        DB.updateLiveQuestion(questionId, { userId, points });

      } else {
        DB.updateLiveQuestion(questionId, { userId, points: 0 });
      }
    }
  });

  stream.on('disconnect', (disconnectMsg) => {
    console.error('Tweet stream disconnected:', disconnectMsg);
    setTimeout(() => stream.start(), 100);
  });
}

function weeklyMonthlyReset() {
  const now = Date.now();
  const resetWeeklyScore = now.getDay() === 0;
  const resetMonthlyScore = now.getDate() === 1;

  if (resetWeeklyScore || resetMonthlyScore)
    DB.weeklyMonthlyReset(resetWeeklyScore, resetMonthlyScore);
}
