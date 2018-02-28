import DB from './dbOps';
const { TWITTER_ACCOUNT } = process.env;
import {
  calculateScore,
  contains,
  extractAnswer,
  tryCatch
} from 'Utils';
import { getFollowing } from 'Utils/twitter'


export function evaluateResponse({
  in_reply_to_status_id_str: questionId,
  created_at: replyPostedAt,
  text,
  user: {
    id: userId,
    name,
    screen_name: handle,
    profile_image_url_https: avatar,
    profile_banner_url: profileBanner
  }
}) {
  return new Promise(async (resolve, reject) => {
    const liveQuestions = await tryCatch(DB.getLiveQuestions());
    const foundQuestion = liveQuestions.find(
      questionCard => questionCard.questionId === questionId
    );

    if (foundQuestion) {
      const {
        alreadyAnswered,
        answers: acceptedAnswers
      } = foundQuestion;
      if (contains(userId, alreadyAnswered)) {
        resolve();
        return;
      }

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
          incorrect: [],
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
        replyPostedAt = new Date(replyPostedAt).getTime();
        const points = calculateScore(replyPostedAt, foundQuestion);
        if (points >= 0) {
          await tryCatch(
            DB.updateLiveQuestion(questionId, { userId, points })
          );
        }
      } else {
        await tryCatch(DB.updateLiveQuestion(questionId, { userId, points: 0 }));
      }
    }
    resolve();
  });
}
