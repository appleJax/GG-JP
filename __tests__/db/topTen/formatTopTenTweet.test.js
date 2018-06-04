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
        rank: i,
        score: 10100 - i*100
      },
      weeklyStats: {
        rank: i,
        score: 10100 - i*100
      }
    });
  }

  return users;
}

function sampleStatus(timePeriod) {
  return `Congrats to this past ${timePeriod}'s Top Ten!\n` +
    '\n1. @user1 - 10,000' +
    '\n2. @user2 - 9,900' +
    '\n3. @user3 - 9,800' +
    '\n4. @user4 - 9,700' +
    '\n5. @user5 - 9,600' +
    '\n6. @user6 - 9,500' +
    '\n7. @user7 - 9,400' +
    '\n8. @user8 - 9,300' +
    '\n9. @user9 - 9,200' +
    '\n10. @user10 - 9,100' +
    `\n\nランキング: ${APP_URL}/stats`;
}