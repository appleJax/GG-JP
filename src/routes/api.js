import { cache } from 'Config/redis';
import DB        from 'DB/ops';
import multer    from 'multer';
import { getTimeTilNextTweet } from 'Utils';

const upload = multer({ dest: 'uploads/' });


export default (app) => {

  app.get('/api/cards/old', DB.getOldCards);

  app.get('/api/cards', DB.serveCards);

  app.get('/api/decks',
    cache.route(untilNextTweet()),
    DB.getDeckTitles
  );

  app.get('/api/deck/:slug',
    DB.getDeck
  );

  app.get('/api/live',
    DB.serveLiveQuestions
  );

  app.get('/api/recent',
    browserCache,
    cache.route(untilNextTweet()),
    DB.serveRecentAnswers
  );

  app.get('/api/scores',
    browserCache,
    cache.route(untilNextTweet()),
    DB.getScores
  );

  app.get('/api/user/:userId',
    (req, res, next) => {
      res.express_redis_cache_name = 'user-' + req.params.userId;
      next();
    },
    cache.route(untilNextTweet()),
    DB.getUser
  );

  app.get('/api/userStats/:handle',
    browserCache,
    (req, res, next) => {
      res.express_redis_cache_name = 'user-' + req.params.handle;
      next();
    },
    cache.route(untilNextTweet()),
    DB.getUserStats
  );

  app.get('/api/countdown', (req, res) =>
    res.json({ millis: getTimeTilNextTweet() })
  );


  // TODO - add authentication to following endpoints

  app.post('/deck/new',
    upload.single('zipfile'),
    DB.addDeck
  );

  app.post('/scores/edit', DB.adjustScore);

  app.get('/cards/new',    DB.getNewCards);

}

function browserCache(req, res, next) {
  res.set('Cache-Control', `max-age=${untilNextTweet()}`);
  next();
}

function untilNextTweet() {
  const millis = getTimeTilNextTweet();
  return Math.ceil(millis / 1000);
}
