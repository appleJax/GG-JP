const Mongoose = require('mongoose');
const Models = require('Models').default;
const { connectDB } = require('TestUtils')
const { getHardestQuestion } = require('DB/ops').default;


const {
  OldCard
} = Models;

beforeAll(async () => {
  await connectDB();
});

afterAll(async (done) => {
  await Mongoose.disconnect(done);
});

beforeEach(async () => {
  await OldCard.insertMany(sampleCards());
});

afterEach(async () => {
  await OldCard.remove();
});


const HARDEST_QUESTION = 'q-0';
const MOST_WRONG_ANSWERS = 10;

it('should return the question with the most wrong answers', async () => {
  const hardestQuestion = await getHardestQuestion();
  expect(hardestQuestion.cardId).toEqual(HARDEST_QUESTION);
});

it('should not care about correct answers', async () => {
  await OldCard.create({
    answerPostedAt: lessThanOneWeekAgo(),
    cardId: HARDEST_QUESTION + 'plusOne',
    userPoints: createCorrectAnswers(MOST_WRONG_ANSWERS + 1)
  })

  const hardestQuestion = await getHardestQuestion();
  expect(hardestQuestion.cardId).toEqual(HARDEST_QUESTION);
});

it('should only compare questions posted within the last week', async () => {
  await OldCard.create({
    answerPostedAt: moreThanOneWeekAgo(),
    cardId: HARDEST_QUESTION + 'but_Too_Old',
    userPoints: createWrongAnswers(MOST_WRONG_ANSWERS * 2)
  })

  const hardestQuestion = await getHardestQuestion();
  expect(hardestQuestion.cardId).toEqual(HARDEST_QUESTION);
});


// Helpers

const ONE_WEEK = 1000 * 60 * 60 * 24 * 7
const now = new Date().getTime();

function lessThanOneWeekAgo() {
  const lessThanOneWeek = Math.floor(
    Math.random() * ONE_WEEK - 1
  );
  return now - lessThanOneWeek;
}

function moreThanOneWeekAgo() {
  return now - ONE_WEEK - 1;
}

function createAnswers(quantity, isWrong) {
  const userPoints = [];

  for (let i = 0; i < quantity; i++) {
    userPoints.push({
      userId: `u${i}`,
      points: isWrong ? 0 : 1
    });
  }

  return userPoints;
}

function createWrongAnswers(quantity) {
  return createAnswers(quantity, 'wrongAnswers')
}

function createCorrectAnswers(quantity) {
  return createAnswers(quantity);
}


// Data Initialization

function sampleCards() {
  const cards = [];

  for (let i = 0; i <= 10; i++) {
    cards.push({
      answerPostedAt: lessThanOneWeekAgo(),
      cardId: `q-${i}`,
      userPoints: createWrongAnswers(MOST_WRONG_ANSWERS - i)
    })
  }
  return cards;
}
