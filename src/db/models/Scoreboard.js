import Mongoose from 'mongoose';

const Schema = Mongoose.Schema;

const schema = new Schema({
  userId: String,
  name: String,
  handle: String,
  avatar: String,
  profileBanner: String,
  following: [String],
  allTimeStats: {
    attempts: Number,
    correct: [{
      cardId: String,
      points: Number,
      timeToAnswer: Number
    }],
    incorrect: [String],
    unanswered: [String],
    totalPossible: Number,
    rank: Number,
    score: Number,
    avgTimeToAnswer: Number
  },
  monthlyStats: {
    attempts: Number,
    correct: Number,
    totalPossible: Number,
    rank: Number,
    score: Number,
    avgTimeToAnswer: Number,
    average: {
      n: Number,
      value: Number
    }
  },
  weeklyStats: {
    attempts: Number,
    correct: Number,
    totalPossible: Number,
    rank: Number,
    score: Number,
    avgTimeToAnswer: Number,
    average: {
      n: Number,
      value: Number
    }
  },
  dailyStats: {
    attempts: Number,
    correct: Number,
    totalPossible: Number,
    score: Number,
    avgTimeToAnswer: Number,
    average: {
      n: Number,
      value: Number
    }
  }
},
{ _id: false });

export default Mongoose.model('scoreboard', schema);
