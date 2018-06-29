import redis      from 'redis'
import redisCache from 'express-redis-cache'
import withRedis  from 'connect-redis'
import expressSession from 'express-session'

const {
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PW,
  SESSION_SECRET
} = process.env

const redisClient = redis.createClient({
  host: REDIS_HOST,
  port: REDIS_PORT,
  password: REDIS_PW
})

export const cache = redisCache({
  client: redisClient
})

const RedisStore = withRedis(expressSession)

export const session = expressSession({
  store: new RedisStore({ client: redisClient }),
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge: 604800000 } // one week
})
