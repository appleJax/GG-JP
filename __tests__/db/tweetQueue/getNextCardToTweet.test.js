const Mongoose = require('mongoose');
const Models = require('Models').default;
const { connectDB } = require('TestUtils')
const { getNextCardToTweet } = require('DB/tweetQueue');

const {
  LiveQuestion,
  NewCard,
  Queue
} = Models;

const NEXT_CARD_ID = 'c1';

beforeAll(async () => {
  await connectDB();
});

afterAll(async (done) => {
  await Mongoose.disconnect(done);
});

beforeEach(async () => {
  await NewCard.create({ cardId: NEXT_CARD_ID });
  await Queue.create(sampleQueue());
});

afterEach(async () => {
  await LiveQuestion.remove();
  await NewCard.remove();
  await Queue.remove();
});

it('should return the next card in the queue', async () => {
  const nextCard = await getNextCardToTweet();

  expect(nextCard.cardId).toEqual(NEXT_CARD_ID);
});

it('should remove nextCardToTweet from NewCards', async () => {
  const beforeNewCards = await fetch(NewCard);
  await getNextCardToTweet();
  const afterNewCards = await fetch(NewCard);

  const beforeNewCardId = getId(beforeNewCards);

  expect(beforeNewCards).toHaveLength(1);
  expect(beforeNewCardId).toEqual(NEXT_CARD_ID);
  expect(afterNewCards).toHaveLength(0);
});

it('should add nextCardToTweet to LiveQuestions', async () => {
  const beforeLiveQuestions = await fetch(LiveQuestion);
  await getNextCardToTweet();
  const afterLiveQuestions = await fetch(LiveQuestion);

  const liveQuestionId = getId(afterLiveQuestions);

  expect(beforeLiveQuestions).toHaveLength(0);
  expect(afterLiveQuestions).toHaveLength(1);
  expect(liveQuestionId).toEqual(NEXT_CARD_ID);
});


// helper

async function fetch(model) {
  return await model.find().lean().exec();
}

function getId(fetchResult) {
  return fetchResult[0].cardId;
}


// Data initialization

function sampleQueue() {
  return {
    queue: [
      {
        cardId: '1',
        time: 14
      },
      {
        cardId: '2',
        time: 8
      },
      {
        cardId: '3',
        time: 2
      },
      {
        cardId: '4',
        time: 20
      },
      {
        cardId: '5',
        time: 14
      },
      {
        cardId: '6',
        time: 8
      },
      {
        cardId: NEXT_CARD_ID,
        time: 2
      }
    ]
  };
}