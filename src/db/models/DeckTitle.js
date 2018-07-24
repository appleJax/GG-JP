import Mongoose from 'mongoose'
import OldCard from './OldCard'
import { t } from 'Utils'

const Schema = Mongoose.Schema

const schema = new Schema({
  finished: t( Boolean, false ),
  fullTitle: String,
  slug: String,
  totalCards: Number,
  tweetedCards: t( Number, 0 )
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
