const Mongoose = require('mongoose');
const Models = require('Models').default;
const { connectDB } = require('TestUtils')
const { getUserStats } = require('DB/ops').default;

const {
  OldCard,
  Scoreboard
} = Models;

beforeAll(async () => {
  await connectDB();

  await OldCard.insertMany(sampleCards());
  await Scoreboard.insertMany(sampleScores());
});

afterAll(async (done) => {
  await OldCard.remove();
  await Scoreboard.remove();
  await Mongoose.disconnect(done);
});

it(`should return the requested user with their correct
    cards in a new field called 'earnedCards'
`, async () => {
  const req = {
    params: {
      handle: 'user'
    }
  };
  const user = await getUserStats(req);
  const earnedCards = user.earnedCards.map(card => card.cardId);

  expect(user.handle).toEqual('user');
  expect(earnedCards).toEqual(['1', '2']);
});

it('should return null if user not found', async () => {
  const req = {
    params: {
      handle: 'not-a-user'
    }
  };
  const user = await getUserStats(req);

  expect(user).toBeNull();
});


function sampleCards() {
  return [
    {
      answerId:       '',
      answerPostedAt: 0,
      answers:        [],
      cardId:         '1',
      game:           '',
      mainImageSlice: [0,1],
      mediaUrls:      [],
      questionText:   ''
    },
    {
      answerId:       '',
      answerPostedAt: 0,
      answers:        [],
      cardId:         '2',
      game:           '',
      mainImageSlice: [0,1],
      mediaUrls:      [],
      questionText:   ''
    },
    {
      answerId:       '',
      answerPostedAt: 0,
      answers:        [],
      cardId:         '3',
      game:           '',
      mainImageSlice: [0,1],
      mediaUrls:      [],
      questionText:   ''
    }
  ];
}

function sampleScores() {
  return [
    {
      handle: 'user',
      allTimeStats: {
        correct: [
          { cardId: '1' },
          { cardId: '2' }
        ]
      }
    }
  ];
}