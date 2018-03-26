import Mongoose from 'mongoose';

const Schema = Mongoose.Schema;

const schema = new Schema({
  finished: { type: Boolean, default: false },
  fullTitle: String,
  slug: String,
  totalCards: String
});

export default Mongoose.model('deckTitles', schema);
