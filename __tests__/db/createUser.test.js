const Mongoose = require('mongoose');
const Models = require('Models').default;
const { connectDB } = require('TestUtils')
const { createUser } = require('DB/ops').default;

const {
  Scoreboard
} = Models;

beforeAll(async () => {
  await connectDB();
});

afterAll(async (done) => {
  await Scoreboard.remove();
  await Mongoose.disconnect(done);
});

const USER_ID   = 'u1';
const USER_NAME = 'Bob';

it('should add the given user to the Scoreboard collection', async () => {
  const newUser = {
    body: {
      userId: USER_ID,
      name:   USER_NAME
    }
  };

  const existingUserCount = await getUserCount();
  await createUser(newUser);
  const newUserCount = await getUserCount();
  const newUserObj = await getUser(USER_ID);

  expect(existingUserCount).toEqual(0);
  expect(newUserCount).toEqual(1);
  expect(newUserObj).toEqual(sampleUser());
});


function sampleUser() {
  return {
    userId: USER_ID,
    name: USER_NAME,
    handle: '',
    avatar: '',
    profileBanner: '',
    following: [],
    isPrivate: false,
    permissions: [],
    allTimeStats: {
      attempts: 0,
      correct: [],
      incorrect: [],
      unanswered: [],
      totalPossible: 0,
      rank: 0,
      score: 0,
      avgAnswerTime: 0,
      bestRank: {
        value: 0,
        timestamp: 0
      },
      currentAnswerStreak: 0,
      currentCorrectStreak: 0,
      longestAnswerStreak: 0,
      longestCorrectStreak: 0
    },
    yearlyStats: {
      attempts: 0,
      correct: 0,
      totalPossible: 0,
      rank: 0,
      score: 0,
      avgAnswerTime: 0,
      average: {
        n: 0,
        value: 0
      },
      bestRank: {
        value: 0,
        timestamp: 0
      },
      highestScore: {
        value: 0,
        timestamp: 0
      },
      lowestAvgAnswerTime: {
        value: 87000,
        timestamp: 0
      },
      history: []
    },
    monthlyStats: {
      attempts: 0,
      correct: 0,
      totalPossible: 0,
      rank: 0,
      score: 0,
      avgAnswerTime: 0,
      average: {
        n: 0,
        value: 0
      },
      bestRank: {
        value: 0,
        timestamp: 0
      },
      highestScore: {
        value: 0,
        timestamp: 0
      },
      lowestAvgAnswerTime: {
        value: 87000,
        timestamp: 0
      },
      history: []
    },
    weeklyStats: {
      attempts: 0,
      correct: 0,
      totalPossible: 0,
      rank: 0,
      score: 0,
      avgAnswerTime: 0,
      average: {
        n: 0,
        value: 0
      },
      bestRank: {
        value: 0,
        timestamp: 0
      },
      highestScore: {
        value: 0,
        timestamp: 0
      },
      lowestAvgAnswerTime: {
        value: 87000,
        timestamp: 0
      },
      history: []
    },
    dailyStats: {
      attempts: 0,
      correct: 0,
      totalPossible: 0,
      score: 0,
      avgAnswerTime: 0,
      average: {
        n: 0,
        value: 0
      },
      highestScore: {
        value: 0,
        timestamp: 0
      },
      lowestAvgAnswerTime: {
        value: 87000,
        timestamp: 0
      },
      history: []
    }
  };
}

function getUserCount() {
  return Scoreboard.find().count().exec();
}

function getUser(userId) {
  return Scoreboard
    .findOne({ userId })
    .select({ _id: 0, __v: 0 })
    .lean()
    .exec();
}