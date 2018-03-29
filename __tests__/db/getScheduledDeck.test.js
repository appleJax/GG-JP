const Mongoose = require('mongoose');
const Models = require('Models').default;
const { connectDB } = require('TestUtils')
const { getScheduledDeck } = require('DB/utils');

const {
  DeckTitle,
  NewCard,
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

  await NewCard.insertMany([
    { game: 'DeckAtTwo' },
    { game: 'DeckAtEight' }
  ]);

});

afterAll(async (done) => {
  await DeckTitle.remove().exec();
  await NewCard.remove().exec();
  await Schedule.remove().exec();
  Mongoose.disconnect(done);
});

it('should get the scheduled deck for the current time', async () => {
  const deckAtTwo = await getScheduledDeck(2);
  const deckAtEight = await getScheduledDeck(8);

  expect(deckAtTwo).toEqual({ game: 'DeckAtTwo' });
  expect(deckAtEight).toEqual({ game: 'DeckAtEight' });
});

it('should return an empty object if time is not in Schedule', async () => {
  const deckAtThree = await getScheduledDeck(3);

  expect(deckAtThree).toEqual({});
});

it('should update the Schedule if no cards are left for the current scheduled deck', async () => {
  await Schedule.create({
    time: 4,
    deck: 'No cards left'
  });
  await DeckTitle.insertMany([
    { fullTitle: 'Some cards left', totalCards: 3 },
    { fullTitle: 'No cards left',   totalCards: 3 }
  ]);
  await NewCard.create({
    game: 'Some cards left'
  });

  const newDeck = await getScheduledDeck(4);
  const scheduleAtFour = await Schedule.findOne({ time: 4 })

  expect(newDeck).toEqual({ game: 'Some cards left'});
  expect(scheduleAtFour.deck).toEqual(newDeck.game);
});

it('should return an empty object if no new decks are found while updating Schedule', async () => {
  await Schedule.create({
    time: 5,
    deck: 'No cards left'
  });

  const newDeck = await getScheduledDeck(5);

  expect(newDeck).toEqual({});
});
