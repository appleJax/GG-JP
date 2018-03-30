const Mongoose = require('mongoose');
const Models = require('Models').default;
const { connectDB } = require('TestUtils')
const { cachePoints } = require('DB/ops').default;

const {
  LiveQuestion
} = Models;

beforeAll(async () => {
  await connectDB();
});

afterAll(async (done) => {
  Mongoose.disconnect(done);
});

beforeEach(async () => {
  await LiveQuestion.create({
    questionId: '1',
    alreadyAnswered: [],
    userPoints: []
  });
});

afterEach(async () => {
  await LiveQuestion.remove().exec();
});

it('should add the given points to the given LiveQuestion', async () => {
  const userPoints = {
    userId: '5',
    points: 24,
    timeToAnswer: 10
  };
  const expected = JSON.stringify({
    questionId: '1',
    alreadyAnswered: [ '5' ],
    userPoints: [ userPoints ]
  });

  await cachePoints('1', userPoints);
  const liveQuestion = await toString(fetchLiveQuestion('1'));

  expect(liveQuestion).toEqual(expected);
});


// helpers

async function fetchLiveQuestion(id) {
  return await LiveQuestion.findOne(
    { questionId: id }
  ).select({
    _id: 0,
    questionId: 1,
    alreadyAnswered: 1,
    'userPoints.userId': 1,
    'userPoints.points': 1,
    'userPoints.timeToAnswer': 1
  }).exec();
}

function toString(promise) {
  return promise.then(doc =>
    JSON.stringify({
      questionId: doc.questionId,
      alreadyAnswered: doc.alreadyAnswered,
      userPoints: doc.userPoints
    })
  );
}
