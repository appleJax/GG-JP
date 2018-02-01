const DB = require('./dbOps');
const {
  HOURS,
  addQuestionLink,
  calculateScore,
  contains,
  extractAnswer,
  tryCatch,
  getFollowing,
  postMedia
} = require('Utils');
const Twitter = require('./twitterConfig');
const { TWITTER_ACCOUNT } = process.env;

const [QUESTION_INTERVAL, ANSWER_INTERVAL] = [30000, 40000];

module.exports = {
  start: initializeBot
};

function initializeBot() {
  openStream();
  setInterval(tweetRandomQuestion, QUESTION_INTERVAL);
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
