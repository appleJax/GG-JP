import Mongoose from 'mongoose'

const { MONGODB_URI } = process.env

Mongoose.pluralize(null)

export function connectDB() {
  return new Promise((resolve, reject) => {
    Mongoose.connect(MONGODB_URI)
    const db = Mongoose.connection
    db.on('error', console.error)
    db.on('disconnect', connectDB)
    db.once('open', resolve)
  })
}
