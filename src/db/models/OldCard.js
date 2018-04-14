import Mongoose from 'mongoose';

const Schema = Mongoose.Schema;

const schema = new Schema({
  alreadyAnswered: [String],
  answerAltText: String,
  answerId: String,
  answerPostedAt: Number,
  answers: [String],
  answerText: String,
  cardId: String,
  game: String,
  questionText: String,
  mainImageSlice: [Number],
  mediaUrls: [{
    _id: false,
    altText: String,
    image: String
  }],
  otherVisibleContext: String,
  questionId: String,
  questionPostedAt: Number,
  userPoints: [{
    _id: false,
    userId: String,
    points: Number,
    timeToAnswer: Number
  }]
});

export default Mongoose.model('oldCards', schema);
