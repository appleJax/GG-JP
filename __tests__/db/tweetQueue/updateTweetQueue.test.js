const Mongoose = require('mongoose');
const Models = require('Models').default;
const { connectDB } = require('TestUtils')
const { QUEUE_SIZE, updateTweetQueue } = require('DB/tweetQueue');

const {
  NewCard,
  Queue,
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
    { time: 2,  deck: 'Game at 2'},
    { time: 8,  deck: 'Game at 8'},
    { time: 14, deck: 'Game at 14'},
    { time: 20, deck: 'Game at 20'}
  ]);

  await NewCard.insertMany(
    sampleNewCards()
  );

  await Queue.create(sampleQueue());
});

afterEach(async () => {
  await NewCard.remove();
  await Queue.remove();
  await Schedule.remove();
});


it('should return the id for the next card to be tweeted', async () => {
  const nextCardId = await updateTweetQueue();

  expect(nextCardId).toEqual(sampleQueueCard().cardId);
});

it('should ensure the queue has QUEUE_SIZE elements', async () => {
  const queueSizeBefore = await getQueueSize();
  await updateTweetQueue();
  const queueSizeAfter = await getQueueSize();

  expect(queueSizeBefore).toEqual(1);
  expect(queueSizeAfter).toEqual(QUEUE_SIZE);
});

it('should not queue a new card if a unique card cannot be found', async () => {
  await updateTweetQueue();
  await updateTweetQueue();

  const queueSize = await getQueueSize();

  const queue = await Queue.findOne().lean().exec();
  expect(queueSize).toEqual(QUEUE_SIZE - 1);
});

it('should not affect the NewCard collection', async () => {
  const newCardCountBefore = await newCardCount();

  await updateTweetQueue();
  await updateTweetQueue();
  await updateTweetQueue();

  const newCardCountAfter = await newCardCount();

  expect(newCardCountBefore).toEqual(newCardCountAfter);
});

it('should queue tweets in the correct timeslot order', async () => {
  await updateTweetQueue();

  const queuedTimeslots = await getQueuedTimeslots();

  expect(queuedTimeslots).toEqual([ 14, 8, 2, 20, 14, 8 ]);
});

it('should return null if tweetQueue is empty and cannot be refilled', async () => {
  await NewCard.remove();
  await updateTweetQueue();

  const nextCardId = await updateTweetQueue();

  expect(nextCardId).toBeNull();
});

// helper

async function getQueueSize() {
  return await Queue.findOne().then(obj => obj.queue.length);
}

async function getQueuedTimeslots() {
  return await Queue.findOne().then(obj => obj.queue.map(entry => entry.time));
}

async function newCardCount() {
  return await NewCard.find().count().exec();
}


// Data initialization

function sampleNewCards() {
  return [
    {
      cardId: '2',
      game: 'Game at 2'
    },
    {
      cardId: '8',
      game: 'Game at 8'
    },
    {
      cardId: '14',
      game: 'Game at 14'
    },
    {
      cardId: '20',
      game: 'Game at 20'
    },
    {
      cardId: '8-2',
      game: 'Game at 8'
    },
    {
      cardId: '14-2',
      game: 'Game at 14'
    },
    {
      cardId: '1',
      game: 'sample game'
    }
  ];
}

function sampleQueueCard() {
  return {
    cardId: '1',
    time: 2
  };
}

function sampleQueue() {
  return {
    queue: [ sampleQueueCard() ]
  }
}