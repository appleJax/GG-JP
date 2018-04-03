const Mongoose = require('mongoose');
const Models = require('Models').default;
const { connectDB } = require('TestUtils');
const { serveCards } = require('DB/ops').default;

const { OldCard } = Models;

beforeAll(async () => {
  await connectDB();
  await OldCard.insertMany(sampleCards());
});

afterAll(async (done) => {
  await OldCard.remove();
  await Mongoose.disconnect(done);
});

it('should return the existing cards with the given cardIds', async () => {
  const req = {
    query: {
      ids: [ '2', '3' ]
    }
  };
  const cards = await serveCards(req);
  const cardIds = cards.map(card => card.cardId);

  expect(cardIds).toEqual(['2']);
});


function sampleCards() {
  return [
      {
        cardId: '1',
        questionText: '',
        mainImageSlice: [0,1],
        mediaUrls: []
      },
      {
        cardId: '2',
        questionText: '',
        mainImageSlice: [0,1],
        mediaUrls: []
      }
  ]
} 