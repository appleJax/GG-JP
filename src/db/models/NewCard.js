import Mongoose from 'mongoose';
import { t } from 'Utils';

const Schema = Mongoose.Schema;

const schema = new Schema({
  answerAltText: String,
  answerImages: t( [String], [] ),
  answers: t( [String], [] ),
  answerText: String,
  cardId: String,
  game: String,
  mainImageSlice: t( [Number], [] ),
  mediaUrls: t(
    [{
      image: String,
      altText: String
    }], []
  ),
  otherVisibleContext: String,
  prevLineAltText: String,
  prevLineImages: t( [String], [] ),
  questionAltText: String,
  questionId: String,
  questionImages: t( [String], [] ),
  questionText: String
});

export default Mongoose.model('newCards', schema);
