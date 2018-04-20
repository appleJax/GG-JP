import Mongoose from 'mongoose';

const Schema = Mongoose.Schema;

const schema = new Schema({
  queue: [String]
});

export default Mongoose.model('tweetQueue', schema);