const { formatTopTenTweet } = require('Twitter/utils');

const { APP_URL } = process.env;


describe('it should return an appropriate tweet status', () => {

  test('for the week', () => {
    const category = 'weeklyStats';
    const status = formatTopTenTweet(topTen(), category);

    expect(status).toEqual(sampleStatus('week'));
  });

  test('for the month', () => {
    const category = 'monthlyStats';
    const status = formatTopTenTweet(topTen(), category);

    expect(status).toEqual(sampleStatus('month'));
  });

});

describe('it should recognize achievements', () => {


  describe('personal best', () => {
    test('for the week', () => {
      const topTenPBWeekly = replaceLeader(
        personalBest('weeklyStats'),
        topTen()
      );

      const status = formatTopTenTweet(topTenPBWeekly, 'weeklyStats');
      const expectedStatus = sampleStatus('week', 'PB');

      expect(status).toEqual(expectedStatus);
    });

    test('for the month', () => {
      const topTenPBMonthly = replaceLeader(
        personalBest('monthlyStats'),
        topTen()
      );

      const status = formatTopTenTweet(topTenPBMonthly, 'monthlyStats');
      const expectedStatus = sampleStatus('month', 'PB');

      expect(status).toEqual(expectedStatus);
    });
  });

  test('perfect weekly score', () => {
    const topTenPerfectWeekly = replaceLeader(
      perfectScore(),
      topTen()
    );

    const status = formatTopTenTweet(topTenPerfectWeekly, 'weeklyStats');
    const expectedStatus = sampleStatus('week', 'perfect');

    expect(status).toEqual(expectedStatus);
  });

});


// helpers

const BASE_SCORE = 10100;

function topTen() {
  const users = [];
  for (let i = 1; i <= 10; i++) {
    users.push({
      handle: `user${i}`,
      monthlyStats: {
        rank: i,
        score: BASE_SCORE - i*100,
        highestScore: {
          value: BASE_SCORE + 1
        }
      },
      weeklyStats: {
        rank: i,
        score: BASE_SCORE - i*100,
        highestScore: {
          value: BASE_SCORE + 1
        }
      }
    });
  }

  return users;
}

function perfectScore() {
  return {
    handle: 'perfectUser',
    weeklyStats: {
      rank: 1,
      score: 672,
      highestScore: {
        value: 672
      }
    }
  }
}

function personalBest(category) {
  let monthlyOffset = 1;
  let weeklyOffset = 1;
  if (category === 'weeklyStats') {
    weeklyOffset = -1;
  } else {
    monthlyOffset = -1;
  }

  const PB_BASE = BASE_SCORE - 100;
  return {
    handle: 'pbUser',
    monthlyStats: {
      rank: 1,
      score: PB_BASE,
      highestScore: {
        value: PB_BASE + monthlyOffset
      }
    },
    weeklyStats: {
      rank: 1,
      score: PB_BASE,
      highestScore: {
        value: PB_BASE + weeklyOffset
      }
    }
  }
}

function replaceLeader(newUser, topTen) {
  return [ newUser ].concat(topTen.slice(1));
}

function sampleStatus(timePeriod, achievement) {
  let leader = '\n1 @user1 10,000';
  if (achievement === 'PB') {
    leader = '\n1 @pbUser 10,000🏅';
  }

  if (achievement === 'perfect') {
    leader = '\n1 @perfectUser 672🏆PERFECT';
  }
      
  return `Congrats to this past ${timePeriod}'s Top 10!` +
    leader +
    '\n2 @user2 9,900' +
    '\n3 @user3 9,800' +
    '\n4 @user4 9,700' +
    '\n5 @user5 9,600' +
    '\n6 @user6 9,500' +
    '\n7 @user7 9,400' +
    '\n8 @user8 9,300' +
    '\n9 @user9 9,200' +
    '\n10 @user10 9,100' +
    '\n🏅= PB' +
    `\nランキング: ${APP_URL}/stats`;
}