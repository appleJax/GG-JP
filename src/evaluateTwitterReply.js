const DB = require('./dbOps');
const { TWITTER_ACCOUNT } = process.env;
const {
  calculateScore,
  contains,
  extractAnswer,
  getFollowing,
  tryCatch
} = require('Utils');


module.exports = {
  evaluateResponse({
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
},
liveQuestions
) {
  return new Promise(async (resolve, reject) => {
    console.log('DB', DB);
    if (!liveQuestions)
      liveQuestions = await tryCatch(DB.getLiveQuestions());

    const foundQuestion = liveQuestions.find(
      questionCard => questionCard.questionId === questionId
    );

    if (foundQuestion) {
      const {
        alreadyAnswered,
        answers: acceptedAnswers
      } = foundQuestion;
      if (contains(userId, alreadyAnswered))
        return;

      const following = await tryCatch(getFollowing(userId));
      const newUser = {
        userId,
        name,
        handle,
        avatar,
        profileBanner,
        following,
        allTimeStats: {
          attempts: 0,
          correct: [],
          score: 0
        },
        monthlyStats: {
          attempts: 0,
          correct: 0,
          score: 0,
          average: {
            n: 0,
            value: 0
          }
        },
        weeklyStats: {
          attempts: 0,
          correct: 0,
          score: 0,
          average: {
            n: 0,
            value: 0
          }
        },
        dailyStats: {
          attempts: 0,
          correct: 0,
          score: 0,
          average: {
            n: 0,
            value: 0
          }
        }
      };
      await tryCatch(DB.addOrUpdateUser(newUser));

      const userAnswer = extractAnswer(text);
      if (contains(userAnswer, acceptedAnswers)) {
        const points = calculateScore(answerPostedAt, foundQuestion);
        await tryCatch(DB.updateLiveQuestion(questionId, { userId, points }));

      } else {
        await tryCatch(DB.updateLiveQuestion(questionId, { userId, points: 0 }));
      }
    }
    resolve();
  });
}
}
