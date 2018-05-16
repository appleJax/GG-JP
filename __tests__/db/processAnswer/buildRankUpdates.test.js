/**
 * @jest-environment node
 */

const { buildRankUpdates } = require('DB/utils');

const NEW_TIMESTAMP = 123456;
const NEW_BEST_RANK_VALUE = 1;

const updateOps = buildRankUpdates(sampleStats(), NEW_TIMESTAMP);

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
    - lowest avgAnswerTime

  rank numbers are skipped for ties
  e.g. if two players tie for 2nd, the next rank will be 4
`, () => {

  test('basic ranking by score', () => {
    expect(
      ranks(users, 'allTimeStats')
    ).toEqual([1, 2, 3, 4, 5]);
  });

  test('if score is tied, ranks by avgAnswerTime', () => {
    expect(
      ranks(users, 'yearlyStats')
    ).toEqual([1, 2, 3, 4, 5]);
  });

  test('next rank skips when tied score AND tied avgAnswerTime', () => {
    expect(
      ranks(users, 'monthlyStats')
    ).toEqual([1, 1, 3, 4, 5]);
  });

  test('no update if rank is unchanged', () => {
    expect(
      ranks(users, 'weeklyStats')
    ).toEqual([undefined, 2, undefined, 4, 5]);
  });

}); // describe

test('allTimeStats.bestRank is updated if new rank is better than previous bestRank', () => {
  const newBestRank = getBestRank(users[0]);
  const expectedBestRank = {
    value: NEW_BEST_RANK_VALUE,
    timestamp: NEW_TIMESTAMP
  };
  expect(newBestRank).toEqual(expectedBestRank);
});


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

function getBestRank(user) {
  return user.$set['allTimeStats.bestRank'];
}

function sampleStats() {
  return [
    // stat1
    { _id: 'allTimeStats',
      scores: [
        { score: 100,
          users: [
            { userId: '1',
              allTimeStats: {
                avgAnswerTime: 100,
                rank: 0,
                bestRank: {
                  value: 0,
                  timestamp: 1
                }
              }
            }
          ] // users
        },
        { score: 90,
          users: [
            { userId: '2',
              allTimeStats: {
                avgAnswerTime: 20,
                rank: 0,
                bestRank: {
                  value: 1,
                  timestamp: 1
                }
              }
            }
          ] // users
        },
        { score: 80,
          users: [
            { userId: '3',
              allTimeStats: {
                avgAnswerTime: 20,
                rank: 0,
                bestRank: {
                  value: 1,
                  timestamp: 1
                }
              }
            }
          ] // users
        },
        { score: 70,
          users: [
            { userId: '4',
              allTimeStats: {
                avgAnswerTime: 20,
                rank: 0,
                bestRank: {
                  value: 1,
                  timestamp: 1
                }
              }
            }
          ] // users
        },
        { score: 60,
          users: [
            { userId: '5',
              allTimeStats: {
                avgAnswerTime: 10,
                rank: 0,
                bestRank: {
                  value: 1,
                  timestamp: 1
                }
              }
            }
          ] // users
        }
      ] // scores
    },

    // stat2
    { _id: 'yearlyStats',
      scores: [
        { score: 100,
          users: [
            { userId: '1',
              yearlyStats: {
                avgAnswerTime: 100,
                rank: 0
              }
            },
            { userId: '2',
              yearlyStats: {
                avgAnswerTime: 200,
                rank: 0
              }
            }
          ] // users
        },
        { score: 50,
          users: [
            { userId: '3',
              yearlyStats: {
                avgAnswerTime: 100,
                rank: 0
              }
            },
            { userId: '4',
              yearlyStats: {
                avgAnswerTime: 200,
                rank: 0
              }
            },
            { userId: '5',
              yearlyStats: {
                avgAnswerTime: 300,
                rank: 0
              }
            }
          ] // users
        }
      ] // scores
    },

    // stat3
    { _id: 'monthlyStats',
      scores: [
        { score: 100,
          users: [
            { userId: '1',
              monthlyStats: {
                avgAnswerTime: 100,
                rank: 0
              }
            },
            { userId: '2',
              monthlyStats: {
                avgAnswerTime: 100,
                rank: 0
              }
            }
          ] // users
        },
        { score: 50,
          users: [
            { userId: '3',
              monthlyStats: {
                avgAnswerTime: 100,
                rank: 0
              }
            },
            { userId: '4',
              monthlyStats: {
                avgAnswerTime: 200,
                rank: 0
              }
            },
            { userId: '5',
              monthlyStats: {
                avgAnswerTime: 300,
                rank: 0
              }
            }
          ] // users
        }
      ] // scores
    },

    // stat4
    { _id: 'weeklyStats',
      scores: [
        { score: 100,
          users: [
            { userId: '1',
              weeklyStats: {
                avgAnswerTime: 100,
                rank: 1
              }
            },
            { userId: '2',
              weeklyStats: {
                avgAnswerTime: 200,
                rank: 0
              }
            }
          ] // users
        },
        { score: 50,
          users: [
            { userId: '3',
              weeklyStats: {
                avgAnswerTime: 100,
                rank: 3
              }
            },
            { userId: '4',
              weeklyStats: {
                avgAnswerTime: 200,
                rank: 0
              }
            },
            { userId: '5',
              weeklyStats: {
                avgAnswerTime: 300,
                rank: 0
              }
            }
          ] // users
        }
      ] // scores
    }
  ]; // stats
}
