const { buildUpdatesForRank } = require('Utils/db');

const stats = [

  // stat1
  { _id: 'allTimeStats',
    scores: [
      { score: 100,
        users: [
          { userId: '1',
            allTimeStats: {
              avgTimeToAnswer: 100,
              rank: 0
            }
          },
          { userId: '2',
            allTimeStats: {
              avgTimeToAnswer: 200,
              rank: 0
            }
          }
        ] // users
      },
      { score: 50,
        users: [
          { userId: '3',
            allTimeStats: {
              avgTimeToAnswer: 100,
              rank: 0
            }
          },
          { userId: '4',
            allTimeStats: {
              avgTimeToAnswer: 200,
              rank: 0
            }
          },
          { userId: '5',
            allTimeStats: {
              avgTimeToAnswer: 300,
              rank: 0
            }
          }
        ] // users
      }
    ] // scores
  },

  // stat2
  { _id: 'monthlyStats',
    scores: [
      { score: 100,
        users: [
          { userId: '1',
            monthlyStats: {
              avgTimeToAnswer: 100,
              rank: 0
            }
          },
          { userId: '2',
            monthlyStats: {
              avgTimeToAnswer: 100,
              rank: 0
            }
          }
        ] // users
      },
      { score: 50,
        users: [
          { userId: '3',
            monthlyStats: {
              avgTimeToAnswer: 100,
              rank: 0
            }
          },
          { userId: '4',
            monthlyStats: {
              avgTimeToAnswer: 200,
              rank: 0
            }
          },
          { userId: '5',
            monthlyStats: {
              avgTimeToAnswer: 300,
              rank: 0
            }
          }
        ] // users
      }
    ] // scores
  },

  // stat3
  { _id: 'weeklyStats',
    scores: [
      { score: 100,
        users: [
          { userId: '1',
            weeklyStats: {
              avgTimeToAnswer: 100,
              rank: 1
            }
          },
          { userId: '2',
            weeklyStats: {
              avgTimeToAnswer: 200,
              rank: 0
            }
          }
        ] // users
      },
      { score: 50,
        users: [
          { userId: '3',
            weeklyStats: {
              avgTimeToAnswer: 100,
              rank: 3
            }
          },
          { userId: '4',
            weeklyStats: {
              avgTimeToAnswer: 200,
              rank: 0
            }
          },
          { userId: '5',
            weeklyStats: {
              avgTimeToAnswer: 300,
              rank: 0
            }
          }
        ] // users
      }
    ] // scores
  }
]; // stats

const updateOps = buildUpdatesForRank(stats);
const users = [
  getUser('1', updateOps),
  getUser('2', updateOps),
  getUser('3', updateOps),
  getUser('4', updateOps),
  getUser('5', updateOps)
];


describe(`
  new ranks are calculated according to
    - highest score
    - lowest avgTimeToAnswer

  rank numbers are skipped for ties
  e.g. if two players tie for 2nd, the next rank will be 4
`, () => {

  test('basic ranking by score, avgTimeToAnswer', () => {
    expect(
      ranks(users, 'allTimeStats')
    ).toEqual([1, 2, 3, 4, 5]);
  });

  test('next rank skips when tied score AND tied avgTimeToAnswer', () => {
    expect(
      ranks(users, 'monthlyStats')
    ).toEqual([1, 1, 3, 4, 5]);
  });

  test('no update if ranking is unchanged', () => {
    expect(
      ranks(users, 'weeklyStats')
    ).toEqual([undefined, 2, undefined, 4, 5]);
  });

}); // describe


// helpers

function getUser(userId, ops) {
  return ops.find(
    op => op.updateOne.filter.userId === userId
  ).updateOne.update;
}

function ranks(users, category) {
  return users.map(rank(category));
}

function rank(category) {
  return (user) => user.$set[`${category}.rank`]
}
