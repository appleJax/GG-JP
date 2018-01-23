if (process.env.NODE_ENV == 'dev')
  require('dotenv').config();

const {
  TWITTER_API_KEY,
  TWITTER_API_SECRET,
  TWITTER_TOKEN,
  TWITTER_TOKEN_SECRET
} = process.env;

const twit = require('twit');

const config = {
  consumer_key: TWITTER_API_KEY,
  consumer_secret: TWITTER_API_SECRET,
  access_token: TWITTER_TOKEN,
  access_token_secret: TWITTER_TOKEN_SECRET
};

const Twitter = new twit(config);
const HOURS = 3600000;

//
// post a text-only tweet
//
function tweetRandomMessage() {
  const randNum = Math.round(Math.random() * 999999);
  Twitter.post('statuses/update', { status: `Message #${randNum}` }, (err, data, response) => {
    if (err) console.error(err);
    console.log('Data:', data);
  });
}

//
// post a tweet with media
//
function postMedia() {
  const b64content = fs.readFileSync('/path/to/img', { encoding: 'base64' });

  // first we must post the media to Twitter
  Twitter.post('media/upload', { media_data: b64content }, (err, data, response) => {
    // now we can assign alt text to the media, for use by screen readers and
    // other text-based presentations and interpreters
    const mediaIdStr = data.media_id_string;
    const altText = 'Some alt text';
    const meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

    Twitter.post('media/metadata/create', meta_params, (err, data, response) => {
      if (!err) {
        // now we can reference the media and post a tweet (media will attach to the tweet)
        const params = { status: 'Some text', media_ids: [mediaIdStr] };

        Twitter.post('statuses/update', params, (err, data, response) => {
          console.log(data)
        });
      }
    });
  });
}

//
//  search twitter for all tweets containing the hashtag '#videogame-translation'
//
function searchTwitter() {
  Twitter.get('search/tweets', { q: '#videogame-translation' }, (err, data, response) => {
    if (err) console.log('Error:', err);
    console.log('Data:', data);
    console.log('Response:', response);
  });
}


module.exports = {
  //start: () => setInterval(tweetRandomCard, 2*HOURS)
  //start: () => setInterval(tweetRandomMessage, 5000)
  start: () => setInterval(searchTwitter, 5000)
};
