const { buildUpdatesForRank } = require('Utlis/db');

const stats = [
  { _id: 'allTimeStats',
    scores: [
      { score: 100,
        users: [
          { userId: '1',
            allTimeStats: {
              avgTimeToAnswer: 1000,
              rank: 1
            },
            monthlyStats: {
              avgTimeToAnswer: 1000,
              rank: 1
            },
            weeklyStats: {
              avgTimeToAnswer: 1000,
              rank: 1
            }
          },
          { userId: '2',
            allTimeStats: {
              avgTimeToAnswer: 500,
              rank: 2
            },
            monthlyStats: {
              avgTimeToAnswer: 500,
              rank: 2
            },
            weeklyStats: {
              avgTimeToAnswer: 500,
              rank: 2
            }
          }
        ] // users
      }
    ] // scores
  },
  { _id: 'allTimeStats',
    scores: [
      { score: 50,
        users: [
          { userId: '3',
            allTimeStats: {
              avgTimeToAnswer: 100,
              rank: 3
            },
            monthlyStats: {
              avgTimeToAnswer: 100,
              rank: 3
            },
            weeklyStats: {
              avgTimeToAnswer: 100,
              rank: 3
            }
          },
          { userId: '4',
            allTimeStats: {
              avgTimeToAnswer: 100,
              rank: 4
            },
            monthlyStats: {
              avgTimeToAnswer: 100,
              rank: 4
            },
            weeklyStats: {
              avgTimeToAnswer: 100,
              rank: 4
            }
          }
        ] // users
      }
    ] // scores
  }
]; // stats


describe(`
  new ranks are calculated according to highest score, then lowest avgTimeToAnswer.
  rank numbers are skipped for ties. e.g. if two players tie for 2nd, the next rank will be 4
`, () => {
  test('correct update ops are generated for sample stats', () => {
    const updateOps = buildUpdatesForRank(stats);
    const userId1 = updateOps.filter(update => update.updateOne.filter.userId === 1)[0];
    const userId2 = updateOps.filter(update => update.updateOne.filter.userId === 2)[0];
    const userId3 = updateOps.filter(update => update.updateOne.filter.userId === 3)[0];
    const userId4 = updateOps.filter(update => update.updateOne.filter.userId === 4)[0];
    expect(

    );
  });
});
