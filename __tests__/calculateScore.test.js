const { calculateScore } = require('../src/utils');

const answerPostedAt = 'Fri Jan 26 06:54:01 +0000 2018';
const foundQuestion1 = {
  questionPostedAt: 'Fri Jan 26 03:54:01 +0000 2018',
  alreadyAnswered: ['212093209', '3238998230', '120392093']
};

describe('calculates scores correctly if no bonus', () => {
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
});

describe('calculates scores with bonuses correctly', () => {
  test ('baseline', () => {
    expect(
      calculateScore(answerPostedAt, foundQuestion1)
    ).toBe(21);
  });

  test('Calculates 10 bonus points for being first to answer', () => {
    const foundQuestionNoCorrectAnswers = {
      ...foundQuestion1,
      alreadyAnswered: []
    };

    expect(
      calculateScore(answerPostedAt, foundQuestionNoCorrectAnswers)
    ).toBe(31);
  });

  test('Calculates 7 bonus points for being second to answer', () => {
    const foundQuestion1PrevAnswer = {
      ...foundQuestion1,
      alreadyAnswered: ['909823222']
    };

    expect(
      calculateScore(answerPostedAt, foundQuestion1PrevAnswer)
    ).toBe(28);
  });

  test('Calculates 5 bonus points for being third to answer', () => {
    const foundQuestion2PrevAnswers = {
      ...foundQuestion1,
      alreadyAnswered: ['030498230498', '90243092343']
    };

    expect(
      calculateScore(answerPostedAt, foundQuestion2PrevAnswers)
    ).toBe(26);
  });
});
