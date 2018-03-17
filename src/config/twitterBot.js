import twit from 'twit';
const {
  TWITTER_API_KEY,
  TWITTER_API_SECRET,
  TWITTER_TOKEN,
  TWITTER_TOKEN_SECRET,
} = process.env;

const appConfig = {
  consumer_key: TWITTER_API_KEY,
  consumer_secret: TWITTER_API_SECRET,
  app_only_auth: true
}

const userConfig = {
  consumer_key:        TWITTER_API_KEY,
  consumer_secret:     TWITTER_API_SECRET,
  access_token:        TWITTER_TOKEN,
  access_token_secret: TWITTER_TOKEN_SECRET
};

export const TwitApp = new twit(appConfig);

const twitObject = new twit(userConfig);

export default twitObject;
