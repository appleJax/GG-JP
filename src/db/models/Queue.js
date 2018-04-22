import Mongoose from 'mongoose';

const Schema = Mongoose.Schema;

const schema = new Schema({
  queue: [{
    time: Number,
    cardId: String
  }]
});

export default Mongoose.model('tweetQueue', schema);