import Mongoose from 'mongoose'

const Schema = Mongoose.Schema

const schema = new Schema({
  queue: [{
    _id: false,
    cardId: String,
    deck: String
  }]
})

export default Mongoose.model('tweetQueue', schema)
