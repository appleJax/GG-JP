const DB = require('./dbOps');
const {
  HOURS,
  addQuestionLink,
  calculateScore,
  contains,
  extractAnswer,
  tryCatch
} = require('./utils');
const Twitter = require('./twitterConfig');
const { TWITTER_ACCOUNT } = process.env;

const [QUESTION_INTERVAL, ANSWER_INTERVAL] = [5000, 40000];

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
    // - adds cached points to scoreBoard
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

//
// post a tweet with media
//
function postMedia(status, b64Image1, altText1, b64Image2, altText2) {
  return new Promise(async (resolve, reject) => {
    const media_id1 = await tryCatch(uploadMedia(b64Image1, altText1));
    const media_ids = [media_id1];
    if (b64Image2) {
      const media_id2 = await tryCatch(uploadMedia(b64Image2, altText2));
      media_ids.unshift(media_id2);
    }

    const params = { status, media_ids };
    Twitter.post('statuses/update', params, (err, data, response) => {
      if (err) {
        console.error(err)
        reject("Posting status failed.");
      };
      const result = {
        questionId:       data.id_str,
        questionPostedAt: data.created_at
      };
      resolve(result);
    });
  });
}

// EFFECTS:
// uploads a single image with altText to Twitter
//
// RETURNS:
// media_id which is necessary for
// attaching media to a tweet
//
function uploadMedia(b64Image, altText) {
  return new Promise((resolve, reject) => {
    // first we must post the media to Twitter
    Twitter.post('media/upload', { media_data: b64Image }, (err, data, response) => {
      if (err) {
        console.error(err);
        reject("Media upload failed.")
        return;
      }
      // now we can assign alt text to the media, for use by screen readers and
      // other text-based presentations and interpreters
      const mediaIdStr = data.media_id_string;
      const meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

      Twitter.post('media/metadata/create', meta_params, (err, data, response) => {
        if (err) {
          console.error(err);
          reject("Media upload succeeded, media creation failed.");
        }
        // now we can reference the media and post a tweet (media will attach to the tweet)
        resolve(mediaIdStr);
      });
    });
  });
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
      profile_background_image_url_https: profileBackground
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
        const newUser = {
          userId,
          name,
          handle,
          avatar,
          profileBackground,
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
