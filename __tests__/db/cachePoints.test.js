const Mongoose = require('mongoose');
const Models = require('Models').default;
const { connectDB } = require('TestUtils')
const { cachePoints } = require('DB/ops').default;

const {
  LiveQuestion
} = Models;

const sampleCard = {
  cardId: '1',
  alreadyAnswered: [],
  userPoints: []
}

beforeAll(async () => {
  await connectDB();
});

afterAll(async (done) => {
  await Mongoose.disconnect(done);
});

beforeEach(async () => {
  await LiveQuestion.create(sampleCard);
});

afterEach(async () => {
  await LiveQuestion.remove();
});

it('should add the given points to the given LiveQuestion', async () => {
  const cardBefore = await toString(fetchLiveQuestion('1'));
  const expectedBefore = JSON.stringify(sampleCard)
  const userPoints = {
    userId: '5',
    points: 24,
    timeToAnswer: 10
  };
  const expectedAfter = JSON.stringify({
    cardId: '1',
    alreadyAnswered: [ '5' ],
    userPoints: [ userPoints ]
  });

  await cachePoints('1', userPoints);
  const cardAfter = await toString(fetchLiveQuestion('1'));

  expect(cardBefore).toEqual(expectedBefore);
  expect(cardAfter).toEqual(expectedAfter);
});


// helpers

async function fetchLiveQuestion(id) {
  return await LiveQuestion.findOne(
    { cardId: id }
  ).select({
    _id: 0,
    cardId: 1,
    alreadyAnswered: 1,
    'userPoints.userId': 1,
    'userPoints.points': 1,
    'userPoints.timeToAnswer': 1
  }).exec();
}

function toString(promise) {
  return promise.then(doc =>
    JSON.stringify({
      cardId: doc.cardId,
      alreadyAnswered: doc.alreadyAnswered,
      userPoints: doc.userPoints
    })
  );
}
