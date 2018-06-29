const Mongoose = require('mongoose')
const Models = require('Models').default
const { connectDB } = require('TestUtils')
const { replaceQueueCard } = require('DB/tweetQueue')

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

const NEW_CARD_ID = 'newID'
const SCHEDULED_DECK = 'scheduled deck'
const CARD_ID_TO_REPLACE = 'oldID'
const TIMESLOT_TO_REPLACE = 20

beforeEach(async () => {
  await Schedule.create({
    deck: SCHEDULED_DECK,
    time: TIMESLOT_TO_REPLACE
  })

  await NewCard.insertMany(
    sampleNewCards()
  )

  await Queue.create(
    sampleQueue()
  )
})

afterEach(async () => {
  await NewCard.remove()
  await Queue.remove()
  await Schedule.remove()
})

it('should replace the given cardId in the queue', async () => {
  const cardToReplace = {
    body: {
      cardId: CARD_ID_TO_REPLACE
    }
  }

  const queueBefore = await getTweetQueue()
  await replaceQueueCard(cardToReplace)
  const queueAfter = await getTweetQueue()

  const updatedQueue = sampleQueue().queue
  const replacedEntry = updatedQueue.find(
    entry => entry.time === TIMESLOT_TO_REPLACE
  )
  replacedEntry.cardId = NEW_CARD_ID

  expect(queueBefore).toEqual(sampleQueue().queue)
  expect(queueAfter).toEqual(updatedQueue)
})

// helper

function getTweetQueue() {
  return Queue.findOne().lean().then(obj => obj.queue)
}

// Data initialization

function sampleQueue() {
  return {
    queue: [
      {
        cardId: '1',
        time: 14
      },
      {
        cardId: '2',
        time: 8
      },
      {
        cardId: '3',
        time: 2
      },
      {
        cardId: CARD_ID_TO_REPLACE,
        time: TIMESLOT_TO_REPLACE
      },
      {
        cardId: '5',
        time: 14
      },
      {
        cardId: '6',
        time: 8
      }
    ]
  }
}

function sampleNewCards() {
  return [
    {
      cardId: NEW_CARD_ID,
      game: SCHEDULED_DECK
    },
    { cardId: '1' },
    { cardId: '2' },
    { cardId: '3' },
    { cardId: CARD_ID_TO_REPLACE },
    { cardId: '5' },
    { cardId: '6' }
  ]
}
