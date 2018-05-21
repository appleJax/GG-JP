import Mongoose from 'mongoose';
import { t } from 'Utils';

const Schema = Mongoose.Schema;

const schema = new Schema({
  queue: t( [ String ], [] ),
  index: t( Number, 0 ),
  messages: t( [ String ], [] )
});

export default Mongoose.model('sponsors', schema);