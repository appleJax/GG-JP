const Mongoose = require('mongoose');
const Models = require('Models').default;
const { connectDB } = require('TestUtils')
const { getAnswerCard } = require('DB/ops').default;

const {
  LiveQuestion
} = Models;

beforeAll(async () => {
  await connectDB();
});

afterAll(async (done) => {
  await LiveQuestion.remove();
  await Mongoose.disconnect(done);
});

const CARD_ID = 'c1';

it('should return the requested card from LiveQuestions', async () => {
  await LiveQuestion.create({
    cardId: CARD_ID,
    questionText: 'text'
  });

  const answerCard = await getAnswerCard(CARD_ID);

  expect(answerCard.questionText).toEqual('text');
});
