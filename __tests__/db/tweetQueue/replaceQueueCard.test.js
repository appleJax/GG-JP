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

beforeEach(async () => {
  await Schedule.create({
    lineup: [ SCHEDULED_DECK ]
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
    entry => entry.cardId === CARD_ID_TO_REPLACE
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
        deck: 'Some Deck'
      },
      {
        cardId: '2',
        deck: 'Some Deck'
      },
      {
        cardId: '3',
        deck: 'Some Deck'
      },
      {
        cardId: CARD_ID_TO_REPLACE,
        deck: SCHEDULED_DECK
      },
      {
        cardId: '5',
        deck: 'Some Deck'
      },
      {
        cardId: '6',
        deck: 'Some Deck'
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
