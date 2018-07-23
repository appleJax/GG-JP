const Mongoose = require('mongoose')
const Models = require('Models').default
const { connectDB } = require('TestUtils')
const { getNextDeck } = require('DB/tweetQueue')

const {
  Schedule
} = Models

beforeAll(async () => {
  await connectDB()
})

afterAll(async (done) => {
  await Mongoose.disconnect(done)
})

const GAME_1 = 'game1'
const GAME_2 = 'game2'
const GAME_3 = 'game3'

beforeEach(async () => {
  await Schedule.create({
    lineup: [ GAME_1, GAME_2, GAME_3 ]
  })
})

afterEach(async () => {
  await Schedule.remove()
})

it('should return the next deck in the lineup', async () => {
  const afterGame1 = await getNextDeck({ game: GAME_1 })
  const afterGame2 = await getNextDeck({ game: GAME_2 })
  const afterGame3 = await getNextDeck({ game: GAME_3 })

  expect(afterGame1).toEqual({ game: GAME_2 });
  expect(afterGame2).toEqual({ game: GAME_3 });
  expect(afterGame3).toEqual({ game: GAME_1 });
})
