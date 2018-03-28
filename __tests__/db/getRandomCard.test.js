const Mongoose = require('mongoose');
const Models = require('Models').default;
const { connectDB } = require('TestUtils')
const { getRandomCard } = require('Src/dbOps');

const {
  LiveQuestion,
  NewCard,
  OldCard
} = Models;

beforeAll(async () => {
  await connectDB();

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
  await LiveQuestion.remove().exec();
  await NewCard.remove().exec();
  await OldCard.remove().exec();
  Mongoose.disconnect(done);
});

it('should return a random card from NewCards', async () => {
  const scheduledDeck = { game: 'Scheduled Game' };
  const randomIds = [];

  for (let i = 0; i < 5; i++) {
    const randomCard = await getRandomCard(scheduledDeck);
    randomIds.push(randomCard.cardId);
  }

  const sampleIds = sampleNewCards().map(card => card.cardId);
  const uniqueIds = getUnique(randomIds);

  randomIds.every(
    id => expect(sampleIds).toContain(id)
  );
  expect(uniqueIds).not.toHaveLength(1);
});

it('should return null if no matching cards exist', async () => {
  const scheduledDeck = { game: 'Not found' };
  const randomCard = await getRandomCard(scheduledDeck);

  expect(randomCard).toBeNull();
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
