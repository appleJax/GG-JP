const Mongoose = require('mongoose')
const Models = require('Models').default
const { connectDB } = require('TestUtils')
const { QUEUE_SIZE, updateTweetQueue } = require('DB/tweetQueue')

const {
  NewCard,
  Queue,
  Schedule
} = Models

beforeAll(async () => {
  await connectDB()
})

afterAll(async (done) => {
  await Mongoose.disconnect(done)
})

beforeEach(async () => {
  await Schedule.create({
    lineup: [ 'Game 1', 'Game 2', 'Game 3' ]
  })

  await NewCard.insertMany(
    sampleNewCards()
  )

  await Queue.create(sampleQueue())
})

afterEach(async () => {
  await NewCard.remove()
  await Queue.remove()
  await Schedule.remove()
})

it('should return the id for the next card to be tweeted', async () => {
  const nextCardId = await updateTweetQueue()

  expect(nextCardId).toEqual(sampleQueueCard().cardId)
})

it('should ensure the queue has QUEUE_SIZE elements', async () => {
  const queueSizeBefore = await getQueueSize()
  await updateTweetQueue()
  const queueSizeAfter = await getQueueSize()

  expect(queueSizeBefore).toEqual(1)
  expect(queueSizeAfter).toEqual(QUEUE_SIZE)
})

it('should not queue a new card if a unique card cannot be found', async () => {
  const queueSizeBefore = await getQueueSize()
  await NewCard.remove()
  await NewCard.create({
    cardId: '1',
    game: 'sample game'
  })
  await updateTweetQueue()
  const queueSizeAfter = await getQueueSize()

  expect(queueSizeBefore).toEqual(1)
  expect(queueSizeAfter).toEqual(0)
})

it('should not affect the NewCard collection', async () => {
  const newCardCountBefore = await newCardCount()

  await updateTweetQueue()
  await updateTweetQueue()
  await updateTweetQueue()

  const newCardCountAfter = await newCardCount()

  expect(newCardCountBefore).toEqual(newCardCountAfter)
})

it('should queue tweets in the correct deck order', async () => {
  await emptyTweetQueue()
  await updateTweetQueue()

  const queuedDecks = await getQueuedDecks()

  expect(queuedDecks).toEqual([ 'Game 1', 'Game 3', 'Game 2', 'Game 1', 'Game 3', 'Game 2' ])
})

it('should return null if tweetQueue is empty and cannot be refilled', async () => {
  await NewCard.remove()
  await updateTweetQueue()

  const nextCardId = await updateTweetQueue()

  expect(nextCardId).toBeNull()
})

// helpers

function emptyTweetQueue() {
  return Queue.updateOne({}, {
    $set: { queue: [] }
  }).exec()
}

function getQueueSize() {
  return Queue
    .findOne()
    .lean()
    .then(obj => obj.queue.length)
}

function getQueuedDecks() {
  return Queue
    .findOne()
    .lean()
    .then(obj => obj.queue.map(entry => entry.deck))
}

function newCardCount() {
  return NewCard.find().count().exec()
}

// Data initialization

function sampleNewCards() {
  return [
    {
      cardId: '1',
      game: 'Game 1'
    },
    {
      cardId: '1-2',
      game: 'Game 1'
    },
    {
      cardId: '1-3',
      game: 'Game 1'
    },
    {
      cardId: '2',
      game: 'Game 2'
    },
    {
      cardId: '2-2',
      game: 'Game 2'
    },
    {
      cardId: '3',
      game: 'Game 3'
    },
    {
      cardId: '3-2',
      game: 'Game 3'
    },
    {
      cardId: '4',
      game: 'Game 4'
    },
    {
      cardId: '5',
      game: 'Game 5'
    },
    {
      cardId: '6',
      game: 'Game 6'
    }
  ]
}

function sampleQueueCard() {
  return {
    cardId: '1',
    deck: 'Game 1'
  }
}

function sampleQueue() {
  return {
    queue: [ sampleQueueCard() ]
  }
}
