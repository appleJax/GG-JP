require('dotenv').config()

const twit = require('twit');

const config = {
  consumer_key: TWITTER_API_KEY,
  consumer_secret: TWITTER_API_SECRET,
  access_token: TWITTER_TOKEN,
  access_token_secret: TWITTER_TOKEN_SECRET
};

const Twitter = new twit(config);
const HOURS = 3600000;

function tweetRandomCard() {
  Twitter.post('statuses/update', { status: 'Test' }, (err, data, response) => {
    if (err) console.error(err);
  });
}


module.exports = {
  //start: () => setTimeout(tweetRandomCard, 2 * HOURS)
  start: () => setTimeout(tweetRandomCard, HOURS / 60)
};
