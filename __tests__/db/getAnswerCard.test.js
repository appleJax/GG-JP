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
  Mongoose.disconnect(done);
});

it('should return the requested card from LiveQuestions', async () => {
  await LiveQuestion.create({
    cardId: '1',
    questionText: 'text'
  });

  const answerCard = await getAnswerCard('1');

  expect(answerCard.questionText).toEqual('text');
});
