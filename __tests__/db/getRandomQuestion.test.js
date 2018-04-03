const Mongoose = require('mongoose');
const Models = require('Models').default;
const { connectDB } = require('TestUtils')
const { getRandomQuestion } = require('DB/ops').default;

const {
  DeckTitle,
  LiveQuestion,
  NewCard,
  Schedule
} = Models;

// shared variable
let newCardIds;

beforeAll(async () => {
  await connectDB();
});

afterAll(async (done) => {
  await Mongoose.disconnect(done);
});

beforeEach(async () => {
  await Schedule.create(
    { time: 2, deck: 'Scheduled Game'},
  );

  await DeckTitle.create(
    { fullTitle: 'Scheduled Game', finished: false }
  );

  await NewCard.insertMany(
    sampleNewCards()
  );

  const newCards = await NewCard.find().exec();
  newCardIds = newCards.map(card => card.cardId);
});

afterEach(async () => {
  await DeckTitle.remove();
  await LiveQuestion.remove();
  await NewCard.remove();
  await Schedule.remove();
});

it('should return a random question card from NewCards', async () => {
  const randomQuestionId = await getRandomQuestionId();
  expect(newCardIds).toContain(randomQuestionId);
});

it('should remove the random card from NewCards', async () => {
  const randomQuestionId = await getRandomQuestionId();
  const afterNewCards = await NewCard.find().exec();
  const afterNewCardIds = afterNewCards.map(card => card.cardId);

  expect(newCardIds).toHaveLength(5);
  expect(afterNewCardIds).toHaveLength(4);
  expect(afterNewCardIds).not.toContain(randomQuestionId)
});

it('should add the random card to LiveQuestions', async () => {
  const liveQuestions = await LiveQuestion.find().exec();
  const randomQuestionId = await getRandomQuestionId();
  const afterLiveQuestions = await LiveQuestion.find().exec();
  const liveQuestionId = afterLiveQuestions[0].cardId;

  expect(liveQuestions).toHaveLength(0);
  expect(afterLiveQuestions).toHaveLength(1);
  expect(liveQuestionId).toEqual(randomQuestionId);
});


// helper

function getRandomQuestionId() {
  return new Promise(async (resolve, reject) => {
    const randomQuestion = await getRandomQuestion(2);
    resolve(randomQuestion.cardId);
  });
}


// Data initialization

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
