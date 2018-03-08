import DB from './dbOps';
import { createUserObject } from 'Utils/db'
const { TWITTER_ACCOUNT } = process.env;
import {
  calculateScore,
  calculateTimeToAnswer,
  contains,
  extractAnswer,
  tryCatch
} from 'Utils';


export function evaluateResponse({
  in_reply_to_status_id_str: questionId,
  created_at: replyPostedAt,
  text,
  user,
  user: {
    id_str: userId,
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

    if (!foundQuestion) {
      resolve();
      return;
    }

    const {
      alreadyAnswered,
      answers: acceptedAnswers
    } = foundQuestion;

    if (contains(userId, alreadyAnswered)) {
      resolve();
      return;
    }

    const newUser = await tryCatch(
      createUserObject(user)
    );
    DB.addOrUpdateUser(newUser);

    replyPostedAt = new Date(replyPostedAt).getTime();
    const timeToAnswer = calculateTimeToAnswer(replyPostedAt, foundQuestion);

    const userAnswer = extractAnswer(text);
    if (contains(userAnswer, acceptedAnswers)) {
      const points = calculateScore(replyPostedAt, foundQuestion);
      if (points >= 0) {
        await tryCatch(
          DB.cachePoints(
            questionId,
            { userId, points, timeToAnswer }
          )
        );
      }

    } else {
      await tryCatch(
        DB.cachePoints(
          questionId,
          { userId, points: 0, timeToAnswer }
        )
      );
    }
  });
}
