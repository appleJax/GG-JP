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

const USER_ID = 'c6';

it('should add the given user to the Scoreboard collection', async () => {
  const newUser = {
    body: {
      userId: USER_ID,
      name: 'Bob'
    }
  };

  const existingUserCount = await Scoreboard.find().count().exec();
  await createUser(newUser);
  const newUserCount = await Scoreboard.find().count().exec();
  const newUserObj = await Scoreboard.findOne({ userId: USER_ID }).lean().exec();

  expect(existingUserCount).toEqual(0);
  expect(newUserCount).toEqual(1);
  expect(newUserObj.name).toEqual('Bob');
});
