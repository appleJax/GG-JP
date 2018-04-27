import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { isCorrect, tryCatch } from 'Utils';
import {
  findOrCreateUser,
  getUser
} from 'DB/utils';

const {
  BOT_URL,
  TWITTER_API_KEY,
  TWITTER_API_SECRET
} = process.env

passport.use(
  new LocalStrategy(
    async (username, password, done) => {
      if (isCorrect(password)) {
        const user = await getUser({ handle: username });
        if (user && user.permissions.includes('admin'))
          return done(null, user);
      }
      return done(null, false, { message: 'Not Authorized' });
    }
  )
);

passport.use(
  new TwitterStrategy({
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
      getUser({ userId })
    );
    done(null, user);
  }
);

export default passport;
