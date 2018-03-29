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
  otherVisibleContext: String,
  prevLineAltText: String,
  prevLineImages: [String],
  questionId: String,
  questionImages: [String],
  questionText: String
},
{ _id: false });

export default Mongoose.model('newCards', schema);
