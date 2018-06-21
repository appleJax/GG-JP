const Mongoose = require('mongoose');
const Models = require('Models').default;
const { connectDB } = require('TestUtils');
const { updateTimestamps } = require('DB/ops');

const {
  Timestamp
} = Models;

beforeAll(async () => {
  await connectDB();
  await Timestamp.remove();
});

afterAll(async (done) => {
  await Mongoose.disconnect(done);
});

const sampleTimestamps = {
  year: 0,
  month: 0,
  week: 0,
  day: 0,
  lastReadDM: 0
}

let oldTimestamps, update, newTimestamps;

beforeEach(async () => {
  await Timestamp.create(sampleTimestamps);

  oldTimestamps = await fetchTimestamps();
  update = newTimestamp();
});

afterEach(async () => {
  await Timestamp.remove();
});


it('should always update the daily timestamp', async () => {
  await updateTimestamps();
  newTimestamps = await fetchTimestamps();

  const updatedTimestamps = {
    ...sampleTimestamps,
    day: update
  }

  expect(oldTimestamps).toEqual(sampleTimestamps);
  expect(newTimestamps).toEqual(updatedTimestamps);
});

it('should update the weekly timestamp if newWeek param is truthy', async () => {
  await updateTimestamps('newWeek');
  newTimestamps = await fetchTimestamps();

  const updatedTimestamps = {
    ...sampleTimestamps,
    day: update,
    week: update
  }

  expect(oldTimestamps).toEqual(sampleTimestamps);
  expect(newTimestamps).toEqual(updatedTimestamps);
});

it('should update the monthly timestamp if newMonth param is truthy', async () => {
  await updateTimestamps(false, 'newMonth');
  newTimestamps = await fetchTimestamps();

  const updatedTimestamps = {
    ...sampleTimestamps,
    day: update,
    month: update
  }

  expect(oldTimestamps).toEqual(sampleTimestamps);
  expect(newTimestamps).toEqual(updatedTimestamps);
});

it('should update the yearly timestamp if newYear param is truthy', async () => {
  await updateTimestamps(false, false, 'newYear');
  newTimestamps = await fetchTimestamps();

  const updatedTimestamps = {
    ...sampleTimestamps,
    day: update,
    year: update
  }

  expect(oldTimestamps).toEqual(sampleTimestamps);
  expect(newTimestamps).toEqual(updatedTimestamps);
});

it('should update all timestamps whose params are truthy', async () => {
  await updateTimestamps('newWeek', 'newMonth', 'newYear');
  newTimestamps = await fetchTimestamps();

  const updatedTimestamps = {
    day: update,
    week: update,
    month: update,
    year: update,
    lastReadDM: 0
  }

  expect(oldTimestamps).toEqual(sampleTimestamps);
  expect(newTimestamps).toEqual(updatedTimestamps);
});


// helpers

function fetchTimestamps() {
  return Timestamp
    .findOne()
    .select({
      _id: 0,
      __v: 0
    }).lean().exec();
}

function newTimestamp() {
  const now = new Date();

  return Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    0, 0, 0, 0
  );
}