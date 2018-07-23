const Mongoose = require('mongoose')
const Models = require('Models').default
const { connectDB } = require('TestUtils')
const { getCardFromDeck } = require('DB/tweetQueue')

const {
  LiveQuestion,
  NewCard,
  OldCard,
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
  await NewCard.insertMany(
    sampleNewCards()
  )

  await Queue.create({
    queue: []
  })

  await Schedule.create({
    lineup: []
  })
})

afterEach(async () => {
  await LiveQuestion.remove()
  await NewCard.remove()
  await OldCard.remove()
  await Queue.remove()
  await Schedule.remove()
})

it('should return a random card from NewCards', async () => {
  const SCHEDULED_GAME = 'Scheduled Game'
  const scheduledDeck = { game: SCHEDULED_GAME }
  const randomIds = []
  for (let i = 0; i < 5; i++) {
    const randomCardId = await getCardFromDeck(scheduledDeck)
    randomIds.push(randomCardId)
  }

  const sampleIds = sampleNewCards()
    .filter(card => card.game === SCHEDULED_GAME)
    .map(card => card.cardId)

  const uniqueIds = getUnique(randomIds)

  randomIds.forEach(
    id => expect(sampleIds).toContain(id)
  )
  expect(uniqueIds).not.toHaveLength(1)
})

it('should return a random card if no matching cards exist', async () => {
  const scheduledDeck = { game: 'Not found' }
  const randomCardId = await getCardFromDeck(scheduledDeck)
  const sampleIds = sampleNewCards().map(card => card.cardId)

  expect(sampleIds).toContain(randomCardId)
})

// helpers

function getUnique(arr) {
  return arr.reduce((unique, value) => {
    if (unique.filter(other => other === value).length > 0) {
      return unique
    } else {
      return unique.concat([value])
    }
  }, [])
}

// Data initialization

function sampleNewCards() {
  return [
    {
      cardId: 'New1',
      game: 'Scheduled Game',
      answers: [],
      prevLineAltText: '',
      questionAltText: '',
      answerAltText: '',
      otherVisibleContext: ''
    },
    {
      cardId: 'New2',
      game: 'Scheduled Game',
      answers: [],
      prevLineAltText: '',
      questionAltText: '',
      answerAltText: '',
      otherVisibleContext: ''
    },
    {
      cardId: 'New3',
      game: 'Scheduled Game',
      answers: [],
      prevLineAltText: '',
      questionAltText: '',
      answerAltText: '',
      otherVisibleContext: ''
    },
    {
      cardId: 'New4',
      game: 'Scheduled Game',
      answers: [],
      prevLineAltText: '',
      questionAltText: '',
      answerAltText: '',
      otherVisibleContext: ''
    },
    {
      cardId: 'New5',
      game: 'Scheduled Game',
      answers: [],
      prevLineAltText: '',
      questionAltText: '',
      answerAltText: '',
      otherVisibleContext: ''
    },
    {
      cardId: 'New6',
      game: 'Other Game',
      answers: [],
      prevLineAltText: '',
      questionAltText: '',
      answerAltText: '',
      otherVisibleContext: ''
    }
  ]
}
