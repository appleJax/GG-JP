import { processUpload } from 'Anki/processing'
import {
  aggregateStats,
  buildStatUpdates,
  buildRankUpdates,
  getUser
} from 'DB/utils'
import { processDMs } from 'Twitter/utils'
import {
  average,
  calculateOneWeekAgo,
  countWrongAnswers,
  formatFlashCards,
  tryCatch
} from 'Utils'

import models from 'Models'
const {
  DeckTitle,
  NewCard,
  OldCard,
  LiveQuestion,
  Queue,
  Scoreboard,
  Timestamp
} = models

export default ({
  async addDeck(req, res) {
    const { isPNG }  = (req.body || {})
    const filePath = req.file.path
    const newCards = await tryCatch(
      processUpload(filePath, isPNG)
    )
    const oldCards = await tryCatch(
      OldCard
        .find()
        .select({_id: 0, cardId: 1})
        .lean()
        .exec()
    )
    const liveQuestions = await tryCatch(
      LiveQuestion
        .find()
        .select({_id: 0, cardId: 1})
        .lean()
        .exec()
    )

    const ops = []
    for (let i = 0; i < newCards.length; ++i) {
      const newCard = newCards[i]
      const { cardId } = newCard
      if (oldCards.find(card => card.cardId === cardId)) {
        continue
      }

      if (liveQuestions.find(card => card.cardId === cardId)) {
        await tryCatch(
          LiveQuestion.updateOne(
            { cardId },
            { $set: {
                answers: newCard.answers,
                answerImages: newCard.answerImages,
                answerAltText: newCard.answerAltText,
                answerText: newCard.answerText,
                game: newCard.game,
                mainImageSlice: newCard.mainImageSlice,
                otherVisibleContext: newCard.otherVisibleContext,
                questionText: newCard.questionText
              }
            }
          ).exec()
        )

        continue
      }

      ops.push({
        replaceOne: {
          filter: { cardId },
          replacement: newCard,
          upsert: true
        }
      })
    }

    if (ops.length === 0) {
      return
    }

    await tryCatch(NewCard.bulkWrite(ops))
    console.log('Finished uploading/updating cards!')
  },

  async addOrUpdateUser(newUser) {
    const { userId } = newUser
    const user = await tryCatch(
      Scoreboard.findOne({ userId }).lean().exec()
    )
    if (user) {
      const {
        name,
        handle,
        avatar,
        profileBanner,
        following
      } = newUser

      await tryCatch(
        Scoreboard.updateOne(
          { userId },
          { $set: {
              name,
              handle,
              avatar,
              profileBanner,
              following
            }
          }).exec()
      )
    } else {
      await tryCatch(
        Scoreboard.create(newUser)
      )
    }

    return user || newUser
  },

  adjustScore(req, res) {
    // TODO adjust a score manually
  },

  cachePoints(cardId, userPoints) {
    return LiveQuestion.update(
      { cardId },
      { $push: {
          alreadyAnswered: userPoints.userId,
          userPoints
        }
    }).exec()
  },

  createUser({ body: user }, res) {
    return Scoreboard.create(user)
  },

  fetchTopTen(stats) {
    const category = `${stats}.rank`
    return tryCatch(
      Scoreboard
        .find({ [category]: { $gt: 0, $lte: 10 } })
        .select({
          _id: 0,
          handle: 1,
          [category]: 1,
          [`${stats}.score`]: 1,
          [`${stats}.highestScore`]: 1
        })
        .sort({ [category]: 'asc' })
        .limit(10)
        .lean()
        .exec()
    )
  },

  getAnswerCard(cardId) {
    return LiveQuestion.findOne({ cardId }).lean().exec()
  },

  async getDeck(req) {
    const {
      params: { slug },
      query:  {
        page = 1,
        pageSize = 12
      }
    } = req

    const deck = await tryCatch(
      DeckTitle.findOne({ slug }).lean().exec()
    )

    if (!deck) {
      return { cards: null, total: 0 }
    }

    const skipCount = (Number(page) - 1) * Number(pageSize)

    const rawCards = await tryCatch(
      OldCard
        .find({
          game: deck.fullTitle
        })
        .select({
          _id:            0,
          answerId:       1,
          answerPostedAt: 1,
          answers:        1,
          cardId:         1,
          game:           1,
          mainImageSlice: 1,
          mediaUrls:      1,
          questionText:   1
        })
        .sort({ answerPostedAt: 'desc' })
        .skip(skipCount)
        .limit(Number(pageSize))
        .lean()
        .exec()
    )

    if (rawCards.length === 0) {
      return { cards: null, total: 0 }
    }

    const cards = formatFlashCards(rawCards)
    const total = deck.tweetedCards

    return { cards, total }
  },

  getDeckTitles() {
    return DeckTitle
      .find()
      .sort({ slug: 'asc' })
      .lean()
      .exec()
  },

  async getHardestQuestion() {
    const oneWeekAgo = calculateOneWeekAgo()

    const lastWeeksQuestions = await tryCatch(
      OldCard
        .find({
          answerPostedAt: { $gte: oneWeekAgo }
        })
        .select({
          _id:          0,
          cardId:       1,
          questionText: 1,
          userPoints:   1
        })
        .lean()
        .exec()
    )

    const hardestQuestion = lastWeeksQuestions.reduce((hardest, question) => {
      const wrongAnswers = countWrongAnswers(question)
      return (wrongAnswers > hardest.wrongAnswers)
        ? { wrongAnswers, question }
        : hardest
    }, { wrongAnswers: -1, question: null })

    return hardestQuestion.question
  },

  getLiveQuestions() {
    return LiveQuestion.find().lean().exec()
  },

  async getQueue() {
    const queuedIds = await tryCatch(
      Queue.findOne().lean().then(obj => obj.queue.map(card => card.cardId))
    )

    const queuedCards = []

    for (let i = 0; i < queuedIds.length; i++) {
      const nextCard = await tryCatch(
        NewCard.findOne({ cardId: queuedIds[i] }).lean().exec()
      )

      queuedCards.unshift(nextCard)
    }

    return queuedCards
  },

  async getStats(req) {
    const {
      query: {
        loggedInUser = '',
        page = 1,
        pageSize = 100,
        view = 'weeklyStats',
        search = ''
      }
    } = req

    const pageNum = Number(page)
    const pageSizeNum = Number(pageSize)

    const match = {
      isPrivate: false,
      handle: { $regex: search, $options: 'i' },
      [`${view}.score`]: { $gt: 0 },
      [`${view}.rank`]: { $gt: 0 }
    }
    const skipCount = (pageNum - 1) * pageSizeNum
    const sortBy = {
      [`${view}.rank`]: 'asc',
      handle: 'asc'
    }

    let users = await fetchStats(
      match,
      sortBy,
      skipCount,
      pageSizeNum
    )

    if (loggedInUser && !users.find(user => user.userId === loggedInUser)) {
      users = await fetchStats(
        match,
        sortBy,
        skipCount + pageSizeNum,
        pageSizeNum
      )
    }

    if (users.length === 0) {
      return { users: [], total: 0 }
    }

    const total = await tryCatch(
      Scoreboard.find(match).count().exec()
    )

    return { users, total }
  },

  async getUserStats({ params: { handle } }) {
    const user = await tryCatch(
      Scoreboard.findOne({ handle, isPrivate: false }).lean().exec()
    )

    if (!user) return null

    const cardIds = user.allTimeStats.correct.map(card => card.cardId)
    const earnedCards = await tryCatch(
      getCards(cardIds, OldCard)
    )
    user.earnedCards = earnedCards

    return user
  },

  // noSideEffects for testing purposes
  async processAnswerWorkflow(
    answerId,
    answerPostedAt,
    cardId,
    mediaUrls,
    noSideEffects
  ) {
    if (!noSideEffects) {
      await processDMs()
    }

    const currentQuestion = await finalizeLiveQuestion(
      answerId,
      answerPostedAt,
      cardId,
      mediaUrls
    )

    await tryCatch(addPointsToScoreboard(currentQuestion))
    await tryCatch(OldCard.create(currentQuestion))
    await tryCatch(LiveQuestion.remove({ cardId }).exec())
  },

  async togglePrivacy(userId) {
    const dbUser = await tryCatch(
      Scoreboard.findOne(
        { userId }
      ).lean().exec()
    )

    return Scoreboard
      .findOneAndUpdate(
        { userId },
        { $set: {
          isPrivate: !dbUser.isPrivate,
          'allTimeStats.rank': 0,
          'yearlyStats.rank':  0,
          'monthlyStats.rank': 0,
          'weeklyStats.rank':  0
        }},
        { new: true, lean: true }
      ).exec()
  },

  async serveCards({ query: { ids } }) {
    if (!ids || ids.length === 0) {
      return null
    }

    const cards = await tryCatch(
      getCards(ids, OldCard)
    )

    return cards
  },

  async serveLiveQuestions() {
    const liveQuestions = await tryCatch(
      LiveQuestion
        .find({})
        .select({
          _id:                 0,
          answers:             0,
          answerAltText:       0,
          answerImages:        0,
          answerText:          0,
          otherVisibleContext: 0,
          userPoints:          0
        })
        .sort({ questionPostedAt: 'desc' })
        .lean()
        .exec()
    )

    return (liveQuestions.length > 0)
      ? liveQuestions
      : null
  },

  async serveRecentAnswers() {
    const recentAnswers = await tryCatch(
      getRecentAnswers()
    )

    return (recentAnswers.length > 0)
      ? formatFlashCards(recentAnswers)
      : null
  },

  serveUser({ params: { userId } }) {
    return getUser({ userId })
  },

  async updateLiveQuestion({
    cardId,
    mediaUrls,
    questionId,
    questionPostedAt
  }) {
    await tryCatch(
      LiveQuestion.updateOne({ cardId },
        { $set: {
            alreadyAnswered: [],
            mediaUrls,
            questionId,
            questionPostedAt,
            userPoints: []
          },
          $unset: {
            questionImages: '',
            questionAltText: '',
            prevLineImages: '',
            prevLineAltText: ''
          }
        }
      ).exec()
    )
  },

  async updateStats(newWeek, newMonth, newYear) {
    const bulkUpdateOps = await tryCatch(
      buildStatUpdates(newWeek, newMonth, newYear)
    )

    await tryCatch(
      updateTimestamps(newWeek, newMonth, newYear)
    )

    if (bulkUpdateOps.length > 0) {
      await tryCatch(
        Scoreboard.bulkWrite(bulkUpdateOps)
      )
    }
  }
}) // dbOps export

export function getRecentAnswers() {
  return OldCard
    .find()
    .sort({ answerPostedAt: 'desc' })
    .limit(12)
    .select({
      alreadyAnswered: 0,
      userPoints:      0
    })
    .lean()
    .exec()
}

// private functions

// Exported for testing
export async function addPointsToScoreboard(liveQuestion) {
  const cachedUpdates = initialPointsUpdates(liveQuestion)

  const allUsers = await tryCatch(
    Scoreboard.find().exec()
  )

  const ops = finishPointsUpdates(cachedUpdates, allUsers, liveQuestion.cardId)

  if (ops.length === 0) return

  await tryCatch(Scoreboard.bulkWrite(ops))
  await tryCatch(recalculateRank())
}

function fetchStats(match, sortBy, skipCount, pageSize) {
  return Scoreboard
    .find(match)
    .sort(sortBy)
    .skip(skipCount)
    .limit(pageSize)
    .lean()
    .exec()
}

function finalizeLiveQuestion(answerId, answerPostedAt, cardId, mediaUrls) {
  return LiveQuestion.findOneAndUpdate(
    { cardId },
    { $push:  { mediaUrls: { $each: mediaUrls } },
      $set:   { answerId, answerPostedAt },
      $unset: { answerImages: '', answerAltText: '' }
    },
    { new: true, lean: true }
  ).exec()
}

function finishPointsUpdates(cachedUpdates, allUsers, cardId) {
  const ops = []
  let i = 0
  let end = allUsers.length
  for (; i < end; ++i) {
    const currentUser = allUsers[i]
    let update = cachedUpdates[currentUser.userId]

    if (!update) { // user did not attempt to answer the current question
      update = {
        updateOne: {
          filter: { userId: currentUser.userId },
          update: {
            $inc: {
              'allTimeStats.totalPossible': 1,
              'yearlyStats.totalPossible':  1,
              'monthlyStats.totalPossible': 1,
              'weeklyStats.totalPossible':  1,
              'dailyStats.totalPossible':   1
            },
            $set: {
              'allTimeStats.currentAnswerStreak':  0,
              'allTimeStats.currentCorrectStreak': 0
            },
            $push: {
              'allTimeStats.unanswered': cardId
            }
          }
        }
      }
    } else { // User attempted to answer the current question
      const longestAnswerStreak = currentUser.allTimeStats.longestAnswerStreak
      const newAnswerStreak = currentUser.allTimeStats.currentAnswerStreak + 1
      if (newAnswerStreak > longestAnswerStreak) {
        update.updateOne.update.$set['allTimeStats.longestAnswerStreak'] = newAnswerStreak
      }

      const longestCorrectStreak = currentUser.allTimeStats.longestCorrectStreak
      const answeredCorrectly = update.updateOne.update.$inc['allTimeStats.score'] > 0
      let newCorrectStreak = currentUser.allTimeStats.currentCorrectStreak
      if (answeredCorrectly) {
        newCorrectStreak++
      }

      if (newCorrectStreak > longestCorrectStreak) {
        update.updateOne.update.$set['allTimeStats.longestCorrectStreak'] = newCorrectStreak
      }

      const categories = [
        'allTimeStats',
        'yearlyStats',
        'monthlyStats',
        'weeklyStats',
        'dailyStats'
      ]
      const newTimeToAnswer = update.updateOne.update.$set['allTimeStats.avgAnswerTime']

      categories.forEach(category => {
        update.updateOne.update.$set[`${category}.avgAnswerTime`] = average(
          newTimeToAnswer,
          currentUser[category].avgAnswerTime,
          currentUser[category].attempts
        )
      })
    }

    ops.push(update)
  }
  return ops
}

async function getCards(ids, model) {
  const data = await tryCatch(
    model
      .find({ cardId: { $in: ids } })
      .select({
        _id:            0,
        answerId:       1,
        answerPostedAt: 1,
        answers:        1,
        cardId:         1,
        game:           1,
        mainImageSlice: 1,
        mediaUrls:      1,
        questionText:   1
      })
      .sort({ answerPostedAt: 'desc' })
      .lean()
      .exec()
  )

  const cards = formatFlashCards(data)
  return cards
}

function initialPointsUpdates({ userPoints = [], cardId = '' }) {
  const cachedUpdates = {}
  let i = 0
  let end = userPoints.length
  for (; i < end; ++i) {
    const { userId, points, timeToAnswer } = userPoints[i]
    const op = {
      updateOne: {
        filter: { userId },
        update: {
          $inc: {
            'allTimeStats.score': points,
            'yearlyStats.score':  points,
            'monthlyStats.score': points,
            'weeklyStats.score':  points,
            'dailyStats.score':   points,
            'allTimeStats.attempts': 1,
            'yearlyStats.attempts':  1,
            'monthlyStats.attempts': 1,
            'weeklyStats.attempts':  1,
            'dailyStats.attempts':   1,
            'allTimeStats.totalPossible': 1,
            'yearlyStats.totalPossible':  1,
            'monthlyStats.totalPossible': 1,
            'weeklyStats.totalPossible':  1,
            'dailyStats.totalPossible':   1,
            'allTimeStats.currentAnswerStreak': 1
          },
          $set: {
            // NOTE
            // - timeToAnswer is the seconds it took the user to answer the CURRENT question
            // - this value is being stored here for reference
            // - it will later be overwritten by a new calculated average
            //
            // - missing info needed for calculation:
            //   - current DB value of stats.attempts
            //   - current DB value of stats.avgAnswerTime
            'allTimeStats.avgAnswerTime': timeToAnswer
          }
        }
      }
    }
    if (points > 0) {
      op.updateOne.update.$push = {
        'allTimeStats.correct': {
          cardId,
          points,
          timeToAnswer
        }
      }
      op.updateOne.update.$inc[ 'yearlyStats.correct'] = 1
      op.updateOne.update.$inc['monthlyStats.correct'] = 1
      op.updateOne.update.$inc[ 'weeklyStats.correct'] = 1
      op.updateOne.update.$inc[  'dailyStats.correct'] = 1
      op.updateOne.update.$inc['allTimeStats.currentCorrectStreak'] = 1
    } else {
      op.updateOne.update.$set['allTimeStats.currentCorrectStreak'] = 0
      op.updateOne.update.$push = {
        'allTimeStats.incorrect': cardId
      }
    }

    cachedUpdates[userId] = op
  }
  return cachedUpdates
}

// Exported for testing
export async function recalculateRank() {
  const stats = await tryCatch(aggregateStats())
  const { day: currentTimestamp } = await tryCatch(
    Timestamp.findOne().lean().exec()
  )
  const bulkUpdateOps = buildRankUpdates(stats, currentTimestamp)

  if (bulkUpdateOps.length === 0) {
    return
  }

  await tryCatch(Scoreboard.bulkWrite(bulkUpdateOps))
}

// Exported for testing
export async function updateTimestamps(newWeek, newMonth, newYear) {
  const now = new Date()

  const newTimestamp = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    0, 0, 0, 0
  )

  const update = {
    $set: { day: newTimestamp }
  }

  if (newWeek)  update.$set.week = newTimestamp

  if (newMonth) update.$set.month = newTimestamp

  if (newYear)  update.$set.year = newTimestamp

  await tryCatch(
    Timestamp.update({}, update).exec()
  )
}
