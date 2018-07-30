import Mongoose from 'mongoose'
import OldCard from './OldCard'
import NewCard from './NewCard'
import LiveQuestion from './LiveQuestion'
import { t } from 'Utils'

const Schema = Mongoose.Schema

const schema = new Schema({
  finished: t( Boolean, false ),
  fullTitle: String,
  slug: String,
  tweetedCards: t( Number, 0 )
})

schema.post('find', addFields)
schema.post('findOne', addFields)

async function addFields(doc, next) {
  if (Array.isArray(doc)) {
    for (let i = 0; i < doc.length; i++) {
      await _addFields(doc[i])
    }
  } else if (doc) {
    await _addFields(doc)
  }

  next()
}

async function _addFields(doc) {
  const query = { game: doc.fullTitle };
  const totalTweeted = await OldCard.find(query).count()
  doc.tweetedCards = totalTweeted

  const notTweeted = await NewCard.find(query).count()
  const liveCards = await LiveQuestion.find(query).count()
  doc.totalCards = totalTweeted + notTweeted + liveCards
}

export default Mongoose.model('deckTitles', schema)
