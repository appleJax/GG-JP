const DB = require('./dbOps');
const { tryCatch } = require('./utils');

const {
  TWITTER_API_KEY,
  TWITTER_API_SECRET,
  TWITTER_TOKEN,
  TWITTER_TOKEN_SECRET,
  TWITTER_ACCOUNT
} = process.env;

const twit = require('twit');

const appConfig = {
  consumer_key: TWITTER_API_KEY,
  consumer_secret: TWITTER_API_SECRET,
  app_only_auth: true
}

const userConfig = {
  consumer_key: TWITTER_API_KEY,
  consumer_secret: TWITTER_API_SECRET,
  access_token: TWITTER_TOKEN,
  access_token_secret: TWITTER_TOKEN_SECRET
};

const Twitter = new twit(userConfig);
const HOURS = 3600000;

async function tweetRandomQuestion() {
  const {
    cardId,
    questionText,
    questionImg,
    questionAltText,
    prevLineImg,
    prevLineAltText
  } = await tryCatch(DB.getRandomQuestion());
  if (!cardId) return;

  const questionId = await tryCatch(
    postMedia(questionText, questionImg, questionAltText, prevLineImg, prevLineAltText)
  );
  setTimeout(() => tweetCardAnswer(cardId, questionId), 2000);
}

async function tweetCardAnswer(cardId, questionId, pollRepliesTimer) {
  const {answerText, answerImg, answerAltText} = await tryCatch(
    DB.getCardAnswer(cardId)
  );
  const questionLink = `\ntwitter.com/${TWITTER_ACCOUNT}/status/${questionId}`;
  postMedia(answerText + questionLink, answerImg, answerAltText);
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

//
//  search twitter for all tweets containing the given hashtag
//
function searchTwitter(hashtag) {
  Twitter.get('search/tweets', { q: `#${hashtag}` }, (err, data, response) => {
    if (err) console.log('Error:', err);
    const matches = data.statuses.map(item => {
      const {
        created_at,
        text,
        user: {
          id,
          name,
          screen_name: handle,
          profile_img_url_https: avatar
        }
      } = item;

      return { text, name, handle, avatar };
    })
    console.log('Matches:', matches);
  });
}

function searchReply(questionId) {
  const stream = Twitter.stream('statuses/filter', { track: '@devTest222' })

  stream.on('tweet', (tweet) => {
    console.log(tweet);
  });
  // https://twitter.com/devTest222/status/956429745784348673
  // in_reply_to_status_id_str: questionId
  // tweet: { created_at, text, user: { id, name, screen_name, profile_image_url_https }}
  // Twitter.get('statuses/mentions_timeline', { since_id: questionId }, (err, data, response) => {
  //   if (err) console.log('Error:', err);
  //   console.log('Data:', data);
  // });
}


module.exports = {
  //start: () => setInterval(tweetRandomCard, 2*HOURS)
  start: () => setInterval(tweetRandomQuestion, 5000)
  // start: () => setInterval(searchReply, 5000)
};
