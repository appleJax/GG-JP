const DB = require('./dbOps');

const {
  TWITTER_API_KEY,
  TWITTER_API_SECRET,
  TWITTER_TOKEN,
  TWITTER_TOKEN_SECRET
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


function consoleRandomCard() {
  DB.getRandomCard()
    .then(({ questionImg, reading, expression }) =>
      console.log(questionImg, reading, expression));
}

//
// tweet a random anki card
//
function tweetRandomCard() {
  DB.getRandomCard()
    .then(({ questionImg, reading, expression }) =>
      postMedia(questionImg, reading, expression));
}

//
// post a tweet with media
//
function postMedia(b64Image, altText, message) {
  // first we must post the media to Twitter
  Twitter.post('media/upload', { media_data: b64Image }, (err, data, response) => {
    // now we can assign alt text to the media, for use by screen readers and
    // other text-based presentations and interpreters
    const mediaIdStr = data.media_id_string;
    const meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

    Twitter.post('media/metadata/create', meta_params, (err, data, response) => {
      if (!err) {
        // now we can reference the media and post a tweet (media will attach to the tweet)
        const params = { status: message, media_ids: [mediaIdStr] };

        Twitter.post('statuses/update', params, (err, data, response) => {
          // console.log(data);
        });
      }
    });
  });
}

//
//  search twitter for all tweets containing the given hashtag
//
function searchTwitter(hashtag) {
  console.log('Searching twitter...')
  Twitter.get('search/tweets', { q: `#${hashtag}` }, (err, data, response) => {
    if (err) console.log('Error:', err);
    const matches = data.statuses.map(item => {
      const {
        text,
        user: {
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


module.exports = {
  //start: () => setInterval(tweetRandomCard, 2*HOURS)
  start: () => setInterval(tweetRandomCard, 5000)
};
