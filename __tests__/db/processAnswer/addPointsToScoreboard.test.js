import { isContext } from 'vm'
import { get, set } from 'mongoose'

const Mongoose = require('mongoose')
const Models = require('Models').default
const { connectDB } = require('TestUtils')
const { addPointsToScoreboard } = require('DB/ops')

const {
  Scoreboard,
  Timestamp
} = Models

beforeAll(async () => {
  await connectDB()
})

afterAll(async (done) => {
  await Mongoose.disconnect(done)
})

let correctUser, wrongAnswerUser, noAnswerUser

const liveQuestion = {
  cardId: 'c1',
  userPoints: [
    {
      userId: '1',
      points: 24,
      timeToAnswer: 20
    },
    {
      userId: '2',
      points: 0,
      timeToAnswer: 20
    }
  ]
}

beforeEach(async () => {
  await Scoreboard.insertMany(
    sampleScores()
  )
  await Timestamp.create({ day: 123456 })
  await addPointsToScoreboard(liveQuestion);

  [ correctUser, wrongAnswerUser, noAnswerUser ] = await getUsers()
})

afterEach(async () => {
  await Scoreboard.remove()
  await Timestamp.remove()
})

describe('for users who answered the current question', () => {
  it("should increase all stat categories' score by points earned", async () => {
    expectAllCategories(correctUser,     'score', 24)
    expectAllCategories(wrongAnswerUser, 'score', 0)
    expectAllCategories(noAnswerUser,    'score', 0)
  })

  it("should increment all stat categories' attempts", async () => {
    expectAllCategories(correctUser,     'attempts', 1)
    expectAllCategories(wrongAnswerUser, 'attempts', 1)
    expectAllCategories(noAnswerUser,    'attempts', 0)
  })
})

describe('for users who answered the current question correctly', () => {
  it("should increment all stat categories' correct field", async () => {
    expectAllCategories(correctUser,     'correct', 1, 'exclude allTimeStats')
    expectAllCategories(wrongAnswerUser, 'correct', 0, 'exclude allTimeStats')
    expectAllCategories(noAnswerUser,    'correct', 0, 'exclude allTimeStats')
  })
})

describe('for all users in the database', () => {
  it("should increment all stat categories' totalPossible for all users", async () => {
    expectAllCategories(correctUser,     'totalPossible', 1)
    expectAllCategories(wrongAnswerUser, 'totalPossible', 1)
    expectAllCategories(noAnswerUser,    'totalPossible', 1)
  })

  it('should update allTimeStats.currentAnswerStreak', async () => {
    expect(correctUser.allTimeStats.currentAnswerStreak    ).toEqual(1)
    expect(wrongAnswerUser.allTimeStats.currentAnswerStreak).toEqual(1)
    expect(noAnswerUser.allTimeStats.currentAnswerStreak   ).toEqual(0)
  })
})

it('should update allTimeStats.currentCorrectStreak for all users', async () => {
  [ correctUser, wrongAnswerUser, noAnswerUser ] = await getUsers()
  await setCorrectStreak(correctUser, 5)
  await setCorrectStreak(wrongAnswerUser, 5)

  await addPointsToScoreboard(liveQuestion);
  [ correctUser, wrongAnswerUser, noAnswerUser ] = await getUsers()

  expect(correctUser.allTimeStats.currentCorrectStreak    ).toEqual(6)
  expect(wrongAnswerUser.allTimeStats.currentCorrectStreak).toEqual(0)
  expect(noAnswerUser.allTimeStats.currentCorrectStreak   ).toEqual(0)
})

it("should recalculate all stat categories' avgAnswerTime for users who answered", async () => {
  [ correctUser, wrongAnswerUser, noAnswerUser ] = await getUsers()
  await setOnUser(correctUser, 'avgAnswerTime', 10)
  await setOnUser(correctUser, 'attempts', 1)

  await setOnUser(wrongAnswerUser, 'avgAnswerTime', 30)
  await setOnUser(wrongAnswerUser, 'attempts', 1)

  await addPointsToScoreboard(liveQuestion);
  [ correctUser, wrongAnswerUser, noAnswerUser ] = await getUsers()

  expectAllCategories(correctUser,     'avgAnswerTime', 15)
  expectAllCategories(wrongAnswerUser, 'avgAnswerTime', 25)
  expectAllCategories(noAnswerUser,    'avgAnswerTime', 0)
})

// helpers
const CATEGORIES = [
  'allTimeStats',
  'yearlyStats',
  'monthlyStats',
  'weeklyStats',
  'dailyStats'
]

function getUsers() {
  return Scoreboard.find().sort({ userId: 'asc' }).lean().exec()
}

async function setOnUser({ userId }, field, value) {
  let update = {
    $set: {}
  }

  CATEGORIES.forEach(category => {
    update.$set[`${category}.${field}`] = value
  })

  await Scoreboard.updateOne({ userId }, update).exec()
}

function setCorrectStreak({ userId }, value) {
  return Scoreboard
    .updateOne(
      { userId },
      { $set:
        { 'allTimeStats.currentCorrectStreak': value }
      }
    ).exec()
}

function expectAllCategories(user, field, value, excludeAllTimeStats) {
  CATEGORIES.forEach(category => {
    if (excludeAllTimeStats && category === 'allTimeStats') {
      return
    }

    expect(user[category][field]).toEqual(value)
  })
}

// Data initialization

function sampleScores() {
  return [
    { userId: '1' },
    { userId: '2' },
    { userId: '3' }
  ]
}
