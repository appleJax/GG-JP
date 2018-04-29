import Mongoose from 'mongoose';
import { t } from 'Utils';

const Schema = Mongoose.Schema;

const schema = new Schema({
  year:  t( Number, 0 ),
  month: t( Number, 0 ),
  week:  t( Number, 0 ),
  day:   t( Number, 0 ),
  lastReadDM: t( Number, 0 )
});

export default Mongoose.model('timestamps', schema);