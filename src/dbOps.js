import { MongoClient }   from 'mongodb';
import { processUpload } from './processAnkiJson';
import models            from 'Models';
import {
  buildUpdatesForRank,
  createUserObject,
  getScheduledDeck,
  getUser
} from 'Utils/db';
import {
  average,
  calculateNewStats,
  formatFlashCards,
  getLiveAnswers,
  getSpoilerText,
  isSpoiled,
  tryCatch
} from 'Utils';

const {
  DeckTitle,
  NewCard,
  OldCard,
  LiveQuestion,
  Schedule
} = models;

const {
  MONGODB_URI: url,
  MONGO_DB:    DB
} = process.env;

export default ({

  async addDeck(req, res) {
    const filePath = req.file.path;
    const newCards = await tryCatch(processUpload(filePath));
    const mongo = await tryCatch(MongoClient.connect(url));
    const newCardCollection = mongo.db(DB).collection('newCards');
    const oldCardCollection = mongo.db(DB).collection('oldCards');
    const oldCards = await tryCatch(
      oldCardCollection.find()
                       .project({_id: 0, cardId: 1})
                       .toArray()
                       .then(cards =>
                         Promise.resolve(
                           cards.map(card => card.cardId)
                         ))
    );

    const ops = [];
    for (let i = 0; i < newCards.length; ++i) {
      const newCard = newCards[i];
      const { cardId } = newCard;
      if (oldCards.indexOf(cardId) === -1)
        ops.push({
          replaceOne: {
             filter: { cardId },
             replacement: newCard,
             upsert: true
          }
        });
    }

    if (ops.length === 0) {
      mongo.close();
      res.redirect('/');
      return;
    }

    await tryCatch(newCardCollection.bulkWrite(ops));
    mongo.close();

    res.redirect('/');
  },

  addOrUpdateUser(newUser) {
    return tryCatch(new Promise(async (resolve, reject) => {
      const mongo = await tryCatch(MongoClient.connect(url));
      const scoreboard = mongo.db(DB).collection('scoreboard');
      const { userId } = newUser;
      const user = await tryCatch(
        scoreboard.findOne({ userId })
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
          scoreboard.updateOne({ userId }, {
              $set: { name },
              $set: { handle },
              $set: { avatar },
              $set: { profileBanner },
              $set: { following }
          })
        );
      } else {
        await tryCatch(
          scoreboard.insert(newUser)
        );
      }

      resolve(user || newUser);
      mongo.close();
    }));
  },

  adjustScore(req, res) {
    // TODO adjust a score manually
  },

  cachePoints(questionId, userPoints) {
    return tryCatch(new Promise(async (resolve, reject) => {
      const mongo = await tryCatch(MongoClient.connect(url));
      const liveQuestions = mongo.db(DB).collection('liveQuestions');
      const { userId } = userPoints;

      await tryCatch(
        liveQuestions.updateOne({ questionId },
          { $push: {
              alreadyAnswered: userId,
              userPoints
            }
          }
        )
      );
      mongo.close();
      resolve();
    }));
  },

  async createUser({ body: user }, res) {
    const mongo = await tryCatch(MongoClient.connect(url));
    const scoreboard = mongo.db(DB).collection('scoreboard');
    await tryCatch(
      scoreboard.insert(user)
    );
    mongo.close();
  },

  getAnswerCard(cardId) {
    return tryCatch(new Promise(async (resolve, reject) => {
      const mongo = await tryCatch(MongoClient.connect(url));
      const liveQuestions = mongo.db(DB).collection('liveQuestions');
      const answerCard = await tryCatch(
        liveQuestions.findOne({ cardId })
      );
      resolve(answerCard);
      mongo.close();
    }));
  },

  async getDeck(req, res) {
    const {
      params: { slug },
      query:  { page = 1 }
    } = req

    const mongo = await tryCatch(MongoClient.connect(url));
    const deckTitles = mongo.db(DB).collection('deckTitles');
    const oldCards   = mongo.db(DB).collection('oldCards');
    const CARDS_PER_PAGE = 12;

    const deck = await tryCatch(
      deckTitles.findOne({ slug })
    );

    if (!deck) {
      res.json({ cards: null, total: 0 });
      mongo.close();
      return;
    }

    const skipCount = (page - 1) * CARDS_PER_PAGE;
    const total = await tryCatch(
      oldCards.find({ game: deck.fullTitle }).count()
    );

    if (total === 0) {
      res.json({ cards: null, total: 0 });
      mongo.close();
      return;
    }

    const rawCards = await tryCatch(
      oldCards.find({
        game: deck.fullTitle,
      })
      .project({
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
      .sort({ answerPostedAt: -1 })
      .skip(skipCount)
      .limit(CARDS_PER_PAGE)
      .toArray()
    );

    if (rawCards.length === 0) {
      res.json(null);
      mongo.close();
      return;
    }

    const cards = formatFlashCards(rawCards);
    res.json({ cards, total });
    mongo.close();
  },

  async getDeckTitles(req, res) {
    const titles = await tryCatch(
      DeckTitle.find().select({ _id: 0 }).exec()
    );
    titles.sort((a, b) => a.slug > b.slug);
    const response = await tryCatch(
      addTweetedCardCounts(titles)
    );
    res.json(response);
  },

  async serveCards({ query: { ids } }, res) {
    if (!ids || ids.length === 0) {
      res.json(null);
      return;
    }
    const mongo = await tryCatch(MongoClient.connect(url));
    const oldCards = mongo.db(DB).collection('oldCards');
    const cards = await tryCatch(
      getCards(ids, oldCards)
    );
    res.json(cards);
    mongo.close();
  },

  async getLiveQuestions() {
    return await tryCatch(
      LiveQuestion.find().select({ _id: 0 }).exec()
    );
  },

  async getNewCards(req, res) {
    const newCards = await tryCatch(
      NewCard.find().select({ _id: 0 }).exec()
    );
    res.json(newCards);
  },

  async getOldCards(req, res) {
    const oldCards = await tryCatch(
      OldCard.find().select({ _id: 0 }).exec()
    );
    res.json(oldCards);
  },

  getRandomQuestion() {
    return tryCatch(new Promise(async (resolve, reject) => {
      const currentHour = getHour();
      const scheduledDeck = await tryCatch(
        getScheduledDeck(currentHour)
      );

      const randomCard = await tryCatch(
        getRandomCard(scheduledDeck)
      );

      if (!randomCard) {
        reject(new Error('No appropriate cards available.'));
        return;
      }

      await tryCatch(LiveQuestion.create(randomCard));
      await tryCatch(NewCard.deleteOne(randomCard).exec());
      resolve(randomCard);
    }));
  },

  // TODO - delete this method if not needed
  async getScore(req, res) {
    const { handle } = req.params;
    const mongo = await tryCatch(MongoClient.connect(url));
    const scoreboard = mongo.db(DB).collection('scoreboard');
    const user = await tryCatch(scoreboard.findOne({handle}));
    res.json(user);
    mongo.close();
  },

  async getScores(req, res ) {
    const {
      query: {
        page = 1,
        pageSize = 100,
        view = 'weeklyStats',
        search = ''
      }
    } = req;

    const mongo = await tryCatch(MongoClient.connect(url));
    const scoreboard = mongo.db(DB).collection('scoreboard');

    const match = {
      handle: { $regex: search, $options: 'i' },
      [`${view}.score`]: { $gt: 0 }
    };
    const total = await tryCatch(
      scoreboard.find(match).count()
    );

    const skipCount = (Number(page) - 1) * Number(pageSize);
    const users = await tryCatch(
      scoreboard.find(match)
      .sort({[`${view}.rank`]: 1, handle: 1})
      .skip(skipCount)
      .limit(Number(pageSize))
      .toArray()
    );
    if (users.length === 0) {
      res.json({ users: [], total: 0 });
      mongo.close();
      return;
    }
    res.json({ users, total });
    mongo.close();
  },

  async getUser({ params: { userId }}, res) {
    const user = await tryCatch(
      getUser(userId)
    );
    res.json(user);
  },

  async getUserStats({ params: { handle }}, res) {
    const mongo = await tryCatch(MongoClient.connect(url));
    const scoreboard = mongo.db(DB).collection('scoreboard');
    const oldCards = mongo.db(DB).collection('oldCards');
    const user = await tryCatch(scoreboard.findOne({handle}));

    if (!user) {
      res.json(null);
      mongo.close();
      return;
    }

    const cardIds = user.allTimeStats.correct.map(record => record.cardId);
    const earnedCards = await tryCatch(
      getCards(cardIds, oldCards)
    );
    user.earnedCards = earnedCards;
    res.json(user);
    mongo.close();
  },

  async processAnswerWorkflow(answerId, answerPostedAt, cardId, mediaUrls) {
    const mongo = await tryCatch(MongoClient.connect(url));
    const oldCards      = mongo.db(DB).collection('oldCards');
    const liveQuestions = mongo.db(DB).collection('liveQuestions');

    const currentQuestion = await tryCatch(
      liveQuestions.findOneAndUpdate({ cardId },
        { $push:  { mediaUrls: { $each: mediaUrls } },
          $set:   { answerId, answerPostedAt },
          $unset: { answerImages: '', answerAltText: '' }
        },
        { returnOriginal: false }
      )
      .then(doc => Promise.resolve(doc.value))
    );
    await tryCatch(addPointsToScoreboard(currentQuestion, mongo));
    await tryCatch(oldCards.insert(currentQuestion))
    await tryCatch(liveQuestions.remove(currentQuestion));
    mongo.close();
  },

  async serveLiveQuestions(req, res) {
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
                  .sort({ questionPostedAt: 'desc' })
    );

    if (liveQuestions.length === 0)
      res.json(null)
    else
      res.json(liveQuestions);

  },

  async serveRecentAnswers(req, res) {
    const recentAnswers = await tryCatch(
      getRecentAnswers()
    );
    if (recentAnswers.length === 0)
      res.json(null);
    else {
      const answerCards = formatFlashCards(recentAnswers);
      res.json(answerCards);
    }
  },

  async updateLiveQuestion({
    cardId,
    mediaUrls,
    questionId,
    questionPostedAt
  }) {
    const mongo = await tryCatch(MongoClient.connect(url));
    const liveQuestions = mongo.db(DB).collection('liveQuestions');

    await tryCatch(
      liveQuestions.updateOne({ cardId },
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
      )
    )
    mongo.close();
  },

  async updateStats(resetWeeklyStats, resetMonthlyStats) {
    const mongo = await tryCatch(MongoClient.connect(url));
    const scoreboard = mongo.db(DB).collection('scoreboard');
    const users = await tryCatch(scoreboard.find().toArray());
    const bulkUpdateOps = [];

    let i = 0;
    let end = users.length;
    for (; i < end; i++) {
      const user = users[i];
      const { userId, dailyStats } = user;
      const newDailyStats = calculateNewStats(dailyStats);

      const op = {
        updateOne: {
          filter: { userId },
          update: {
            $set: {
              'dailyStats': newDailyStats
            }
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

    if (bulkUpdateOps.length === 0) {
      mongo.close();
      return;
    }

    await tryCatch(scoreboard.bulkWrite(bulkUpdateOps));
    mongo.close();
  }

}) // dbOps export


// private functions

function addPointsToScoreboard({ userPoints = [], cardId = '' }, mongo) {
  return tryCatch(new Promise(async (resolve, reject) => {
    const scoreboard = mongo.db(DB).collection('scoreboard');

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

    const allUsers = await tryCatch(scoreboard.find().toArray());
    const ops = [];

    i = 0;
    end = allUsers.length;
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

    if (ops.length === 0) {
      resolve();
      return;
    }

    await tryCatch(scoreboard.bulkWrite(ops));
    await tryCatch(recalculateRank(scoreboard));
    resolve();
  }));
}

function addTweetedCardCounts(deckTitles) {
  return tryCatch(new Promise(async (resolve, reject) => {
    const mongo = await tryCatch(MongoClient.connect(url));
    const oldCards = mongo.db(DB).collection('oldCards');

    for (let i = 0; i < deckTitles.length; i++) {
      const title = deckTitles[i];
      const tweetedCards = await tryCatch(
        oldCards.find({ game: title.fullTitle }).count()
      );

      title.tweetedCards = tweetedCards;
    }

    resolve(deckTitles);
  }));
}

function getCards(ids, collection) {
  return tryCatch(new Promise(async (resolve, reject) => {
    const data = await tryCatch(
      collection.find({ cardId: { $in: ids }})
                .project({
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
                .sort({ answerPostedAt: -1 })
                .toArray()
    );

    const cards = formatFlashCards(data);
    resolve(cards);
  }));
}


// Exported for testing
export function getRandomCard(scheduledDeck) {
  return new Promise(async (resolve, reject) => {
    let randomCard = await tryCatch(
      NewCard.aggregate([
        { $match: scheduledDeck },
        { $sample: { size: 1 }}
      ])
      .then(cards => Promise.resolve(cards[0]))
    );
    if (randomCard == null) {
      console.error('Empty deck. Please Add More Cards to DB.');
      resolve(null);
      return;
    }

    const liveCards = await tryCatch(LiveQuestion.find().exec());
    const recentCards = await tryCatch(getRecentAnswers());
    const spoilerText = getSpoilerText(liveCards.concat(recentCards));
    const liveAnswers = getLiveAnswers(liveCards);

    let spoiled = isSpoiled(randomCard, spoilerText, liveAnswers);
    let tries = 0;
    while(spoiled) {
      if (tries > 20) {
        console.error('All new cards contain spoilers. Please try again later.');
        resolve(null);
        return;
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

    resolve(randomCard);
  });
}

function getRecentAnswers() {
  return tryCatch(new Promise(async (resolve, reject) => {
    const recentAnswers = await tryCatch(
      OldCard.find()
             .sort({ answerPostedAt: 'desc' })
             .limit(12)
             .select({
               _id:             0,
               alreadyAnswered: 0,
               userPoints:      0
             })
             .exec()
    );

    resolve(recentAnswers);
  }));
}

function recalculateRank(scoreboard) {
  return tryCatch(new Promise(async (resolve, reject) => {
    const stats = await tryCatch(scoreboard.aggregate([
      { $project: {
          _id: 0,
          orderBy: { $literal: [ 'weeklyStats', 'monthlyStats', 'allTimeStats' ] },
          userId:                         1,
          'allTimeStats.avgTimeToAnswer': 1,
          'allTimeStats.score':           1,
          'allTimeStats.rank':            1,
          'monthlyStats.avgTimeToAnswer': 1,
          'monthlyStats.score':           1,
          'monthlyStats.rank':            1,
          'weeklyStats.avgTimeToAnswer':  1,
          'weeklyStats.score':            1,
          'weeklyStats.rank':             1
        }
      },
      { $unwind: '$orderBy' },
      { $group:
        { _id:
          { orderBy: '$orderBy',
            score:
            { $switch: {
                branches: [
                   { case: { $eq: ['$orderBy', 'weeklyStats' ] }, then: '$weeklyStats.score'  },
                   { case: { $eq: ['$orderBy', 'monthlyStats'] }, then: '$monthlyStats.score' },
                ],
                default: '$allTimeStats.score'
              }
            }
          },
          users: { $push: '$$CURRENT' }
        }
      },
      { $sort: { '_id.score': -1 } },
      { $group:
        { _id: '$_id.orderBy',
          scores: {
            $push: {
              score: '$_id.score',
              users: '$users'
            }
          }
        }
      }
    ], { allowDiskUse: true }).toArray());

    const bulkUpdateOps = buildUpdatesForRank(stats);

    if (bulkUpdateOps.length === 0) {
      resolve();
      return;
    }
    await tryCatch(scoreboard.bulkWrite(bulkUpdateOps));
    resolve();
  }));
}
