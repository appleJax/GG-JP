const Mongoose = require('mongoose');
const Models = require('Models').default;
const { connectDB } = require('TestUtils')
const { getDeck } = require('DB/ops').default;

const {
  DeckTitle,
  OldCard
} = Models;

beforeAll(async () => {
  await connectDB();
  await DeckTitle.insertMany(sampleDeckTitles());
  await OldCard.insertMany(sampleCards());
});

afterAll(async (done) => {
  Mongoose.disconnect(done);
});

const EMPTY = {
  cards: null,
  total: 0
};

it(`should return all the tweeted cards from the given deck
    sorted in desc order by answerPostedAt
   `, async () => {
  const req = {
    params: {
      slug: 'some-game'
    },
    query: {}
  };

  const result = await getDeck(req);
  const answersPostedAt = result.cards.map(card => card.answerPostedAt);

  expect([2, 1]).toEqual(answersPostedAt);
  expect(2).toEqual(result.total);
});

it('should return EMPTY if deckTitle is not found', async () => {
  const req = {
    params: {
      slug: 'not-a-real-game'
    },
    query: {}
  };

  const result = await getDeck(req);

  expect(result).toEqual(EMPTY);
});

it('should return EMPTY if no cards from given deck have been tweeted yet', async () => {
  const req = {
    params: {
      slug: 'none-tweeted'
    },
    query: {}
  };

  const result = await getDeck(req);

  expect(result).toEqual(EMPTY);
});


// helpers

function sampleCards() {
  return [
    {
      answerId:       '1',
      answerPostedAt: 1,
      answers:        [],
      cardId:         '1',
      game:           'Some Game',
      mainImageSlice: [0,1],
      mediaUrls:      [],
      questionText:   ''
    },
    {
      answerId:       '1',
      answerPostedAt: 2,
      answers:        [],
      cardId:         '1',
      game:           'Some Game',
      mainImageSlice: [0,1],
      mediaUrls:      [],
      questionText:   ''
    },
    {
      answerId:       '3',
      answerPostedAt: 3,
      answers:        [],
      cardId:         '1',
      game:           'Another Game',
      mainImageSlice: [0,1],
      mediaUrls:      [],
      questionText:   ''
    }
  ];
}

function sampleDeckTitles() {
  return [
    {
      slug: 'some-game',
      fullTitle: 'Some Game'
    },
    {
      slug: 'none-tweeted',
      fullTitle: 'None Tweeted'
    }
  ];
}
