import Models from 'Models';
import Twitter from 'Config/twitter';
import { tryCatch }     from 'Utils';

const { TWITTER_ACCOUNT } = process.env;
const { LiveQuestion } = Models;


export async function issueAnswerCorrection(req) {
  const { 
    body: {
      cardId,
      wrongAnswer,
      newHint
    }
  } = req;

  const cardToCorrect = await tryCatch(
    LiveQuestion
      .findOne({ cardId })
      .select({
        _id: 0,
        questionId: 1,
        questionText: 1,
        userPoints: 1
      })
      .lean()
      .exec()
  );
  
  const usersToNotify = cardToCorrect
    .userPoints
    .filter(
      submission => submission.answer === wrongAnswer.trim()
    ).map(
      submission => submission.userId
    );

  const correctionTextDM = 'Thank you for helping to make GameGogakuen even better! ' +
    `Your guess for QID${cardId} (${wrongAnswer}) was a perfectly possible answer, ` +
    'but it is not the word that the game used, and we failed to catch it in the hints beforehand.' +
    'We are giving you a 2nd guess to try and salvage some points rather than leave you with no points. ' +
    `The question's hint should have been "${newHint}". ` +
    'Thanks again for playing!';

  let currentUser;
  for (let i = 0; i < usersToNotify.length; i++) {
    currentUser = usersToNotify[i];

    const params = {
      event: {
        type: 'message_create',
        message_create: {
          target: {
            recipient_id: currentUser
          }
        },
        message_data: {
          text: correctionTextDM
        }
      }
    }
    await tryCatch(
      Twitter.post('direct_messages/events/new', params)
    );
  }

  const correctionStatus = `@${TWITTER_ACCOUNT} NOTE: We have been notified of an error after this tweet went live.` +
    `\nThe hint should have been as follows: "${newHint}"`;

  const params = {
    status: correctionStatus,
    in_reply_to_status_id: cardToCorrect.questionId
  };

  await tryCatch(
    Twitter.post('statuses/update', params)
  );

  const newHintLine = `Hint: ${newHint}`;
  let newQuestionText = cardToCorrect.questionText.split('\n');
  const replaceHintIfPresent = newQuestionText[1].startsWith('Hint:')
    ? 1
    : 0;

  newQuestionText.splice(1, replaceHintIfPresent, newHintLine);
  newQuestionText = newQuestionText.join('\n');

  const newUserPoints = cardToCorrect.userPoints.filter(
    submission => submission.answer !== wrongAnswer.trim()
  );

  await tryCatch(
    LiveQuestion.updateOne(
      { cardId },
      { $set: {
          questionText: newQuestionText,
          userPoints: newUserPoints
        }
      }
    ).exec()
  );
}