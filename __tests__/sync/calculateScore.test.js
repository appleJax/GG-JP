/**
 * @jest-environment node
 */

const { calculateScore } = require('Utils');

const answerPostedAt = millis('Fri Jan 26 06:54:01 +0000 2018');

describe('calculates scores correctly', () => {

  test('answer after 3 hours', () => {
    const question = {
      questionPostedAt: millis('Fri Jan 26 03:54:01 +0000 2018')
    };
    expect(
      calculateScore(answerPostedAt, question)
    ).toBe(21);
  });

  test('max score', () => {
    const question = {
      questionPostedAt: millis('Fri Jan 26 05:55:01 +0000 2018')
    };
    expect(
      calculateScore(answerPostedAt, question)
    ).toBe(24);
  });

  test('min score', () => {
    const question = {
      questionPostedAt: millis('Thu Jan 25 06:55:01 +0000 2018')
    };
    expect(
      calculateScore(answerPostedAt, question)
    ).toBe(1);
  });

  test('zero score', () => {
    const question = {
      questionPostedAt: millis('Thu Jan 25 06:54:01 +0000 2018')
    };
    expect(
      calculateScore(answerPostedAt, question)
    ).toBe(0);
  });

}); // describe

function millis(dateString) {
  return new Date(dateString).getTime();
}
