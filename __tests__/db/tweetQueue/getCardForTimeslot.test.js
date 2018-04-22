const Mongoose = require('mongoose');
const Models = require('Models').default;
const { connectDB } = require('TestUtils')
const { getCardForTimeslot } = require('DB/tweetQueue');

const {
  NewCard,
  Schedule
} = Models;

beforeAll(async () => {
  await connectDB();
});

afterAll(async (done) => {
  await Mongoose.disconnect(done);
});

beforeEach(async () => {
  await Schedule.insertMany([
    { time: 2, deck: 'Game at 2'},
    { time: 8, deck: 'Game at 8'}
  ]);

  await NewCard.insertMany(
    sampleNewCards()
  );
});

afterEach(async () => {
  await NewCard.remove();
  await Schedule.remove();
});

const GAME_AT_2_ID = 'g2id';
const GAME_AT_8_ID = 'g8id';

it('should return a random card from the deck scheduled at the requested time', async () => {
  const gameAt2Id = await getCardForTimeslot(2);
  const gameAt8Id = await getCardForTimeslot(8);

  expect(gameAt2Id).toEqual(GAME_AT_2_ID);
  expect(gameAt8Id).toEqual(GAME_AT_8_ID);
});



// Data initialization

function sampleNewCards() {
  return [
    {
      cardId: GAME_AT_2_ID,
      game: 'Game at 2'
    },
    {
      cardId: GAME_AT_8_ID,
      game: 'Game at 8'
    }
  ];
}
