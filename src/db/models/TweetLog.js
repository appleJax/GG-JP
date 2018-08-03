import Mongoose from 'mongoose'

const Schema = Mongoose.Schema

const schema = new Schema({
  log: [{
    _id: false,
    status: String,
    timestamp: Number
  }]
})

export default Mongoose.model('tweetLog', schema)
