import { cache } from 'Config/redis';
import DB        from 'DB/ops';
import multer    from 'multer';
import { getTimeTilNextTweet, send } from 'Utils';

const upload = multer({ dest: 'uploads/' });


export default (app) => {

  app.get('/api/cards', (req, res) =>
    DB.serveCards(req).then(send(res))
  );

  app.get('/api/decks',
    cache.route(untilNextTweet()),
    (req, res) => DB.getDeckTitles().then(send(res))
  );

  app.get('/api/deck/:slug', (req, res) =>
    DB.getDeck(req).then(send(res))
  );

  app.get('/api/live', (req, res) =>
    DB.serveLiveQuestions().then(send(res))
  );

  app.get('/api/recent',
    browserCache,
    cache.route(untilNextTweet()),
    (req, res) => DB.serveRecentAnswers().then(send(res))
  );

  app.get('/api/scores',
    browserCache,
    cache.route(untilNextTweet()),
    (req, res) => DB.getScores(req).then(send(res))
  );

  app.get('/api/user/:userId',
    (req, res, next) => {
      res.express_redis_cache_name = 'user-' + req.params.userId;
      next();
    },
    cache.route(untilNextTweet()),
    (req, res) => DB.serveUser(req).then(send(res))
  );

  app.get('/api/userStats/:handle',
    browserCache,
    (req, res, next) => {
      res.express_redis_cache_name = 'user-' + req.params.handle;
      next();
    },
    cache.route(untilNextTweet()),
    (req, res) => DB.getUserStats(req).then(send(res))
  );

  app.get('/api/countdown', (req, res) =>
    res.json({ millis: getTimeTilNextTweet() })
  );

}


function browserCache(req, res, next) {
  res.set('Cache-Control', `max-age=${untilNextTweet()}`);
  next();
}

function untilNextTweet() {
  const millis = getTimeTilNextTweet();
  return Math.ceil(millis / 1000) + 4;
}