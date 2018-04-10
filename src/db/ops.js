import { processUpload } from 'Anki/processing';
import models            from 'Models';
import {
  aggregateStats,
  buildUpdatesForRank,
  getScheduledDeck,
  getUser
} from 'DB/utils';
import {
  average,
  calculateNewStats,
  formatFlashCards,
  getLiveAnswers,
  getSpoilerText,
  isSpoiled,
  tryCatch
} from 'Utils';
import { buildStatsAggregation } from './utils';

const {
  DeckTitle,
  NewCard,
  OldCard,
  LiveQuestion,
  Schedule,
  Scoreboard
} = models;

const {
  MONGODB_URI: url,
  MONGO_DB:    DB
} = process.env;

export default ({

  async addDeck(req, res) {
    const filePath = req.file.path;
    const newCards = await tryCatch(processUpload(filePath));
    const oldCards = await tryCatch(
      OldCard
        .find()
        .select({_id: 0, cardId: 1})
        .lean()
        .exec()
    );

    const ops = [];
    for (let i = 0; i < newCards.length; ++i) {
      const newCard = newCards[i];
      const { cardId } = newCard;
      if (!oldCards.find(card => card.cardId === cardId))
        ops.push({
          replaceOne: {
             filter: { cardId },
             replacement: newCard,
             upsert: true
          }
        });
    }

    if (ops.length === 0)
      return;

    await tryCatch(NewCard.bulkWrite(ops));
    console.log('Finished uploading/updating cards!');
  },

  async addOrUpdateUser(newUser) {
    const { userId } = newUser;
    const user = await tryCatch(
      Scoreboard.findOne({ userId }).lean().exec()
    );
    if (user) {
      const {
        name,
        handle,
        avatar,
        profileBanner,
        following
      } = newUser;

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
      );
    } else {
      await tryCatch(
        Scoreboard.create(newUser)
      );
    }

    return user || newUser;
  },

  adjustScore(req, res) {
    // TODO adjust a score manually
  },

  async cachePoints(cardId, userPoints) {
    return await tryCatch(
      LiveQuestion.update(
        { cardId },
        { $push: {
            alreadyAnswered: userPoints.userId,
            userPoints
          }
      }).exec()
    );
  },

  async createUser({ body: user }, res) {
    return await tryCatch(
      Scoreboard.create(user)
    );
  },

  async getAnswerCard(cardId) {
    return await tryCatch(
      LiveQuestion.findOne({ cardId }).lean().exec()
    );
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
    );

    if (!deck)
      return { cards: null, total: 0 };

    const skipCount = (Number(page) - 1) * Number(pageSize);

    const rawCards = await tryCatch(
      OldCard.find({
        game: deck.fullTitle,
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
    );

    if (rawCards.length === 0)
      return { cards: null, total: 0 };

    const cards = formatFlashCards(rawCards);
    const total = deck.tweetedCards;

    return { cards, total };
  },

  async getDeckTitles() {
    return await tryCatch(
      DeckTitle.find()
               .sort({ slug: 'asc' })
               .lean()
               .exec()
    );
  },

  async serveCards({ query: { ids } }) {
    if (!ids || ids.length === 0)
      return null;

    const cards = await tryCatch(
      getCards(ids, OldCard)
    );

    return cards;
  },

  async getLiveQuestions() {
    return await tryCatch(
      LiveQuestion.find().lean().exec()
    );
  },

  async getNewCards() {
    return await tryCatch(
      NewCard.find().lean().exec()
    );
  },

  async getOldCards() {
    return await tryCatch(
      OldCard.find().lean().exec()
    );
  },

  async getRandomQuestion(hour) {
    const scheduledDeck = await tryCatch(
      getScheduledDeck(hour)
    );

    const randomCard = await tryCatch(
      getRandomCard(scheduledDeck)
    );

    if (!randomCard) {
      console.error('No appropriate cards available.');
      return;
    }

    await tryCatch(LiveQuestion.create(randomCard));
    await tryCatch(NewCard.deleteOne(randomCard).exec());
    return randomCard;
  },

  async getScores(req) {
    const {
      query: {
        page = 1,
        pageSize = 100,
        view = 'weeklyStats',
        search = ''
      }
    } = req;

    const match = {
      handle: { $regex: search, $options: 'i' },
      [`${view}.score`]: { $gt: 0 }
    };
    const skipCount = (Number(page) - 1) * Number(pageSize);

    const users = await tryCatch(
      Scoreboard.find(match)
      .sort({
        [`${view}.rank`]: 'asc',
        handle: 'asc'
      })
      .skip(skipCount)
      .limit(Number(pageSize))
      .lean()
      .exec()
    );

    if (users.length === 0)
      return { users: [], total: 0 };
    
    const total = await tryCatch(
      Scoreboard.find(match).count().exec()
    );
    return { users, total };
  },

  async getUserStats({ params: { handle }}) {
    const user = await tryCatch(
      Scoreboard.findOne({ handle }).lean().exec()
    );

    if (!user)
      return null;

    const cardIds = user.allTimeStats.correct.map(card => card.cardId);
    const earnedCards = await tryCatch(
      getCards(cardIds, OldCard)
    );
    user.earnedCards = earnedCards;

    return user;
  },

  async processAnswerWorkflow(answerId, answerPostedAt, cardId, mediaUrls) {
    const currentQuestion = await tryCatch(
      LiveQuestion.findOneAndUpdate(
        { cardId },
        { $push:  { mediaUrls: { $each: mediaUrls } },
          $set:   { answerId, answerPostedAt },
          $unset: { answerImages: '', answerAltText: '' }
        },
        { new: true, lean: true }
      ).exec()
    );

    await tryCatch(addPointsToScoreboard(currentQuestion));
    await tryCatch(OldCard.create(currentQuestion))
    await tryCatch(LiveQuestion.remove({ cardId }).exec());
  },

  async serveLiveQuestions() {
    const liveQuestions = await tryCatch(
      LiveQuestion.find({})
                  .select({
                    _id:                 0,
                    answers:             0,
                    answerAltText:       0,
                    answerImages:        0,
                    answerText:          0,
                    otherVisibleContext: 0,
                    userPoints:          0
                  })
                  .lean()
                  .sort({ questionPostedAt: 'desc' })
    );

    return (liveQuestions.length > 0)
      ? liveQuestions
      : null;
  },

  async serveRecentAnswers() {
    const recentAnswers = await tryCatch(
      getRecentAnswers()
    );

    return (recentAnswers.length > 0)
      ? formatFlashCards(recentAnswers)
      : null;
  },

  async serveUser({ params: { userId }}) {
    return await tryCatch(
      getUser(userId)
    );
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
    );
  },

  async updateStats(resetWeeklyStats, resetMonthlyStats) {
    const users = await tryCatch(
      Scoreboard.find().lean().exec()
    );

    const bulkUpdateOps = [];
    let i = 0;
    let end = users.length;
    for (; i < end; i++) {
      const user = users[i];
      const { userId } = user;
      const dailyStats = calculateNewStats(user.dailyStats);

      const op = {
        updateOne: {
          filter: { userId },
          update: {
            $set: { dailyStats }
          }
        }
      };

      if (resetWeeklyStats) {
        const { weeklyStats } = user;
        const newWeeklyStats = calculateNewStats(weeklyStats, true);
        op.updateOne.update.$set.weeklyStats = newWeeklyStats;
      }

      if (resetMonthlyStats) {
        const { monthlyStats } = user;
        const newMonthlyStats = calculateNewStats(monthlyStats, true);
        op.updateOne.update.$set.monthlyStats = newMonthlyStats;
      }

      bulkUpdateOps.push(op);
    }

    if (bulkUpdateOps.length === 0)
      return;

    await tryCatch(
      Scoreboard.bulkWrite(bulkUpdateOps)
    );
  }

}) // dbOps export


// private functions

async function addPointsToScoreboard(liveQuestion) {
  const cachedUpdates = initialPointsUpdates(liveQuestion);

  const allUsers = await tryCatch(
    Scoreboard.find().exec()
  );

  const ops = finishPointsUpdateOps(cachedUpdates, allUsers, liveQuestion.cardId);

  if (ops.length === 0)
    return;

  await tryCatch(Scoreboard.bulkWrite(ops));
  await tryCatch(recalculateRank());
}

function finishPointsUpdateOps(cachedUpdates, allUsers, cardId) {
  const ops = [];
  let i = 0;
  let end = allUsers.length;
  for (; i < end; ++i) {
    const currentUser = allUsers[i];
    let update = cachedUpdates[currentUser.userId];

    if (!update) { // user did not attempt to answer the current question
      update = {
        updateOne: {
          filter: { userId: currentUser.userId },
          update: {
            $inc: {
              'allTimeStats.totalPossible': 1,
              'monthlyStats.totalPossible': 1,
              'weeklyStats.totalPossible':  1,
              'dailyStats.totalPossible':   1
            },
            $push: {
              'allTimeStats.unanswered': cardId
            }
          }
        }
      };

    } else { // User attempted to answer the current question

      const newTimeToAnswer = update.updateOne.update.$set['allTimeStats.avgTimeToAnswer'];
      update.updateOne.update.$set['allTimeStats.avgTimeToAnswer'] = average(
        newTimeToAnswer,
        currentUser.allTimeStats.avgTimeToAnswer,
        currentUser.allTimeStats.attempts
      );
      update.updateOne.update.$set['monthlyStats.avgTimeToAnswer'] = average(
        newTimeToAnswer,
        currentUser.monthlyStats.avgTimeToAnswer,
        currentUser.monthlyStats.attempts
      );
      update.updateOne.update.$set['weeklyStats.avgTimeToAnswer'] = average(
        newTimeToAnswer,
        currentUser.weeklyStats.avgTimeToAnswer,
        currentUser.weeklyStats.attempts
      );
      update.updateOne.update.$set['dailyStats.avgTimeToAnswer'] = average(
        newTimeToAnswer,
        currentUser.dailyStats.avgTimeToAnswer,
        currentUser.dailyStats.attempts
      );
    }

    ops.push(update);
  }
  return ops;
}

async function getCards(ids, model) {
  const data = await tryCatch(
    model.find({ cardId: { $in: ids }})
         .select({
           _id:            0,
           answerId:       1,
           answerPostedAt: 1,
           answers:        1,
           cardId:         1,
           game:           1,
           mainImageSlice: 1,
           mediaUrls:      1,
           questionText:   1,
         })
         .sort({ answerPostedAt: 'desc' })
  );

  const cards = formatFlashCards(data);
  return cards;
}


// Exported for testing
export async function getRandomCard(scheduledDeck) {
  let randomCard = await tryCatch(
    NewCard.aggregate([
      { $match: scheduledDeck },
      { $sample: { size: 1 }}
    ])
    .then(cards => Promise.resolve(cards[0]))
  );
  if (randomCard == null) {
    console.error('Empty deck. Please Add More Cards to DB.');
    return null;
  }

  const liveCards = await tryCatch(LiveQuestion.find().lean().exec());
  const recentCards = await tryCatch(getRecentAnswers());
  const spoilerText = getSpoilerText(liveCards.concat(recentCards));
  const liveAnswers = getLiveAnswers(liveCards);

  let spoiled = isSpoiled(randomCard, spoilerText, liveAnswers);
  let tries = 0;
  while(spoiled) {
    if (tries > 20) {
      console.error('All new cards contain spoilers. Please try again later.');
      return null;
    }
    if (tries > 10)
      scheduledDeck = {};

    randomCard = await tryCatch(
      NewCard.aggregate([
        { $match: scheduledDeck },
        { $sample: { size: 1 }}
      ])
      .then(cards => Promise.resolve(cards[0]))
    );
    spoiled = isSpoiled(randomCard, spoilerText, liveAnswers);
    tries++;
  }

  return randomCard;
}

async function getRecentAnswers() {
  return await tryCatch(
    OldCard
      .find()
      .sort({ answerPostedAt: 'desc' })
      .limit(12)
      .select({
        alreadyAnswered: 0,
        userPoints:      0
      })
      .lean()
      .exec()
  );
}

function initialPointsUpdates({ userPoints = [], cardId = '' }) {
  const cachedUpdates = {};
  let i = 0;
  let end = userPoints.length
  for (; i < end; ++i) {
    const { userId, points, timeToAnswer } = userPoints[i];
    const op = {
      updateOne: {
        filter: { userId },
        update: {
          $inc: {
            'allTimeStats.score': points,
            'monthlyStats.score': points,
            'weeklyStats.score':  points,
            'dailyStats.score':   points,
            'allTimeStats.attempts': 1,
            'monthlyStats.attempts': 1,
            'weeklyStats.attempts':  1,
            'dailyStats.attempts':   1,
            'allTimeStats.totalPossible': 1,
            'monthlyStats.totalPossible': 1,
            'weeklyStats.totalPossible':  1,
            'dailyStats.totalPossible':   1
          },
          $set: {
            // NOTE
            // - timeToAnswer is the seconds it took the user to answer the CURRENT question
            // - this value is being stored here for reference
            // - it will later be overwritten by a new calculated average
            //
            // - missing info needed for calculation:
            //   - current DB value of stats.attempts
            //   - current DB value of stats.avgTimeToAnswer
            'allTimeStats.avgTimeToAnswer': timeToAnswer
          }
        }
      }
    };
    if (points > 0) {
      op.updateOne.update.$push = {
        'allTimeStats.correct': {
          cardId,
          points,
          timeToAnswer
        }
      };
      op.updateOne.update.$inc['monthlyStats.correct'] = 1;
      op.updateOne.update.$inc['weeklyStats.correct']  = 1;
      op.updateOne.update.$inc['dailyStats.correct']   = 1;

    } else {
      op.updateOne.update.$push = {
        'allTimeStats.incorrect': cardId
      }
    }

    cachedUpdates[userId] = op;
  }
  return cachedUpdates;
}

async function recalculateRank() {
  const stats = aggregateStats();

  if (empty(stats))
    return;
  
  const bulkUpdateOps = buildUpdatesForRank(stats);

  if (empty(bulkUpdateOps))
    return;

  await tryCatch(Scoreboard.bulkWrite(bulkUpdateOps));
}

function empty(arr) {
  return arr.length === 0;
}