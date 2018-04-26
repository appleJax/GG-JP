import Mongoose from 'mongoose';
import { t } from 'Utils';

const Schema = Mongoose.Schema;

const schema = new Schema({
  answerAltText: t( String, '' ),
  answerImages: t( [String], [] ),
  answers: t( [String], [] ),
  answerText: String,
  cardId: String,
  game: String,
  mainImageSlice: t( [Number], [] ),
  mediaUrls: t(
    [{
      _id: false,
      image: String,
      altText: String
    }], []
  ),
  otherVisibleContext: t( String, '' ),
  prevLineAltText: t( String, '' ),
  prevLineImages: t( [String], [] ),
  questionAltText: t( String, '' ),
  questionId: String,
  questionImages: t( [String], [] ),
  questionText: String
});

export default Mongoose.model('newCards', schema);
