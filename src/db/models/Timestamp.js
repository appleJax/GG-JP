import Mongoose from 'mongoose';

const Schema = Mongoose.Schema;

const schema = new Schema({
  year:  Number,
  month: Number,
  week:  Number,
  day:   Number,
  lastReadDM: Number
});

export default Mongoose.model('timestamps', schema);