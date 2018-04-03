const Mongoose = require('mongoose');
const Models = require('Models').default;
const { connectDB } = require('TestUtils')
const { processAnswerWorkflow } = require('DB/ops').default;

const {
  LiveQuestion,
  OldCard,
  Scoreboard
} = Models;

beforeAll(async () => {
  await connectDB();
});

afterAll(async (done) => {
  await Mongoose.disconnect(done);
});

const mediaUrl1 = { altText: 'altText1', image: 'mediaUrl1' };
const mediaUrl2 = { altText: 'altText2', image: 'mediaUrl2' };
const mediaUrl3 = { altText: 'altText3', image: 'mediaUrl3' };

const sampleCard = {
  answerAltText: 'altText',
  answerImages: ['image1'],
  cardId: 'cardId1',
  mediaUrls: [ mediaUrl1 ],
  userPoints: [],
  alreadyAnswered: []
};

beforeEach(async () => {
  await LiveQuestion.create(sampleCard);
  await Scoreboard.create({ userId: '1' });
});

afterEach(async () => {
  await LiveQuestion.remove();
  await OldCard.remove();
  await Scoreboard.remove();
});


it('should add the updated card to OldCards and delete the card from LiveQuestions', async () => {
  const lQCount0 = await LiveQuestion.find().count().exec();
  const liveQuestionBefore = await fetch(LiveQuestion);
  const mediaUrlsBefore = liveQuestionBefore.mediaUrls.map(obj => obj.image);
  const sampleMediaUrls = sampleCard.mediaUrls.map(obj => obj.image);
  const oldCardBefore = await fetch(OldCard)

  const answerPostedAt = 1234;
  await processAnswerWorkflow('answerId1', answerPostedAt, 'cardId1', [ mediaUrl2, mediaUrl3 ]);

  const liveQuestionAfter = await fetch(LiveQuestion);
  const oldCardAfter = await fetch(OldCard);
  const mediaUrlsAfter = oldCardAfter.mediaUrls.map(obj => obj.image);
  const expectedMediaUrlsAfter = [mediaUrl1, mediaUrl2, mediaUrl3].map(obj => obj.image);
  const lQCount = await LiveQuestion.find().count().exec();

  expect(liveQuestionBefore.answerAltText).toEqual(sampleCard.answerAltText);
  expect(String(liveQuestionBefore.answerImages)).toEqual(String(sampleCard.answerImages));
  expect(liveQuestionBefore.answerId).toBeUndefined();
  expect(liveQuestionBefore.answerPostedAt).toBeUndefined();
  expect(mediaUrlsBefore).toEqual(sampleMediaUrls);
  expect(oldCardBefore).toBeNull();

  expect(liveQuestionAfter).toBeNull();
  expect(oldCardAfter.answerAltText).toBeUndefined();
  expect(oldCardAfter.answerImages).toBeUndefined();
  expect(mediaUrlsAfter).toEqual(expectedMediaUrlsAfter);
  expect(oldCardAfter.answerPostedAt).toEqual(answerPostedAt);
  expect(oldCardAfter.answerId).toEqual('answerId1');
  expect(lQCount0).toEqual(1);
  expect(lQCount).toEqual(0);
});


async function fetch(model) {
  return await model.findOne({ cardId: 'cardId1' }).lean().exec();
}