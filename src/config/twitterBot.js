import twit from 'twit';
const {
  TWITTER_API_KEY,
  TWITTER_API_SECRET,
  TWITTER_TOKEN,
  TWITTER_TOKEN_SECRET,
} = process.env;

// const appConfig = {
//   consumer_key: TWITTER_API_KEY,
//   consumer_secret: TWITTER_API_SECRET,
//   app_only_auth: true
// }

console.log('API_KEY', TWITTER_API_KEY)
console.log('API_SECRET', TWITTER_API_SECRET)
console.log('TOKEN', TWITTER_TOKEN)
console.log('TOKEN_SECRET', TWITTER_TOKEN_SECRET)

const userConfig = {
  consumer_key:        TWITTER_API_KEY,
  consumer_secret:     TWITTER_API_SECRET,
  access_token:        TWITTER_TOKEN,
  access_token_secret: TWITTER_TOKEN_SECRET
};

const twitObject = new twit(userConfig);

export default twitObject;
