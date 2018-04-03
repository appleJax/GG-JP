const Mongoose = require('mongoose');
const Models = require('Models').default;
const { connectDB } = require('TestUtils')
const { addOrUpdateUser } = require('DB/ops').default;

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

const sampleUser = {
  userId: '1',
  name: 'User Name',
  handle: 'username',
  avatar: 'avatarUrl',
  profileBanner: 'bannerUrl',
  following: [
    '2',
    '3'
  ]
};

const sampleUser2 = {
  userId: '1',
  name: 'New Name',
  handle: 'newname',
  avatar: 'newAvatarUrl',
  profileBanner: 'newBannerUrl',
  following: [
    '4',
    '5'
  ]
};

const [
  sampleUserString,
  sampleUser2String
] = [ sampleUser, sampleUser2 ].map(JSON.stringify);

it('should add the user if the user does not exist', async () => {
  const dbUser = await fetchUser('1');
  await addOrUpdateUser(sampleUser);
  const newUser = await toString(fetchUser('1'));

  expect(dbUser).toBeNull();
  expect(newUser).toEqual(sampleUserString);
});

it('should update the user if the user exists', async () => {
  await addOrUpdateUser(sampleUser);
  const dbUser = await toString(fetchUser('1'));
  await addOrUpdateUser(sampleUser2);
  const newUser = await toString(fetchUser('1'));
  const userCount = await Scoreboard.find().count().exec();

  expect(userCount).toEqual(1);
  expect(dbUser).toEqual(sampleUserString);
  expect(newUser).toEqual(sampleUser2String);
});


// helpers

async function fetchUser(id) {
  return await Scoreboard.findOne(
    { userId: id }
  ).select({
    _id: 0,
    userId: 1,
    name: 1,
    handle: 1,
    avatar: 1,
    profileBanner: 1,
    following: 1
  }).exec();
}

function toString(promise) {
  return promise.then(doc =>
    JSON.stringify({
      userId: doc.userId,
      name: doc.name,
      handle: doc.handle,
      avatar: doc.avatar,
      profileBanner: doc.profileBanner,
      following: doc.following
    })
  );
}
