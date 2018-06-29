import Mongoose from 'mongoose'
import OldCard from './OldCard'

const Schema = Mongoose.Schema

const schema = new Schema({
  finished: { type: Boolean, default: false },
  fullTitle: String,
  slug: String,
  totalCards: String,
  tweetedCards: Number
})

schema.post('find', getTotalTweeted)
schema.post('findOne', getTotalTweeted)

async function getTotalTweeted(doc, next) {
  if (Array.isArray(doc)) {
    for (let i = 0; i < doc.length; i++) {
      const totalTweeted = await OldCard.find({ game: doc[i].fullTitle }).count()
      doc[i].tweetedCards = totalTweeted
    }
  } else if (doc) {
    const totalTweeted = await OldCard.find({ game: doc.fullTitle }).count()
    doc.tweetedCards = totalTweeted
  }

  next()
}

export default Mongoose.model('deckTitles', schema)
