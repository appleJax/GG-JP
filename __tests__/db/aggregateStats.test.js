const Mongoose = require('mongoose');
const Models = require('Models').default;
const { connectDB } = require('TestUtils')
const { aggregateStats } = require('DB/utils');

const {
  Scoreboard
} = Models;

let subject;

beforeAll(async () => {
  await connectDB();
  await Scoreboard.insertMany(sampleScoreboard());
  subject = await aggregateStats();
});

afterAll(async (done) => {
  await Scoreboard.remove();
  await Mongoose.disconnect(done);
});

it('should group users by stat categories', async () => {
  const groups = subject.map(stat => stat._id).sort();
  expect(groups).toEqual(['allTimeStats', 'monthlyStats', 'weeklyStats']);
});

it('should subgroup categories by scores, descending', async () => {
  const allTimeScores = getScoreGroups('allTimeStats');
  const monthlyScores = getScoreGroups('monthlyStats');
  const weeklyScores = getScoreGroups('weeklyStats');

  expect(allTimeScores).toEqual([9, 8, 7]);
  expect(monthlyScores).toEqual([6, 5, 4]);
  expect(weeklyScores).toEqual( [3, 2, 1]);
});

it('should contain user objects within each score object', async () => {
  const user1 = getUsersForScore('allTimeStats', 9);
  const user2 = getUsersForScore('monthlyStats', 4);
  const user3 = getUsersForScore('weeklyStats',  2);

  expect(user1.userId).toEqual('1');
  expect(user2.userId).toEqual('2');
  expect(user3.userId).toEqual('3');
});

// helpers

function getScoreGroups(category) {
  return subject.filter(
    stat => stat._id === category
  )[0].scores.map(obj => obj.score);
}

function getUsersForScore(category, score) {
  return subject.filter(
    stat => stat._id === category
  )[0].scores.filter(scoreObj => scoreObj.score === score)[0].users[0];
}

function sampleScoreboard() {
  return [
    {
      userId: '1',
      allTimeStats : {
        rank: 0,
        score: 9,
        avgAnswerTime: 1
      },
      monthlyStats: {
        rank: 0,
        score: 6,
        avgAnswerTime: 1
      },
      weeklyStats: {
        rank: 0,
        score: 3,
        avgAnswerTime: 1
      }
    },
    {
      userId: '2',
      allTimeStats : {
        rank: 0,
        score: 7,
        avgAnswerTime: 1
      },
      monthlyStats: {
        rank: 0,
        score: 4,
        avgAnswerTime: 1
      },
      weeklyStats: {
        rank: 0,
        score: 1,
        avgAnswerTime: 1
      }
    },
    {
      userId: '3',
      allTimeStats : {
        rank: 0,
        score: 8,
        avgAnswerTime: 1
      },
      monthlyStats: {
        rank: 0,
        score: 5,
        avgAnswerTime: 1
      },
      weeklyStats: {
        rank: 0,
        score: 2,
        avgAnswerTime: 1
      }
    }
  ];
}
