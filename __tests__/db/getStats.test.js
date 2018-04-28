const Mongoose = require('mongoose');
const Models = require('Models').default;
const { connectDB } = require('TestUtils')
const { getStats } = require('DB/ops').default;

const {
  Scoreboard
} = Models;

beforeAll(async () => {
  await connectDB();
});

afterAll(async (done) => {
  await Mongoose.disconnect(done);
});

beforeEach(async () => {
  await Scoreboard.insertMany(
    sampleScores()
  );
});

afterEach(async () => {
  await Scoreboard.remove();
});


it(`should return scores > 0 for the requested view
    sorted in ascending order by rank, handle
`, async () => {
  const req = {
    query: {
      view: 'allTimeStats'
    }
  };
  const stats = await getStats(req);
  const userHandles = stats.users.map(stat => stat.handle);
  const expectedHandles = [
    'B_allTime_rank1',
    'C_allTime_rank1',
    'A_allTime_rank3'
  ];

  expect(userHandles).toEqual(expectedHandles);
  expect(stats.total).toEqual(3);
});


it('should return a number of results <= pageSize', async () => {
  const req = {
    query: {
      view: 'allTimeStats',
      pageSize: 2
    }
  };
  const stats = await getStats(req);
  const userHandles = stats.users.map(stat => stat.handle);
  const expectedHandles = [
    'B_allTime_rank1',
    'C_allTime_rank1'
  ];

  expect(userHandles).toEqual(expectedHandles);
  expect(stats.total).toEqual(3);
});


it('should return the correct page of results', async () => {
  const req = {
    query: {
      view: 'allTimeStats',
      pageSize: 2,
      page: 2
    }
  };
  const stats = await getStats(req);
  const userHandles = stats.users.map(stat => stat.handle);
  const expectedHandles = [
    'A_allTime_rank3'
  ];

  expect(userHandles).toEqual(expectedHandles);
  expect(stats.total).toEqual(3);
});


it('should return the scores whose handles satisfy the search', async () => {
  const req = {
    query: {
      view: 'allTimeStats',
      search: 'C'
    }
  };
  const stats = await getStats(req);
  const userHandles = stats.users.map(stat => stat.handle);
  const expectedHandles = [
    'C_allTime_rank1'
  ];

  expect(userHandles).toEqual(expectedHandles);
  expect(stats.total).toEqual(1);
});

it(`should return (given page + 1)
    if loggedInUser is provided and not found on the given page
  `, async () => {

  const req = {
    query: {
      loggedInUser: '3',
      page: 2,
      pageSize: 1
    }
  };

  const loggedIn = await getStats(req);

  req.query.loggedInUser = '';
  const notLoggedIn = await getStats(req);

  const loggedInIds = loggedIn.users.map(user => user.userId);
  const notLoggedInIds = notLoggedIn.users.map(user => user.userId);

  expect(loggedInIds).toEqual(['3']);
  expect(notLoggedInIds).toEqual(['1']);

});


it(`should have defaults:
    loggedInUser = ''
    page = 1
    pageSize = 100
    view = 'weeklyStats
    search = ''
`, async () => {
  const req = {
    query: {}
  };
  const stats = await getStats(req);
  const userHandles = stats.users.map(stat => stat.handle);
  const expectedHandles = [
    'B_weekly_rank1',
    'C_weekly_rank1',
    'A_weekly_rank3'
  ];

  expect(userHandles).toEqual(expectedHandles);
  expect(stats.total).toEqual(3);
});


it('should return EMPTY if no scores found', async () => {
  const EMPTY = {
    users: [],
    total: 0
  };
  const req = {
    query: {
      search: 'not-a-real-handle'
    }
  };
  const stats = await getStats(req);

  expect(stats).toEqual(EMPTY);
});


// Data initialization

function sampleScores() {
  return [
    {
      userId: '1',
      handle: 'C_weekly_rank1',
      weeklyStats: {
        rank: 1,
        score: 10
      }
    },
    {
      userId: '2',
      handle: 'B_weekly_rank1',
      weeklyStats: {
        rank: 1,
        score: 10
      }
    },
    {
      userId: '3',
      handle: 'A_weekly_rank3',
      weeklyStats: {
        rank: 3,
        score: 9 
      }
    },
    {
      userId: '4',
      handle: 'C_allTime_rank1',
      allTimeStats: {
        rank: 1,
        score: 10
      }
    },
    {
      userId: '5',
      handle: 'B_allTime_rank1',
      allTimeStats: {
        rank: 1,
        score: 10
      }
    },
    {
      userId: '6',
      handle: 'A_allTime_rank3',
      allTimeStats: {
        rank: 3,
        score: 9 
      }
    },
    {
      userId: '7',
      handle: 'zeroAllTime',
      allTimeStats: {
        rank: 4,
        score: 0 
      }
    },
  ];
}
