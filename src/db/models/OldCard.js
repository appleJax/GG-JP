import Mongoose from 'mongoose'
import { t } from 'Utils'

const Schema = Mongoose.Schema

const schema = new Schema({
  alreadyAnswered: t( [String], [] ),
  answerAltText: String,
  answerId: String,
  answerPostedAt: Number,
  answers: [String],
  answerText: String,
  cardId: String,
  game: String,
  questionText: String,
  mainImageSlice: t( [Number], [] ),
  mediaUrls: t(
    [{
      _id: false,
      altText: String,
      image: String
    }], []
  ),
  otherVisibleContext: t( String, '' ),
  questionId: String,
  questionPostedAt: Number,
  userPoints: [{
    _id: false,
    answer: String,
    points: Number,
    timeToAnswer: Number,
    userId: String
  }]
})

export default Mongoose.model('oldCards', schema)
