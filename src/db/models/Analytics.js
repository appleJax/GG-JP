
import Mongoose from 'mongoose'

const Schema = Mongoose.Schema

const schema = new Schema({
  downloads: [ Number ]
})

export default Mongoose.model('analytics', schema)
