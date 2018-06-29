const Mongoose = require('mongoose')
const Models = require('Models').default
const { connectDB } = require('TestUtils')
const { updateStats } = require('DB/ops').default

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

beforeEach(async () => {
  await Scoreboard.create(sampleUsers())
  await Timestamp.create(sampleTimestamps())
  const users = await fetchUsers()
  expect(users).toEqual(sampleUsers())
})

afterEach(async () => {
  await Scoreboard.remove()
  await Timestamp.remove()
})

let updatedUsers

it('should always update daily Stats', async () => {
  await updateStats(false, false, false)
  updatedUsers = await fetchUsers()

  isNotUpdated('yearlyStats')
  isNotUpdated('monthlyStats')
  isNotUpdated('weeklyStats')
  isUpdated('dailyStats')
})

it('should update weeklyStats when newWeek param is true', async () => {
  await updateStats(true, false, false)
  updatedUsers = await fetchUsers()

  isNotUpdated('yearlyStats')
  isNotUpdated('monthlyStats')
  isUpdated('weeklyStats')
  isUpdated('dailyStats')
})

it('should update monthlyStats when newMonth param is true', async () => {
  await updateStats(false, true, false)
  updatedUsers = await fetchUsers()

  isNotUpdated('yearlyStats')
  isUpdated('monthlyStats')
  isNotUpdated('weeklyStats')
  isUpdated('dailyStats')
})

it('should update yearlyStats when newYear param is true', async () => {
  await updateStats(false, false, true)
  updatedUsers = await fetchUsers()

  isUpdated('yearlyStats')
  isNotUpdated('monthlyStats')
  isNotUpdated('weeklyStats')
  isUpdated('dailyStats')
})

it('should update yearlyStats, monthlyStats and weeklyStats when all params are true', async () => {
  await updateStats(true, true, true)
  updatedUsers = await fetchUsers()

  isUpdated('yearlyStats')
  isUpdated('monthlyStats')
  isUpdated('weeklyStats')
  isUpdated('dailyStats')
})

// helpers

async function isUpdated(stats) {
  return updatedUsers.forEach(user => {
    const updated = (stats === 'dailyStats')
      ? updatedStatsNoRank()
      : updatedStats()

    expect(user[stats]).toEqual(updated)
  })
}

async function isNotUpdated(stats) {
  return updatedUsers.forEach(user => {
    const original = (stats === 'dailyStats')
      ? sampleStatsNoRank()
      : sampleStats()

    expect(user[stats]).toEqual(original)
  })
}

function fetchUsers() {
  return Scoreboard.find().select({
    _id:           0,
    __v:           0,
    allTimeStats:  0,
    avatar:        0,
    handle:        0,
    isPrivate:     0,
    following:     0,
    name:          0,
    profileBanner: 0
  }).sort({
    userId: 'asc'
  }).lean().exec()
}

function sampleUsers() {
  return [
    {
      userId: '1',
      permissions: [],
      yearlyStats: sampleStats(),
      monthlyStats: sampleStats(),
      weeklyStats:  sampleStats(),
      dailyStats:   sampleStatsNoRank()
    },
    {
      userId: '2',
      permissions: [],
      yearlyStats: sampleStats(),
      monthlyStats: sampleStats(),
      weeklyStats:  sampleStats(),
      dailyStats:   sampleStatsNoRank()
    }
  ]
}

function sampleTimestamps() {
  return {
    year: 123456,
    month: 123456,
    week: 123456,
    day: 123456
  }
}

function sampleStatsNoRank() {
  return {
    attempts:        9,
    correct:         9,
    totalPossible:   9,
    score:          20,
    avgAnswerTime: 9,
    average: {
      n:      1,
      value: 10
    },
    highestScore: {
      value: 21,
      timestamp: 0
    },
    lowestAvgAnswerTime: {
      value: 1,
      timestamp: 0
    },
    history: []
  }
}

function sampleStats(){
  return {
    ...sampleStatsNoRank(),
    rank: 9,
    bestRank: {
      value: 10,
      timestamp: 0
    }
  }
}

function updatedStatsNoRank() {
  return {
    attempts:        0,
    correct:         0,
    totalPossible:   0,
    score:           0,
    avgAnswerTime: 0,
    average: {
      n:      2,
      value: 15
    },
    highestScore: {
      value: 21,
      timestamp: 0
    },
    lowestAvgAnswerTime: {
      value: 1,
      timestamp: 0
    },
    history: [{
      score: 20,
      avgAnswerTime: 9,
      timestamp: 123456
    }]
  }
}

function updatedStats() {
  return {
    ...updatedStatsNoRank(),
    rank: 0,
    bestRank: {
      value: 9,
      timestamp: 123456
    },
    history: [{
      rank: 9,
      score: 20,
      avgAnswerTime: 9,
      timestamp: 123456
    }]
  }
}
