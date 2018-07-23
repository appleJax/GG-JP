import Mongoose from 'mongoose'
import { t } from 'Utils'

const Schema = Mongoose.Schema

const schema = new Schema({
  lineup: t( [String], [] )
})

export default Mongoose.model('schedule', schema)
