const Mongoose = require('mongoose');
const models = require('Models').default;
const { connectDB } = require('TestUtils');
const { fetchDMs } = require('Twitter/utils');

const {
  Timestamp
} = models;

beforeAll(async () => {
  console.log('Connecting DB...')
  await connectDB();
  console.log('Connected!!!')
});

afterAll(async (done) => {
  await Mongoose.disconnect(done);
});


let mockGet, mockTwitter;

beforeEach(async () => {
  await Timestamp.create(sampleTimestamps());
  console.log('Timestamp Entry created!')

  mockGet = jest.fn()
    .mockReturnValueOnce(
      returnValue(firstPage())
    )
    .mockReturnValue(
      returnValue(lastPage())
    )

  mockTwitter = jest.fn()
    .mockReturnValue({
      get: mockGet
    });

  console.log('BeforeEach complete!')
});

afterEach(async () => {
  await Timestamp.remove();
});


describe('if first DM of fetched results is newer than lastReadDirectMessage', () => {

  it('should update lastReadDirectMessage timestamp', async () => {
    console.log('Test 1 running...')
    const lastReadDMBefore = await fetchLastReadDM();
    console.log('Test 1 running...')
    await fetchDMs(mockTwitter());
    console.log('Test 1 running...')
    const lastReadDMAfter = await fetchLastReadDM();

    expect(lastReadDMBefore).toBe(1);
    expect(lastReadDMAfter).toBe(8);
  });

});

describe('if last DM of fetched results is newer than lastReadDirectMessage', () => {

  it('should return more than one page of DM results', async () => {
    const directMessages = await fetchDMs(mockTwitter())
    const expectedDMs = firstPage().concat(lastPage());

    expect(directMessages).toEqual(expectedDMs);
  });

});

describe('if last DM of fetched results is older than lastReadDirectMessage', () => {

  it('should return one page of DM results', async () => {
    await setLastReadDM(6);
    const directMessages = await fetchDMs(mockTwitter())

    expect(directMessages).toEqual(firstPage());
  });

});

describe('if first fetched DM is the same as lastReadDirectMessage', () => {

  it('should return an empty array', async () => {
    await setLastReadDM(8);
    const directMessages = await fetchDMs(mockTwitter());

    expect(directMessages).toEqual([]);
  });

});


// helpers

async function fetchLastReadDM() {
  return await Timestamp
    .findOne()
    .lean()
    .then(doc => doc.lastReadDirectMessage);
}

async function setLastReadDM(timestamp) {
  return await Timestamp.update({},
    { $set: { lastReadDirectMessage: timestamp }}
  ).exec();
}

function returnValue(contents) {
  return Promise.resolve({
    data: {
      nextCursor: true,
      events: contents
    }
  });
}

function firstPage() {
  return [
    { created_timestamp: '8' },
    { created_timestamp: '7' },
    { created_timestamp: '6' },
    { created_timestamp: '5' }
  ];
}

function lastPage() {
  return [
    { created_timestamp: '4' },
    { created_timestamp: '3' },
    { created_timestamp: '2' },
    { created_timestamp: '1' }
  ];
}

function sampleTimestamps() {
  return {
    year: 0,
    month: 0,
    week: 0,
    day: 0,
    lastReadDirectMessage: 1
  };
}
