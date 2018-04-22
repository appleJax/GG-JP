const Mongoose = require('mongoose');
const Models = require('Models').default;
const { connectDB } = require('TestUtils')
const { updateScheduledDeck } = require('DB/tweetQueue');

const {
  DeckTitle,
  NewCard,
  Schedule
} = Models;

beforeAll(async () => {
  await connectDB();
});

afterAll(async (done) => {
  await Mongoose.disconnect(done);
});

const OLD_DECK = 'PrevScheduledDeck';
const NEW_DECK = 'NewScheduledDeck';

beforeEach( async () => {
  await Schedule.create(
    { time: 2, deck: OLD_DECK }
  );

  await DeckTitle.insertMany([
    { fullTitle: OLD_DECK, finished: false, totalCards: 10 },
    { fullTitle: NEW_DECK, finished: false, totalCards: 10 },
    { fullTitle: 'deck with no available cards', finished: false, totalCards: 10 }
  ]);

  await NewCard.create(
    { game: NEW_DECK }
  );
});

afterEach(async () => {
  await DeckTitle.remove();
  await NewCard.remove();
  await Schedule.remove();
});

it(`should set old deck to "finished: true" 
    and update timeslot with a random deck that has available cards
  `, async () => {
  const oldTimeslot = await fetch(Schedule, { time: 2 });
  const oldDeck     = await fetch(DeckTitle, { fullTitle: OLD_DECK });
  await updateScheduledDeck(2, OLD_DECK);
  const newTimeslot = await fetch(Schedule, { time: 2 });
  const oldDeckAfter = await fetch(DeckTitle, { fullTitle: OLD_DECK });

  expect(oldTimeslot.deck).toEqual(OLD_DECK);
  expect(newTimeslot.deck).toEqual(NEW_DECK);

  expect(oldDeck.finished).toEqual(false);
  expect(oldDeckAfter.finished).toEqual(true);
});

it('should return an object with a game key set to the new deck title', async () => {
  const newScheduledDeck = await updateScheduledDeck(2, OLD_DECK);
  expect(newScheduledDeck).toEqual({ game: NEW_DECK });
});

it('should return an empty object if no new decks exist', async () => {
  await NewCard.remove();

  const newScheduledDeck = await updateScheduledDeck(2, OLD_DECK);
  expect(newScheduledDeck).toEqual({});
});


// helper

async function fetch(model, query) {
  return await model.findOne(query).lean().exec();
}