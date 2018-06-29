import Mongoose from 'mongoose'
import { t } from 'Utils'

const Schema = Mongoose.Schema

const schema = new Schema({
  userId: String,
  name: t( String, '' ),
  handle: t( String, '' ),
  avatar: t( String, '' ),
  profileBanner: t( String, '' ),
  following: t( [String], [] ),
  isPrivate: t( Boolean, false ),
  permissions: t( [String], [] ),
  allTimeStats: {
    _id: false,
    attempts: t( Number, 0 ),
    correct: t(
      [{
        _id: false,
        cardId: String,
        points: Number,
        timeToAnswer: Number
      }], []
    ),
    incorrect:  t( [String], []),
    unanswered: t( [String], []),
    totalPossible: t( Number, 0),
    rank:  t( Number, 0 ),
    score: t( Number, 0 ),
    avgAnswerTime: t( Number, 0 ),
    bestRank: {
      _id: false,
      value: t( Number, 0 ),
      timestamp: t( Number, 0 )
    },
    currentAnswerStreak:  t( Number, 0 ),
    currentCorrectStreak: t( Number, 0 ),
    longestAnswerStreak:  t( Number, 0 ),
    longestCorrectStreak: t( Number, 0 )
  },
  yearlyStats: {
    _id: false,
    attempts: t( Number, 0 ),
    correct: t( Number, 0 ),
    totalPossible: t( Number, 0 ),
    rank: t( Number, 0 ),
    score: t( Number, 0 ),
    avgAnswerTime: t( Number, 0 ),
    bestRank: {
      _id: false,
      value: t( Number, 0 ),
      timestamp: t( Number, 0 )
    },
    highestScore: {
      _id: false,
      value: t( Number, 0 ),
      timestamp: t( Number, 0 )
    },
    lowestAvgAnswerTime: {
      _id: false,
      value: t( Number, 87000 ),
      timestamp: t( Number, 0 )
    },
    average: {
      _id: false,
      n: t( Number, 0 ),
      value: t( Number, 0 )
    },
    history: t(
      [{
        _id: false,
        rank: Number,
        score: Number,
        avgAnswerTime: Number,
        timestamp: Number
      }], []
    )
  },
  monthlyStats: {
    _id: false,
    attempts: t( Number, 0 ),
    correct: t( Number, 0 ),
    totalPossible: t( Number, 0 ),
    rank: t( Number, 0 ),
    score: t( Number, 0 ),
    avgAnswerTime: t( Number, 0 ),
    bestRank: {
      _id: false,
      value: t( Number, 0 ),
      timestamp: t( Number, 0 )
    },
    highestScore: {
      _id: false,
      value: t( Number, 0 ),
      timestamp: t( Number, 0 )
    },
    lowestAvgAnswerTime: {
      _id: false,
      value: t( Number, 87000 ),
      timestamp: t( Number, 0 )
    },
    average: {
      _id: false,
      n: t( Number, 0 ),
      value: t( Number, 0 )
    },
    history: t(
      [{
        _id: false,
        rank: Number,
        score: Number,
        avgAnswerTime: Number,
        timestamp: Number
      }], []
    )
  },
  weeklyStats: {
    _id: false,
    attempts: t( Number, 0 ),
    correct: t( Number, 0 ),
    totalPossible: t( Number, 0 ),
    rank: t( Number, 0 ),
    score: t( Number, 0 ),
    avgAnswerTime: t( Number, 0 ),
    bestRank: {
      _id: false,
      value: t( Number, 0 ),
      timestamp: t( Number, 0 )
    },
    highestScore: {
      _id: false,
      value: t( Number, 0 ),
      timestamp: t( Number, 0 )
    },
    lowestAvgAnswerTime: {
      _id: false,
      value: t( Number, 87000 ),
      timestamp: t( Number, 0 )
    },
    average: {
      _id: false,
      n: t( Number, 0 ),
      value: t( Number, 0 )
    },
    history: t(
      [{
        _id: false,
        rank: Number,
        score: Number,
        avgAnswerTime: Number,
        timestamp: Number
      }], []
    )
  },
  dailyStats: {
    _id: false,
    attempts: t( Number, 0 ),
    correct: t( Number, 0 ),
    totalPossible: t( Number, 0 ),
    score: t( Number, 0 ),
    avgAnswerTime: t( Number, 0 ),
    highestScore: {
      _id: false,
      value: t( Number, 0 ),
      timestamp: t( Number, 0 )
    },
    lowestAvgAnswerTime: {
      _id: false,
      value: t( Number, 87000 ),
      timestamp: t( Number, 0 )
    },
    average: {
      _id: false,
      n: t( Number, 0 ),
      value: t( Number, 0 )
    },
    history: t(
      [{
        _id: false,
        score: Number,
        avgAnswerTime: Number,
        timestamp: Number
      }], []
    )
  }
})

export default Mongoose.model('scoreboard', schema)
