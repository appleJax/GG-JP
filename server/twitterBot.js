const DB = require('./dbOps');
const { HOURS, tryCatch, calculateScore } = require('./utils');
const Twitter = require('./twitterConfig');

module.exports = {
  // start: () => setInterval(tweetRandomCard, 2*HOURS)
  // start: () => setTimeout(() => searchReply('956774024440315904', '回'), 1000)
  start: initializeBot
};

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

  const questionId = await tryCatch(
    postMedia(
      questionText,
      questionImg,
      questionAltText,
      prevLineImg,
      prevLineAltText
    )
  );
  DB.addToLiveQuestions({cardId, questionId, answers});
  setTimeout(() => tweetAnswer(cardId, questionId), 2000);
  //setTimeout(() => tweetAnswer(cardId, questionId), 24*HOURS);
}

async function tweetAnswer(cardId, questionId) {
  const {
    answerText,
    answerImg,
    answerAltText
  } = await tryCatch(
    DB.getAnswer(cardId)
  );
  const questionLink = `\ntwitter.com/${TWITTER_ACCOUNT}/status/${questionId}`;
  postMedia(
    answerText + questionLink,
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
      media_ids.push(media_id2);
    }

    const params = { status, media_ids };
    Twitter.post('statuses/update', params, (err, data, response) => {
      if (err) {
        console.error(err)
        reject("Posting status failed.");
      };
      resolve(data.id_str);
    });
  });
}

//
// uploads a single image with altText to Twitter
// returns media_id which is necessary for
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

async function openStream() {
  const stream = Twitter.stream('statuses/filter', { track: `@${TWITTER_ACCOUNT}` });

  stream.on('tweet', ({
    in_reply_to_status_id_str: questionId,
    created_at: answerPostedAt,
    text,
    user: {
      id: userId,
      name,
      screen_name: handle,
      profile_image_url_https: avatar
    }
  }) => {
    const liveQuestions = await tryCatch(DB.getLiveQuestions());
    const foundQuestion = liveQuestions.filter(obj => obj.questionId === questionId)[0];
    console.log('Live Questions:\n', liveQuestions);
    console.log('Found Question:\n', foundQuestion);

    if (foundQuestion) {
      const {
        alreadyAnswered,
        answers: acceptedAnswers
      } = foundQuestion;
      if (contains(userId, alreadyAnswered))
        return;

      const userAnswer = text.trim().slice(TWITTER_ACCOUNT.length + 2);
      if (contains(userAnswer, acceptedAnswers)) {
        console.log(`Congratulations ${name}, you got it right!`);
        const points = calculateScore(answerPostedAt, foundQuestion);
        const reply = {
          userId,
          name,
          handle,
          avatar,
          answerPostedAt,
          questionId,
          answer: userAnswer,
          points
        };
        DB.postNewScore(reply);
      }
      console.log('Reply to question:\n', reply);
      return;
    }
    console.log('Another mention...')
  });

  stream.on('disconnect', (disconnectMsg) => {
    console.error('Tweet stream disconnected:', disconnectMsg);
    setTimeout(() => stream.start(), 100);
  });
}

function initializeBot() {
  openStream();
  setInterval(tweetRandomQuestion, 2*HOURS);
}
