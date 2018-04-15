import Mongoose from 'mongoose';

const Schema = Mongoose.Schema;

const schema = new Schema({
  year:  Number,
  month: Number,
  week:  Number,
  day:   Number
});

export default Mongoose.model('timestamps', schema);