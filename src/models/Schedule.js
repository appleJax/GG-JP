import Mongoose from 'mongoose';

const Schema = Mongoose.Schema;

const schema = new Schema({
  time: Number,
  deck: String
});

export default Mongoose.model('schedule', schema);
