const Mongoose = require('mongoose');
const Models = require('Models').default;
const { connectDB } = require('TestUtils')
const { processAnswerWorkflow } = require('DB/ops').default;

const {
  LiveQuestion,
  OldCard
} = Models;

beforeAll(async () => {
  await connectDB();
});

afterAll(async (done) => {
  Mongoose.disconnect(done);
});

it('should ...', async () => {
  expect(1).toEqual(1);
});