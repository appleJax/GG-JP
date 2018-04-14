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
    _id: false,
    attempts: Number,
    correct: [{
      _id: false,
      cardId: String,
      points: Number,
      timeToAnswer: Number
    }],
    incorrect: [String],
    unanswered: [String],
    totalPossible: Number,
    rank: Number,
    score: Number,
    avgAnswerTime: Number,
    currentAnswerStreak: Number,
    currentCorrectStreak: Number,
    longestAnswerStreak: Number,
    longestCorrectStreak: Number
  },
  yearlyStats: {
    _id: false,
    attempts: Number,
    correct: Number,
    totalPossible: Number,
    rank: Number,
    score: Number,
    avgAnswerTime: Number,
    highestScore: {
      _id: false,
      value: Number,
      timestamp: Number
    },
    lowestAvgAnswerTime: {
      _id: false,
      value: Number,
      timestamp: Number
    },
    average: {
      _id: false,
      n: Number,
      value: Number
    },
    history: [{
      _id: false,
      score: Number,
      avgAnswerTime: Number,
      timestamp: Number
    }]
  },
  monthlyStats: {
    _id: false,
    attempts: Number,
    correct: Number,
    totalPossible: Number,
    rank: Number,
    score: Number,
    avgAnswerTime: Number,
    highestScore: {
      _id: false,
      value: Number,
      timestamp: Number
    },
    lowestAvgAnswerTime: {
      _id: false,
      value: Number,
      timestamp: Number
    },
    average: {
      _id: false,
      n: Number,
      value: Number
    },
    history: [{
      _id: false,
      score: Number,
      avgAnswerTime: Number,
      timestamp: Number
    }]
  },
  weeklyStats: {
    _id: false,
    attempts: Number,
    correct: Number,
    totalPossible: Number,
    rank: Number,
    score: Number,
    avgAnswerTime: Number,
    highestScore: {
      _id: false,
      value: Number,
      timestamp: Number
    },
    lowestAvgAnswerTime: {
      _id: false,
      value: Number,
      timestamp: Number
    },
    average: {
      _id: false,
      n: Number,
      value: Number
    },
    history: [{
      _id: false,
      score: Number,
      avgAnswerTime: Number,
      timestamp: Number
    }]
  },
  dailyStats: {
    _id: false,
    attempts: Number,
    correct: Number,
    totalPossible: Number,
    score: Number,
    avgAnswerTime: Number,
    highestScore: {
      _id: false,
      value: Number,
      timestamp: Number
    },
    lowestAvgAnswerTime: {
      _id: false,
      value: Number,
      timestamp: Number
    },
    average: {
      _id: false,
      n: Number,
      value: Number
    },
    history: [{
      _id: false,
      score: Number,
      avgAnswerTime: Number,
      timestamp: Number
    }]
  }
});

export default Mongoose.model('scoreboard', schema);
