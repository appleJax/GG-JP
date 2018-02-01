const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGODB_URI;
const DB = process.env.MONGO_DB;
const { processUpload } = require('./processAnkiJson');
const { tryCatch } = require('Utils');

module.exports = {
  getRandomQuestion() {
    return new Promise(async (resolve, reject) => {
      const mongo = await tryCatch(MongoClient.connect(url));
      const newCards = mongo.db(DB).collection('newCards');
      const oldCards = mongo.db(DB).collection('oldCards');
      const randomCard = await tryCatch(newCards.findOne());
      if (randomCard == null) {
        reject("Empty deck. Please Add More Cards to DB.");
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

  async addLiveQuestion(record) {
    const mongo = await tryCatch(MongoClient.connect(url));
    const liveQuestions = mongo.db(DB).collection('liveQuestions');
    await tryCatch(liveQuestions.insert(record));
    mongo.close();
  },

  async updateLiveQuestion(questionId, userPoints) {
    const mongo = await tryCatch(MongoClient.connect(url));
    const liveQuestions = mongo.db(DB).collection('liveQuestions');
    const { userId, points } = userPoints;
    const update = {
      $push: {
        alreadyAnswered: userId,
      }
    };

    if (points > 0)
      update.$push.cachedPoints = userPoints;

    await tryCatch(
      liveQuestions.update({questionId}, update)
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

  async addNewUser(newUser) {
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
        scoreboard.update({ userId }, {
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

  getScores(req, res) {
    getCollection(req, res, 'scoreboard');
  },

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
  }

} // module.exports


async function getCollection(req, res, collectionName) {
  const mongo = await tryCatch(MongoClient.connect(url));
  const collection = mongo.db(DB).collection(collectionName);
  const data = await tryCatch(collection.find({}).toArray());
  res.json(data);
  mongo.close();
}

function removeLiveQuestion(mongo, cardId) {
  return new Promise(async (resolve, reject) => {
    const collection = mongo.db(DB).collection('liveQuestions');
    const currentQuestion = await tryCatch(collection.findOne({cardId}));
    await tryCatch(collection.remove(currentQuestion));
    await tryCatch(addPointsToscoreboard(mongo, currentQuestion));
    resolve();
  });
}

function addPointsToscoreboard(mongo, { cachedPoints, cardId }) {
  return new Promise(async (resolve, reject) => {
    const scoreboard = mongo.db(DB).collection('scoreboard');
    const ops = [];

    for (let i = 0; i < cachedPoints.length; ++i) {
      const { userId, points } = cachedPoints[i];
      ops.push({
        updateOne : {
          "filter" : { userId },
          "update" : {
            $inc: { score: points },
            $push: {
              correctAnswers: {
                cardId,
                points
              }
            }
          }
        }
      });
    }
    if (ops.length === 0) {
      resolve();
      return;
    }

    await tryCatch(scoreboard.bulkWrite(ops));
    resolve();
  });
}
