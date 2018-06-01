const { formatHardestQuestionTweet } = require('Twitter/utils');
const { tweetLink } = require('Utils');

describe('it should return an appropriate tweet status', () => {

  test('when the hardest question has a hint', () => {
    const status = formatHardestQuestionTweet(questionWithHint());
    expect(status).toEqual(statusWithHint());
  });

  test('when the hardest question does not have a hint', () => {
    const status = formatHardestQuestionTweet(questionNoHint());
    expect(status).toEqual(statusNoHint());
  });

});


function questionWithHint() {
  return  {
    cardId: '1',
    questionText: `First line\nHint: a hint\nThis line should not be included`,
    userPoints: [
      { userId: 'u1',
        points: 0
      }
    ]
  };
}

function questionNoHint() {
  return  {
    cardId: '2',
    questionText: `First line\nThis line should not be included`,
    userPoints: [
      { userId: 'u1',
        points: 10
      }
    ]
  };
}

function statusWithHint() {
  return `*REVIEW*\nThis past week's hardest question:\n\n` +
    questionWithHint().questionText.split('\n').slice(0, 2).join('\n') +
    '\n正解率: 0% (0/1)' +
    `\n覚えましたか？: ${tweetLink(questionWithHint().cardId)}`;
}

function statusNoHint() {
  return `*REVIEW*\nThis past week's hardest question:\n\n` +
    questionNoHint().questionText.split('\n')[0] +
    '\n正解率: 100% (1/1)' +
    `\n覚えましたか？: ${tweetLink(questionNoHint().cardId)}`;
}