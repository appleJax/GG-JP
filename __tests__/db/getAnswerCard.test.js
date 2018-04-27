const Mongoose = require('mongoose');
const Models = require('Models').default;
const { connectDB } = require('TestUtils');
const { getAnswerCard } = require('DB/ops').default;

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
const QUESTION_TEXT = 'text';

beforeEach(async () => {
  await LiveQuestion.create({
    cardId: CARD_ID,
    questionText: QUESTION_TEXT
  });
});

afterEach(async () => {
  await LiveQuestion.remove();
});

it('should return the requested card from LiveQuestions', async () => {
  const answerCard = await getAnswerCard(CARD_ID);

  expect(answerCard.cardId).toEqual(CARD_ID);
  expect(answerCard.questionText).toEqual(QUESTION_TEXT);
});
