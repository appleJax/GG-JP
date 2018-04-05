
const Mongoose = require('mongoose');
const Models = require('Models').default;
const { connectDB } = require('TestUtils')
const { updateStats } = require('DB/ops').default;

const {
  Scoreboard
} = Models;

beforeAll(async () => {
  await connectDB();
});

afterAll(async (done) => {
  await Mongoose.disconnect(done);
});


const sampleStatsNoRank = {
  attempts:        9,
  correct:         9,
  totalPossible:   9,
  score:          20,
  avgTimeToAnswer: 9,
  average: {
    n:      1,
    value: 10
  }
};

const sampleStats = {
  ...sampleStatsNoRank,
  rank: 9
}

const updatedStatsNoRank = {
  attempts:        0,
  correct:         0,
  totalPossible:   0,
  score:           0,
  avgTimeToAnswer: 0,
  average: {
    n:      2,
    value: 15
  }
};

const updatedStats = {
  ...updatedStatsNoRank,
  rank: 0
};

beforeEach(async () => {
  await Scoreboard.create(sampleUsers());
  const users = await fetchUsers();
  expect(users).toEqual(sampleUsers());
});

afterEach(async () => {
  await Scoreboard.remove();
});


it('should always update daily Stats', async () => {
  await updateStats(false, false);

  await isNotUpdated('monthlyStats');
  await isNotUpdated('weeklyStats');
  await isUpdated('dailyStats');
});

it('should update weeklyStats when resetWeeklyStats param is true', async () => {
  await updateStats(true, false);

  await isNotUpdated('monthlyStats');
  await isUpdated('weeklyStats');
  await isUpdated('dailyStats');
});

it('should update monthlyStats when resetMonthlyStats param is true', async () => {
  await updateStats(false, true);

  await isUpdated('monthlyStats');
  await isNotUpdated('weeklyStats');
  await isUpdated('dailyStats');
});

it('should update monthlyStats and weeklyStats when both params are true', async () => {
  await updateStats(true, true);

  await isUpdated('monthlyStats');
  await isUpdated('weeklyStats');
  await isUpdated('dailyStats');
});

// helpers

async function isUpdated(stats) {
  const users = await fetchUsers();
  const updatedUsers = await fetchUsers();

  return updatedUsers.forEach(user => {
    const updated = (stats === 'dailyStats')
      ? updatedStatsNoRank
      : updatedStats
    
    expect(user[stats]).toEqual(updated);
  });
}

async function isNotUpdated(stats) {
  const users = await fetchUsers();
  const updatedUsers = await fetchUsers();

  return updatedUsers.forEach(user => {
    const original = (stats === 'dailyStats')
      ? sampleStatsNoRank
      : sampleStats
    
    expect(user[stats]).toEqual(original);
  });
}

async function fetchUsers() {
  return await Scoreboard.find().select({
    _id:           0,
    __v:           0,
    name:          0,
    handle:        0,
    avatar:        0,
    profileBanner: 0,
    following:     0,
    allTimeStats:  0,
    'monthlyStats._id': 0,
    'monthlyStats.__v': 0,
    'weeklyStats._id':  0,
    'weeklyStats.__v':  0,
    'dailyStats._id':   0,
    'dailyStats.__v':   0
  }).sort({
    userId: 'asc'
  }).lean().exec();
}

function sampleUsers() {
  return [
    {
      userId: '1',
      monthlyStats: sampleStats,
      weeklyStats:  sampleStats,
      dailyStats:   sampleStatsNoRank
    },
    {
      userId: '2',
      monthlyStats: sampleStats,
      weeklyStats:  sampleStats,
      dailyStats:   sampleStatsNoRank
    }
  ];
}