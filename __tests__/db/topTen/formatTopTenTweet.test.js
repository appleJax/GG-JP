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


function topTen() {
  const users = [];
  for (let i = 1; i <= 10; i++) {
    users.push({
      handle: `user${i}`,
      monthlyStats: {
        rank: i
      },
      weeklyStats: {
        rank: i
      }
    });
  }

  return users;
}

function sampleStatus(timePeriod) {
  return `Congrats to last ${timePeriod}'s Top Ten!` +
    '\n1. @user1' +
    '\n2. @user2' +
    '\n3. @user3' +
    '\n4. @user4' +
    '\n5. @user5' +
    '\n6. @user6' +
    '\n7. @user7' +
    '\n8. @user8' +
    '\n9. @user9' +
    '\n10. @user10' +
    `\nLeaderboard: ${APP_URL}/stats`;
}