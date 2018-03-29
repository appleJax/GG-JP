import Mongoose from 'mongoose';

const Schema = Mongoose.Schema;

const schema = new Schema({
  alreadyAnswered: [String],
  answerAltText: String,
  answerImages: [String],
  answers: [String],
  answerText: String,
  cardId: String,
  game: String,
  mainImageSlice: [Number],
  mediaUrls: [{
    altText: String,
    image: String
  }],
  otherVisibleContext: String,
  questionId: String,
  questionPostedAt: Number,
  questionText: String,
  userPoints: [{
    userId: String,
    points: Number,
    timeToAnswer: Number
  }]
},
{ _id: false });

export default Mongoose.model('liveQuestions', schema);
