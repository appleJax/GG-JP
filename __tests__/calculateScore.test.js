const { calculateScore } = require('Utils/utils');

const answerPostedAt = 'Fri Jan 26 06:54:01 +0000 2018';
const foundQuestion1 = {
  questionPostedAt: 'Fri Jan 26 03:54:01 +0000 2018',
  alreadyAnswered: ['212093209', '3238998230', '120392093']
};

describe('calculates scores correctly', () => {
  test('answer after 3 hours', () => {
    expect(
      calculateScore(answerPostedAt, foundQuestion1)
    ).toBe(21);
  });

  test('max score', () => {
    const foundQuestion2 = {
      ...foundQuestion1,
      questionPostedAt: 'Fri Jan 26 05:55:01 +0000 2018'
    };
    expect(
      calculateScore(answerPostedAt, foundQuestion2)
    ).toBe(24);
  });

  test('min score', () => {
    const foundQuestion3 = {
      ...foundQuestion1,
      questionPostedAt: 'Thu Jan 25 06:55:01 +0000 2018'
    };
    expect(
      calculateScore(answerPostedAt, foundQuestion3)
    ).toBe(1);
  });

  test('zero score', () => {
    const foundQuestion3 = {
      ...foundQuestion1,
      questionPostedAt: 'Thu Jan 22 06:55:01 +0000 2018'
    };
    expect(
      calculateScore(answerPostedAt, foundQuestion3)
    ).toBe(0);
  });
});
