const Mongoose = require('mongoose')
const Models = require('Models').default
const { connectDB } = require('TestUtils')
const { updateScheduledDeck } = require('DB/tweetQueue')

const {
  DeckTitle,
  NewCard,
  Schedule
} = Models

beforeAll(async () => {
  await connectDB()
})

afterAll(async (done) => {
  await Mongoose.disconnect(done)
})

const OLD_DECK = 'PrevScheduledDeck'
const NEW_DECK = 'NewScheduledDeck'
const OLD_LINEUP = [ 'deck1', 'deck2', OLD_DECK, 'deck3' ]

beforeEach( async () => {
  await Schedule.create({
    lineup: OLD_LINEUP
  })

  await DeckTitle.insertMany([
    { fullTitle: OLD_DECK, finished: false, totalCards: 10 },
    { fullTitle: NEW_DECK, finished: false, totalCards: 10 },
    { fullTitle: 'deck with no available cards', finished: false, totalCards: 10 }
  ])

  await NewCard.create(
    { game: NEW_DECK }
  )
})

afterEach(async () => {
  await DeckTitle.remove()
  await NewCard.remove()
  await Schedule.remove()
})

it(`should set old deck to "finished: true"`, async () => {
  const oldDeckBefore = await fetch(DeckTitle, { fullTitle: OLD_DECK })
  await updateScheduledDeck(OLD_DECK)
  const oldDeckAfter = await fetch(DeckTitle, { fullTitle: OLD_DECK })

  expect(oldDeckBefore.finished).toEqual(false)
  expect(oldDeckAfter.finished).toEqual(true)
})

it('should update lineup with a random deck that has available cards', async () => {
  const oldSchedule = await fetch(Schedule)
  await updateScheduledDeck(OLD_DECK)
  const newSchedule = await fetch(Schedule)

  const oldDeckIndex = oldSchedule.lineup.indexOf(OLD_DECK)
  const newLineup = OLD_LINEUP.slice()
  newLineup[oldDeckIndex] = NEW_DECK

  expect(oldSchedule.lineup).toEqual(OLD_LINEUP)
  expect(newSchedule.lineup).toEqual(newLineup)
});

it('should return an object with a game key set to the new deck title', async () => {
  const newScheduledDeck = await updateScheduledDeck(2, OLD_DECK)
  expect(newScheduledDeck).toEqual({ game: NEW_DECK })
})

it('should return an empty object if no new decks exist', async () => {
  await NewCard.remove()

  const newScheduledDeck = await updateScheduledDeck(2, OLD_DECK)
  expect(newScheduledDeck).toEqual({})
})

// helper

function fetch(model, query) {
  return model.findOne(query).lean().exec()
}
