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
  await Mongoose.disconnect(done);
});


const CARD_ID = 'c1';
const sampleCard = {
  cardId: CARD_ID,
  alreadyAnswered: [],
  userPoints: []
};

beforeEach(async () => {
  await LiveQuestion.create(sampleCard);
});

afterEach(async () => {
  await LiveQuestion.remove();
});

it('should add the given points to the given LiveQuestion', async () => {
  const cardBefore = await fetchLiveQuestion(CARD_ID);
  const USER_ID = 'u5';
  const userPoints = {
    userId: USER_ID,
    points: 23,
    timeToAnswer: 60
  };
  const updatedCard = {
    cardId: CARD_ID,
    alreadyAnswered: [ USER_ID ],
    userPoints: [ userPoints ]
  };

  await cachePoints(CARD_ID, userPoints);
  const cardAfter = await fetchLiveQuestion(CARD_ID);

  expect(cardBefore).toEqual(sampleCard);
  expect(cardAfter).toEqual(updatedCard);
});


// helpers

function fetchLiveQuestion(id) {
  return LiveQuestion.findOne(
    { cardId: id }
  ).select({
    _id: 0,
    cardId: 1,
    alreadyAnswered: 1,
    'userPoints.userId': 1,
    'userPoints.points': 1,
    'userPoints.timeToAnswer': 1
  }).lean().exec();
}