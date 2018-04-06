const Mongoose = require('mongoose');
const Models = require('Models').default;
const { connectDB } = require('TestUtils')
const { findOrCreateUser } = require('DB/utils');

const {
  Scoreboard
} = Models;

beforeAll(async () => {
  await connectDB();
});

afterAll(async (done) => {
  await Mongoose.disconnect(done);
});

afterEach(async () => {
  await Scoreboard.remove();
});

const USER_ID = 'u1';

const twitterProfile = {
  id_str: USER_ID,
  name: 'New Name',
  screen_name: 'newHandle',
  profile_image_url_https: 'newAvatar',
  profile_banner_url: 'banner'
};

const sampleUser = {
  userId: USER_ID,
  name: 'name',
  handle: 'handle',
  avatar: 'avatar',
  profileBanner: 'banner'
};

const result = {
  userId: USER_ID,
  name: 'New Name',
  handle: 'newHandle',
  avatar: 'newAvatar',
  profileBanner: 'banner'
};


it('should create and return new user if user does not exist', async () => {
  const existingUser = await Scoreboard.findOne(
    { userId: USER_ID }
  ).lean().exec();

  const newUser = await filterProps(
    findOrCreateUser(USER_ID, twitterProfile, 'noSideEffects')
  );

  expect(existingUser).toBeNull();
  expect(newUser).toEqual(result)
});

it('should update and return the user if user exists', async () => {
  await Scoreboard.create(sampleUser);
  const existingUser = await filterProps(
    Scoreboard.findOne({ userId: USER_ID }).lean().exec()
  );

  const updatedUser = await filterProps(
    findOrCreateUser(USER_ID, twitterProfile, 'noSideEffects')
  );

  expect(existingUser).toEqual(sampleUser);
  expect(updatedUser).toEqual(result);
});


function filterProps(promise) {
  return promise.then(({
    userId,
    name,
    handle,
    avatar,
    profileBanner,
    ...rest
  }) => ({
    userId,
    name,
    handle,
    avatar,
    profileBanner
    })
  );
}
