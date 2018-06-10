const Mongoose = require('mongoose');
const Models = require('Models').default;
const { connectDB } = require('TestUtils')
const { fetchTopTen } = require('DB/ops').default;

const {
  Scoreboard
} = Models;

beforeAll(async () => {
  await connectDB();
});

afterAll(async (done) => {
  await Mongoose.disconnect(done);
});

beforeEach(async () => {
  await Scoreboard.insertMany(sampleScoreboard());
});

afterEach(async () => {
  await Scoreboard.remove();
});


describe('should return top ten ranks, sorted ascending, for categories', () => {

  test('weeklyStats', async () => {
    const weeklyTopTen = await fetchTopTen('weeklyStats');
    
    const expectedWeeklyTopTen = expectedResults('weeklyStats');
    
    expect(weeklyTopTen).toEqual(expectedWeeklyTopTen);
  })

  test('monthlyStats', async () => {
    const monthlyTopTen = await fetchTopTen('monthlyStats');
    
    const expectedMonthlyTopTen = expectedResults('monthlyStats');

    expect(monthlyTopTen).toEqual(expectedMonthlyTopTen);
  })

});


// Helper

function expectedResults(category) {
  const topTen = sampleScoreboard().filter(
    user => {
      const rank = user[category].rank;
      return rank > 0 && rank <= 10;
    }
  );

  topTen.sort((a, b) => a[category].rank - b[category].rank);

  return topTen.map(user => ({
    handle: user.handle,
    [category]: {
      rank: user[category].rank,
      score: 0,
      highestScore: {
        timestamp: 0,
        value: 0
      }
    }
  }));
}


// Data Initialization

function sampleScoreboard() {
  const scoreboard = [];
  const numUsers = 15;
  for (let i = 0; i <= numUsers; i++) {
    scoreboard.push(
      {
        handle: String(i),
        monthlyStats: {
          rank: numUsers - i
        },
        weeklyStats: {
          rank: i
        }
      }
    );
  }

  return scoreboard;
}