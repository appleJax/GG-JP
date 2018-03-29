import passport     from 'passport'
import { Strategy } from 'passport-twitter'
import { tryCatch } from 'Utils'
import {
  findOrCreateUser,
  getUser
} from 'DB/utils'

const {
    TWITTER_API_KEY,
    TWITTER_API_SECRET
} = process.env

passport.use(
  new Strategy({
    consumerKey:    TWITTER_API_KEY,
    consumerSecret: TWITTER_API_SECRET,
    callbackURL: `${BOT_URL}/oauth_callback`
  },
  async (token, tokenSecret, profile, done) => {

    let user = await tryCatch(
      findOrCreateUser(profile.id, profile._json)
    );

    return done(null, user);
  })
);

passport.serializeUser(
  (user, done) => done(null, user.userId)
);

passport.deserializeUser(
  async (userId, done) => {
    const user = await tryCatch(
      getUser(userId)
    );
    done(null, user);
  }
);

export default passport;
