const Mongoose = require('mongoose');
const Models = require('Models').default;
const { connectDB } = require('TestUtils')
const DBOps = require('Src/dbOps');

const { getRandomQuestion } = DBOps;
const {
  DeckTitle,
  LiveQuestion,
  NewCard,
  OldCard,
  Schedule
} = Models;

beforeAll(async () => {
  await connectDB();

  await Schedule.insertMany([
    { time: 2, deck: 'DeckAtTwo'},
    { time: 8, deck: 'DeckAtEight'}
  ]);

  await DeckTitle.insertMany([
    { fullTitle: 'DeckAtTwo',   finished: false },
    { fullTitle: 'DeckAtEight', finished: false }
  ]);


  await LiveQuestion.insertMany(
    sampleLiveQuestions()
  );

  await NewCard.insertMany(
    sampleNewCards()
  );

  await OldCard.insertMany(
    sampleOldCards()
  );

});

afterAll(async (done) => {
  await DeckTitle.remove().exec();
  await LiveQuestion.remove().exec();
  await NewCard.remove().exec();
  await OldCard.remove().exec();
  await Schedule.remove().exec();
  Mongoose.disconnect(done);
});

it('should return a random question card from NewCards', async () => {
  //TODO

  expect('result').toEqual('some result')
});


// Data initialization

function sampleLiveQuestions() {
  return [
    {
      cardId: 'Live1',
      answers: [],
      mediaUrls: [
        { altText: '' }
      ],
      otherVisibleContext: ''
    }
  ];
}

function sampleNewCards() {
  return [
    {
      cardId: 'New1',
      game: 'Scheduled Game',
      answers: [],
      prevLineAltText: '',
      questionAltText: '',
      answerAltText: '',
      otherVisibleContext: ''
    },
    {
      cardId: 'New2',
      game: 'Scheduled Game',
      answers: [],
      prevLineAltText: '',
      questionAltText: '',
      answerAltText: '',
      otherVisibleContext: ''
    },
    {
      cardId: 'New3',
      game: 'Scheduled Game',
      answers: [],
      prevLineAltText: '',
      questionAltText: '',
      answerAltText: '',
      otherVisibleContext: ''
    },
    {
      cardId: 'New4',
      game: 'Scheduled Game',
      answers: [],
      prevLineAltText: '',
      questionAltText: '',
      answerAltText: '',
      otherVisibleContext: ''
    },
    {
      cardId: 'New5',
      game: 'Scheduled Game',
      answers: [],
      prevLineAltText: '',
      questionAltText: '',
      answerAltText: '',
      otherVisibleContext: ''
    },
  ];
}

function sampleOldCards() {
  return [
    {
      cardId: 'Old1',
      answers: [],
      mediaUrls: [
        { altText: '' }
      ],
      otherVisibleContext: ''
    }
  ];
}
