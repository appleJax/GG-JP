import DB from 'DB/ops';
import { createUserObject } from 'DB/utils';
import { fetchTwitterUser } from 'Twitter/utils';
import {
  calculateScore,
  calculateTimeToAnswer,
  contains,
  parseDM,
  tryCatch
} from 'Utils';

const { TWITTER_ACCOUNT } = process.env;


export default async function evaluateResponse({
  created_timestamp: replyPostedAt,
  message_create: {
    sender_id: userId,
    message_data: {
      text
    }
  }
}) {
  const [ cardId, userAnswer ] = parseDM(text);

  const liveQuestions = await tryCatch(DB.getLiveQuestions());
  const foundQuestion = liveQuestions.find(
    questionCard => questionCard.cardId === cardId
  );

  if (!foundQuestion)
    return;

  const {
    alreadyAnswered,
    answers: acceptedAnswers
  } = foundQuestion;

  if (contains(userId, alreadyAnswered))
    return;

  const user = await tryCatch(
    fetchTwitterUser(userId)
  );

  const newUser = await tryCatch(
    createUserObject(user)
  );
  DB.addOrUpdateUser(newUser);

  replyPostedAt = new Date(+replyPostedAt).getTime();
  const timeToAnswer = calculateTimeToAnswer(replyPostedAt, foundQuestion);

  if (contains(userAnswer, acceptedAnswers)) {
    const points = calculateScore(replyPostedAt, foundQuestion);
    if (points >= 0) {
      await tryCatch(
        DB.cachePoints(
          cardId,
          { answer: userAnswer, userId, points, timeToAnswer }
        )
      );
    }

  } else {
    await tryCatch(
      DB.cachePoints(
        cardId,
        { answer: userAnswer, userId, points: 0, timeToAnswer }
      )
    );
  }
}