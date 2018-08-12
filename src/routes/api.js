import DB from 'DB/ops'
import { cache } from 'Config/redis'
import { getTimeTilNextTweet, send } from 'Utils'

export default (app) => {
  app.get('/api/cards', (req, res) =>
    DB.serveCards(req).then(send(res))
  )

  app.get('/api/decks',
    cache.route(untilNextTweet()),
    (req, res) => DB.getDeckTitles().then(send(res))
  )

  app.get('/api/deck/:slug', (req, res) =>
    DB.getDeck(req).then(send(res))
  )

  app.get('/api/downloadLastUpdated', (req, res) =>
    DB.getDownloadLastUpdated().then(send(res))
  )

  app.get('/api/live', (req, res) =>
    DB.serveLiveQuestions().then(send(res))
  )

  app.get('/api/recent',
    // browserCache,
    // cache.route(untilNextTweet()),
    (req, res) => DB.serveRecentAnswers().then(send(res))
  )

  app.post('/api/togglePrivacy',
    (req, res) => req.session.user
      ? DB.togglePrivacy(req.session.user.userId).then(send(res))
      : res.send(null)
  )

  app.get('/api/stats',
    browserCache,
    cache.route(untilNextTweet()),
    (req, res) => DB.getStats(req).then(send(res))
  )

  app.get('/api/user/:userId',
    (req, res, next) => {
      res.express_redis_cache_name = 'user-' + req.params.userId
      next()
    },
    cache.route(untilNextTweet()),
    (req, res) => DB.serveUser(req).then(send(res))
  )

  app.get('/api/userStats/:handle',
    browserCache,
    (req, res, next) => {
      res.express_redis_cache_name = 'user-' + req.params.handle
      next()
    },
    cache.route(untilNextTweet()),
    (req, res) => DB.getUserStats(req).then(send(res))
  )

  app.get('/api/countdown', (req, res) =>
    res.json({ millis: getTimeTilNextTweet() })
  )
}

// private

function browserCache(req, res, next) {
  res.set('Cache-Control', `max-age=${untilNextTweet()}`)
  next()
}

function untilNextTweet() {
  const millis = getTimeTilNextTweet()
  return Math.ceil(millis / 1000) + 5
}
