const Mongoose = require('mongoose')
const Models = require('Models').default
const { connectDB } = require('TestUtils')
const { LOG_LENGTH, logTweet } = require('Twitter/utils')

const {
  TweetLog
} = Models

beforeAll(async () => {
  await connectDB()
})

afterAll(async (done) => {
  await Mongoose.disconnect(done)
})

beforeEach(async () => {
  await TweetLog.create({
    log: []
  })
})

afterEach(async () => {
  await TweetLog.remove()
})

it('should save tweet statuses to a log', async () => {
  const tweetLogBefore = await fetchTweetLog()
  const status = 'New tweet status!'
  await logTweet(status)

  const tweetLogAfter = await fetchTweetLog()

  expect(tweetLogBefore.length).toEqual(0)
  expect(tweetLogAfter.length).toEqual(1)
  expect(tweetLogAfter[0].status).toEqual(status)
})

it('should save a maximum of LOG_LENGTH tweets', async () => {
  await fillTweetLog()
  const tweetLogBefore = await fetchTweetLog()

  const newTweet = 'the latest tweet'
  await logTweet(newTweet)

  const tweetLogAfter = await fetchTweetLog()
  const lastTweetInLog = tweetLogAfter[LOG_LENGTH - 1].status

  expect(tweetLogBefore.length).toEqual(LOG_LENGTH)
  expect(tweetLogAfter.length).toEqual(LOG_LENGTH)
  expect(lastTweetInLog).toEqual(newTweet);
})

// helpers

function fetchTweetLog() {
  return TweetLog
    .findOne()
    .lean()
    .then(doc => doc.log)
}

async function fillTweetLog() {
  const logs = []
  let newLog
  for (let i = 0; i < LOG_LENGTH; i++) {
    newLog = {
      status: 'another tweet',
      timestamp: i
    }

    logs.push(newLog)
  }
  
  await TweetLog.updateOne({},
    { $set: { log: logs } }
  ).exec()
}