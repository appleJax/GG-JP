import Mongoose from 'mongoose';

const Schema = Mongoose.Schema;

const schema = new Schema({
  answerAltText: String,
  answerImages: [String],
  answers: [String],
  answerText: String,
  cardId: String,
  game: String,
  mainImageSlice: [Number],
  mediaUrls: [{
    image: String,
    altText: String
  }],
  otherVisibleContext: String,
  prevLineAltText: String,
  prevLineImages: [String],
  questionAltText: String,
  questionId: String,
  questionImages: [String],
  questionText: String
});

export default Mongoose.model('newCards', schema);
