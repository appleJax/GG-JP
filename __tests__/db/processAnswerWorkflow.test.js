const Mongoose = require('mongoose');
const Models = require('Models').default;
const { connectDB } = require('TestUtils')
const { processAnswerWorkflow } = require('DB/ops').default;

const {
  LiveQuestion,
  OldCard,
  Timestamp
} = Models;

beforeAll(async () => {
  await connectDB();
});

afterAll(async (done) => {
  await Mongoose.disconnect(done);
});

const CARD_ID = 'c1'
const mediaUrl1 = { altText: 'altText1', image: 'mediaUrl1' };
const mediaUrl2 = { altText: 'altText2', image: 'mediaUrl2' };
const mediaUrl3 = { altText: 'altText3', image: 'mediaUrl3' };

const sampleCard = {
  answerAltText: 'altText',
  answerImages: ['image1'],
  cardId: CARD_ID,
  mediaUrls: [ mediaUrl1 ],
  userPoints: [],
  alreadyAnswered: []
};

const ANSWER_ID = 'a1'
const ANSWER_POSTED_AT = 1234;
const updatedCard = {
  answerId: ANSWER_ID,
  answerPostedAt: ANSWER_POSTED_AT,
  cardId: CARD_ID,
  mediaUrls: [ mediaUrl1, mediaUrl2, mediaUrl3 ],
  userPoints: [],
  alreadyAnswered: []
};

beforeEach(async () => {
  await LiveQuestion.create(sampleCard);
  await Timestamp.create({});
});

afterEach(async () => {
  await LiveQuestion.remove();
  await OldCard.remove();
  await Timestamp.remove();
});


it('should add the updated card to OldCards and delete the card from LiveQuestions', async () => {
  const liveQuestionBefore = await fetch(LiveQuestion);
  const oldCardBefore      = await fetch(OldCard);

  await processAnswerWorkflow(ANSWER_ID, ANSWER_POSTED_AT, CARD_ID, [ mediaUrl2, mediaUrl3 ]);

  const liveQuestionAfter = await fetch(LiveQuestion);
  const oldCardAfter      = await fetch(OldCard);


  expect(liveQuestionBefore).toEqual(sampleCard);
  expect(liveQuestionAfter).toBeNull();

  expect(oldCardBefore).toBeNull();
  expect(oldCardAfter).toEqual(updatedCard);
});

xit('should addPointsToScoreboard', async () => {
  await processAnswerWorkflow(ANSWER_ID, ANSWER_POSTED_AT, CARD_ID, [ mediaUrl2, mediaUrl3 ]);

  // TODO: expect addPointsToScoreboard to be called
});


// helper

async function fetch(model) {
  return await model.findOne({ cardId: CARD_ID })
                    .select({
                      _id: 0,
                      answerId: 1,
                      answerAltText: 1,
                      answerImages: 1,
                      answerPostedAt: 1,
                      cardId: 1,
                      'mediaUrls.altText': 1,
                      'mediaUrls.image': 1,
                      userPoints: 1,
                      alreadyAnswered: 1
                    }).lean().exec();
}