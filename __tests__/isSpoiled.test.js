const { isSpoiled } = require('Utils');

const card1 = {
  'answers' : [ '軽減' ],
  'prevLineAltText' : 'VARIA SUIT バリアスーツ',
  'questionAltText' : '敵からのダメージを(2 characters)する'
};

const card2 = {
  'answers' : [ '殲滅' ],
  'mediaUrls': [
    { altText: '緊急指令' },
    { altText: '惑星ゼーベスの「メトロイド」を(2 characters)せよ。そして…' }
  ]
};

const card3 = {
  answers: [ '緊急' ],
  questionAltText: '(2 characters)指令'
}

const spoilerText = '殲滅 緊急指令 惑星ゼーベスの「メトロイド」を(2 characters)せよ。そして…';

const liveAnswers = [
		"凍らせる",
    "不適合",
    "不能"
];

describe('Spoilers will get caught', () => {
  test('spoiler', () => {
    expect(
      isSpoiled(card3, spoilerText, liveAnswers)
    ).toBeTruthy();
  });
});
