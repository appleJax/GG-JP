const Mongoose = require('mongoose');
const Models = require('Models').default;
const { connectDB } = require('TestUtils')
const { addPointsToScoreboard } = require('DB/ops');

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
  await Scoreboard.insertMany(
    sampleScores()
  );
});

afterEach(async () => {
  await Scoreboard.remove();
});


xit("should increase all stat categories' score by points for current question", async () => {

});

xit("should increment all stat categories' attempts for users who answered", async () => {

});

xit("should increment all stat categories' totalPossible for all users", async () => {

});

xit("should increment all stat categories' correct for users who answered correctly", async () => {

});

xit("should recalculate all stat categories' avgAnswerTime for users who answered", async () => {

});

xit('should update allTimeStats.currentAnswerStreak', async () => {

});

xit('should update allTimeStats.currentCorrectStreak', async () => {

});


// Data initialization

// TODO - Change to be relevant to this test
function sampleScores() {
  return [
    {
      userId: '1',
      handle: 'C_weekly_rank1',
      weeklyStats: {
        rank: 1,
        score: 10
      }
    },
    {
      userId: '2',
      handle: 'B_weekly_rank1',
      weeklyStats: {
        rank: 1,
        score: 10
      }
    },
    {
      userId: '3',
      handle: 'A_weekly_rank3',
      weeklyStats: {
        rank: 3,
        score: 9 
      }
    },
    {
      userId: '4',
      handle: 'C_allTime_rank1',
      allTimeStats: {
        rank: 1,
        score: 10
      }
    },
    {
      userId: '5',
      handle: 'B_allTime_rank1',
      allTimeStats: {
        rank: 1,
        score: 10
      }
    },
    {
      userId: '6',
      handle: 'A_allTime_rank3',
      allTimeStats: {
        rank: 3,
        score: 9 
      }
    },
    {
      userId: '7',
      handle: 'zeroAllTime',
      allTimeStats: {
        rank: 4,
        score: 0 
      }
    },
  ];
}
