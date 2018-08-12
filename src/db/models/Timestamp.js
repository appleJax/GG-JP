import Mongoose from 'mongoose'
import AddLongType from 'mongoose-long'
import { t } from 'Utils'

AddLongType(Mongoose)

const Schema = Mongoose.Schema
const SchemaTypes = Mongoose.Schema.Types

const schema = new Schema({
  year:  t( Number, 0 ),
  month: t( Number, 0 ),
  week:  t( Number, 0 ),
  day:   t( Number, 0 ),
  lastReadDM: t( Number, 0 ),
  downloadUpdated: SchemaTypes.Long
})

export default Mongoose.model('timestamps', schema)
