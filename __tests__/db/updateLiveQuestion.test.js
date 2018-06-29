const Mongoose = require('mongoose')
const Models = require('Models').default
const { connectDB } = require('TestUtils')
const { updateLiveQuestion } = require('DB/ops').default

const {
  LiveQuestion
} = Models

beforeAll(async () => {
  await connectDB()
})

afterAll(async (done) => {
  await Mongoose.disconnect(done)
})

const CARD_ID = 'c1'
const sampleCard = {
  cardId: CARD_ID,
  mediaUrls: [],
  questionImages: [''],
  questionAltText: '',
  prevLineImages: [''],
  prevLineAltText: ''
}

const QUESTION_ID = 'q1'
const QUESTION_POSTED_AT = 1234
const MEDIA_URLS = [
  { altText: 'altText1', image: 'mediaUrl1' }
]
const updatedCard = {
  cardId: CARD_ID,
  mediaUrls: MEDIA_URLS,
  questionId: QUESTION_ID,
  questionPostedAt: QUESTION_POSTED_AT
}

beforeEach(async () => {
  await LiveQuestion.create(sampleCard)
})

afterEach(async () => {
  await LiveQuestion.remove()
})

it('should update the Live Question', async () => {
  const liveQuestionBefore = await fetch(LiveQuestion)

  await updateLiveQuestion({
    cardId: CARD_ID,
    mediaUrls: MEDIA_URLS,
    questionId: QUESTION_ID,
    questionPostedAt: QUESTION_POSTED_AT
  })

  const liveQuestionAfter = await fetch(LiveQuestion)

  expect(liveQuestionBefore).toEqual(sampleCard)
  expect(liveQuestionAfter).toEqual(updatedCard)
})

// helper

function fetch(model) {
  return model.findOne({ cardId: CARD_ID })
    .select({
      _id: 0,
      cardId: 1,
      'mediaUrls.altText': 1,
      'mediaUrls.image': 1,
      questionId: 1,
      questionPostedAt: 1,
      questionImages: 1,
      questionAltText: 1,
      prevLineImages: 1,
      prevLineAltText: 1
    }).lean().exec()
}
