import Mongoose from 'mongoose';
import { t } from 'Utils';

const Schema = Mongoose.Schema;

const schema = new Schema({
  alreadyAnswered: t( [String], [] ),
  answerAltText: t( String, '' ),
  answerId: String,
  answerImages: t( [String], [] ),
  answerPostedAt: Number,
  answers: t( [String], [] ),
  answerText: String,
  cardId: String,
  game: String,
  mainImageSlice: t( [Number], [] ),
  mediaUrls: t(
    [{
      _id: false,
      altText: String,
      image: String
    }], []
  ),
  otherVisibleContext: t( String, '' ),
  prevLineAltText: t( String, '' ),
  prevLineImages: t( [String], [] ),
  questionAltText: t( String, '' ),
  questionId: String,
  questionImages: t( [String], [] ),
  questionPostedAt: Number,
  questionText: String,
  userPoints: t(
    [{
      _id: false,
      answer: String,
      points: Number,
      timeToAnswer: Number,
      userId: String
    }], []
  )
});

export default Mongoose.model('liveQuestions', schema);
