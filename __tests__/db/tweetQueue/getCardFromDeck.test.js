const Mongoose = require('mongoose');
const Models = require('Models').default;
const { connectDB } = require('TestUtils')
const { getCardFromDeck } = require('DB/tweetQueue');

const {
  LiveQuestion,
  NewCard,
  OldCard
} = Models;

beforeAll(async () => {
  await connectDB();

  await NewCard.insertMany(
    sampleNewCards()
  );
});

afterAll(async (done) => {
  await NewCard.remove();
  await Mongoose.disconnect(done);
});

it('should return a random card from NewCards', async () => {
  const scheduledDeck = { game: 'Scheduled Game' };
  const randomIds = [];
  for (let i = 0; i < 5; i++) {
    const randomCardId = await getCardFromDeck(scheduledDeck);
    randomIds.push(randomCardId);
  }

  const sampleIds = sampleNewCards().map(card => card.cardId);
  const uniqueIds = getUnique(randomIds);

  randomIds.forEach(
    id => expect(sampleIds).toContain(id)
  );
  expect(uniqueIds).not.toHaveLength(1);
});

it('should return null if no matching cards exist', async () => {
  const scheduledDeck = { game: 'Not found' };
  const randomCardId = await getCardFromDeck(scheduledDeck);

  expect(randomCardId).toBeNull();
});


// helpers

function getUnique(arr) {
  return arr.reduce((unique, value) => {
    if (unique.filter(other => other === value).length > 0)
      return unique;
    else
      return unique.concat([value])
  }, [])
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
