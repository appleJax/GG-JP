const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGODB_URI;
const DB = process.env.MONGO_DB;
const { processUpload } = require('./processAnkiJson');
const { tryCatch } = require('Utils');
const PAGE_SIZE = 100;

module.exports = {
  getRandomQuestion() {
    return new Promise(async (resolve, reject) => {
      const mongo = await tryCatch(MongoClient.connect(url));
      const newCards = mongo.db(DB).collection('newCards');
      const oldCards = mongo.db(DB).collection('oldCards');
      const randomCard = await tryCatch(newCards.findOne());
      if (randomCard == null) {
        reject(new Error("Empty deck. Please Add More Cards to DB."));
        return;
      }
      await tryCatch(oldCards.insert(randomCard));
      await tryCatch(newCards.remove(randomCard));
      resolve(randomCard);
      mongo.close();
    });
  },

  revealAnswerWorkflow(cardId) {
    return new Promise(async (resolve, reject) => {
      const mongo = await tryCatch(MongoClient.connect(url));
      const oldCards = mongo.db(DB).collection('oldCards');
      const answerCard = await tryCatch(oldCards.findOne({ cardId }));
      resolve(answerCard);
      await tryCatch(removeLiveQuestion(mongo, cardId));
      mongo.close();
    });
  },

  async addLiveQuestion(record, mediaUrls) {
    const { cardId } = record;
    const mongo = await tryCatch(MongoClient.connect(url));
    const liveQuestions = mongo.db(DB).collection('liveQuestions');
    const oldCards = mongo.db(DB).collection('oldCards');
    await tryCatch(liveQuestions.insert({
      ...record,
      mediaUrls
    }));
    await tryCatch(
      oldCards.updateOne(
        {cardId},
        {
          $set: { mediaUrls },
          $unset: {
            questionImg: '',
            questionAltText: '',
            prevLineImg: '',
            prevLineAltText: ''
          }
        }
      )
    )
    mongo.close();
  },

  async addMediaUrlsToCard(cardId, [mediaUrl]) {
    const mongo = await tryCatch(MongoClient.connect(url));
    const oldCards = mongo.db(DB).collection('oldCards');
    await tryCatch(
      oldCards.updateOne(
        { cardId }, {
          $push: { mediaUrls: mediaUrl },
          $unset: { answerImg: '', answerAltText: '' }
        }
      )
    )
    mongo.close();
  },

  async updateLiveQuestion(questionId, userPoints) {
    const mongo = await tryCatch(MongoClient.connect(url));
    const liveQuestions = mongo.db(DB).collection('liveQuestions');
    const { userId } = userPoints;

    await tryCatch(
      liveQuestions.update(
        { questionId }, {
          $push: {
            alreadyAnswered: userId,
            cachedPoints: userPoints
          }
        }
      )
    );
    mongo.close();
  },

  getLiveQuestions() {
    return new Promise(async (resolve, reject) => {
      const mongo = await tryCatch(MongoClient.connect(url));
      const collection = mongo.db(DB).collection('liveQuestions');
      const liveQuestions = await tryCatch(collection.find().toArray());
      resolve(liveQuestions);
      mongo.close();
    });
  },

  async serveLiveQuestions(req, res) {
    const mongo = await tryCatch(MongoClient.connect(url));
    const collection = mongo.db(DB).collection('liveQuestions');
    const liveQuestions = await tryCatch(collection.find().toArray());
    res.json(liveQuestions);
    mongo.close();
  },

  async addOrUpdateUser(newUser) {
    const mongo = await tryCatch(MongoClient.connect(url));
    const scoreboard = mongo.db(DB).collection('scoreboard');
    const { userId } = newUser;
    const user = await tryCatch(scoreboard.findOne({userId}));
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
      await tryCatch(scoreboard.insert(newUser));
    }
    mongo.close();
  },

  adjustScore(req, res) {
    // TODO adjust a score manually
  },

  async getScores({query: {page = 1, view = 'weeklyStats', search = ''}}, res) {
    const mongo = await tryCatch(MongoClient.connect(url));
    const collection = mongo.db(DB).collection('scoreboard');
    const data = await tryCatch(
      collection.find({
        handle: { $regex: search, $options: 'i' },
        [`${view}.score`]: { $gt: 0 }
      })
      .sort({[`${view}.score`]: -1, handle: 1})
      .limit(PAGE_SIZE*page)
      .toArray()
    );
    console.log('data:', data)
    res.json(data);
    mongo.close();
  },

  async getUserStats({ query: { handle } }, res) {
    const mongo = await tryCatch(MongoClient.connect(url));
    const scoreboard = mongo.db(DB).collection('scoreboard');
    const oldCards = mongo.db(DB).collection('oldCards');
    const user = await tryCatch(scoreboard.findOne({handle}));

    if (!user) {
      res.json(null);
      return;
    }

    const cardIds = user.allTimeStats.correct.map(record => record.cardId);
    const earnedCards = await tryCatch(
      getCards(cardIds, oldCards)
    );
    user.earnedCards = earnedCards;
    res.json(user);
  },

  // TODO - delete this method if not needed
  async getScore(req, res) {
    const { handle } = req.params;
    const mongo = await tryCatch(MongoClient.connect(url));
    const collection = mongo.db(DB).collection('scoreboard');
    const user = await tryCatch(collection.findOne({handle}));
    res.json(user);
    mongo.close();
  },

  async addDeck(req, res) {
    const filePath = req.file.path;
    const newCards = await tryCatch(processUpload(filePath));
    const mongo = await tryCatch(MongoClient.connect(url));
    const collection = mongo.db(DB).collection('newCards');
    const batch = collection.initializeUnorderedBulkOp();

    for (let i = 0; i < newCards.length; ++i) {
      batch.insert(newCards[i]);
    }

    await tryCatch(batch.execute());
    mongo.close();

    res.redirect('/');
  },

  getNewCards(req, res) {
    getCollection(req, res, 'newCards');
  },

  getOldCards(req, res) {
    getCollection(req, res, 'oldCards');
  },

  async weeklyMonthlyReset(resetWeeklyStats, resetMonthlyStats) {
    const mongo = await tryCatch(MongoClient.connect(url));
    const collection = mongo.db(DB).collection('scoreboard');

    const zero = {
      score: 0,
      attempts: 0,
      correct: 0
    };
    const reset = { $set: {} };
    if (resetWeeklyStats)
      reset.$set.weeklyStats = zero;

    if (resetMonthlyStats)
      reset.$set.monthlyStats = zero;

    collection.update(
      {}, reset, { multi: true }
    );

    mongo.close();
  }

} // module.exports

function getCards(ids, collection) {
  return new Promise(async (resolve, reject) => {
    const data = await tryCatch(
      collection.find({cardId: {$in: ids}})
                .project({_id: 0, mediaUrls: 1, questionText: 1, answers: 1})
                .toArray()
    );

    const cards = data.map(card => {
      card.questionText = card.questionText.split('\n')[0];
      const s = card.answers.length > 1 ? 's' : '';
      card.answers = `Answer${s}: ${card.answers.join(', ')}`;
      card.mediaUrl = (card.mediaUrls.length === 3)
        ? card.mediaUrls[1]
        : card.mediaUrls[0];

      delete card.mediaUrls;
      return card;
    });

    resolve(cards);
  });
}

async function getCollection(req, res, collectionName) {
  const mongo = await tryCatch(MongoClient.connect(url));
  const collection = mongo.db(DB).collection(collectionName);
  const data = await tryCatch(
    collection.find()
              .project({_id: 0})
              .toArray()
  );
  res.json(data);
  mongo.close();
}

function removeLiveQuestion(mongo, cardId) {
  return new Promise(async (resolve, reject) => {
    const collection = mongo.db(DB).collection('liveQuestions');
    const currentQuestion = await tryCatch(collection.findOne({cardId}));
    await tryCatch(collection.remove(currentQuestion));
    await tryCatch(addPointsToScoreboard(mongo, currentQuestion));
    resolve();
  });
}

function addPointsToScoreboard(mongo, { cachedPoints, cardId }) {
  return new Promise(async (resolve, reject) => {
    const scoreboard = mongo.db(DB).collection('scoreboard');
    const oldCards = mongo.db(DB).collection('oldCards');
    const answerPostedAt = new Date().getTime();
    oldCards.updateOne({cardId}, {$set: {answerPostedAt}});

    const ops = [];
    for (let i = 0; i < cachedPoints.length; ++i) {
      const { userId, points } = cachedPoints[i];
      const op = {
        updateOne: {
          filter: { userId },
          update: {
            $inc: {
              'allTimeStats.score': points,
              'monthlyStats.score': points,
              'weeklyStats.score':  points,
              'allTimeStats.attempts': 1,
              'monthlyStats.attempts': 1,
              'weeklyStats.attempts':  1
            }
          }
        }
      };
      if (points > 0) {
        op.updateOne.update.$push = {
          'allTimeStats.correct': {
            answerPostedAt,
            cardId,
            points
          }
        };

        op.updateOne.update.$inc['monthlyStats.correct'] = 1;
        op.updateOne.update.$inc['weeklyStats.correct']  = 1;
      }

      ops.push(op);
    }
    if (ops.length === 0) {
      resolve();
      return;
    }

    await tryCatch(scoreboard.bulkWrite(ops));
    await tryCatch(recalculateRank(scoreboard));
    resolve();
  });
}

function recalculateRank(scoreboard) {
  return new Promise(async (resolve, reject) => {
    const stats = await tryCatch(scoreboard.aggregate([
      { $project: {
          _id: 0,
          orderBy: { $literal: [ 'weeklyStats', 'monthlyStats', 'allTimeStats' ] },
          userId: 1,
          'allTimeStats.score': 1,
          'allTimeStats.rank':  1,
          'monthlyStats.score': 1,
          'monthlyStats.rank':  1,
          'weeklyStats.score':  1,
          'weeklyStats.rank':   1
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
    ]).toArray());

    const usersToUpdate = {};
    const currentRanks = {
      allTimeStats: 1,
      monthlyStats: 1,
      weeklyStats:  1
    };
    stats.forEach(({ _id: category, scores }) => {
      const end = scores.length;
      let i = 0;
      for (; i < end; i++) {
        const currentStat = scores[i];
        if (currentStat.score === 0) continue;

        currentStat.users.forEach(user => {
          const previousRank = user[category].rank;
          const currentRank = currentRanks[category];
          if (previousRank !== currentRank) {
            const cachedUpdate = usersToUpdate[user.userId] || {};
            cachedUpdate[category] = currentRank;
            usersToUpdate[user.userId] = cachedUpdate;
          }
        });
        currentRanks[category] += currentStat.users.length;
      }
    });

    const bulkUpdateOps = [];
    const userIdsToUpdate = Object.keys(usersToUpdate);
    const end = userIdsToUpdate.length;
    let i = 0;
    for (; i < end; i++) {
      const currentUser = userIdsToUpdate[i];
      const userId = Number(currentUser);
      const op = {
        updateOne: {
          filter: { userId },
          update: {
            $set: {}
          }
        }
      };
      const userUpdates = usersToUpdate[currentUser];
      Object.keys(currentRanks).forEach(category => {
        const newRank = userUpdates[category];
        if (newRank)
          op.updateOne.update.$set[`${category}.rank`] = newRank;
      });

      bulkUpdateOps.push(op);

    } // for loop

    await tryCatch(scoreboard.bulkWrite(bulkUpdateOps));
    resolve();
  });
}
