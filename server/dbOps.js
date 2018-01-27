const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGODB_URI;
const DB = process.env.MONGO_DB;
const { processUpload } = require('./processAnkiJson');
const { tryCatch } = require('./utils');

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
      mongo.close();
      resolve(randomCard);
    });
  },

  getAnswer(cardId) {
    return new Promise(async (resolve, reject) => {
      const mongo = await tryCatch(MongoClient.connect(url));
      const oldCards = mongo.db(DB).collection('oldCards');
      const answerCard = await tryCatch(oldCards.findOne({ cardId }));
      const liveQuestions = mongo.db(DB).collection('liveQuestions');
      await tryCatch(liveQuestions.remove({ cardId }));
      mongo.close();
      resolve(answerCard);
    });
  },

  async addToLiveQuestions(record) {
    const mongo = await tryCatch(MongoClient.connect(url));
    const liveQuestions = mongo.db(DB).collection('liveQuestions');
    await tryCatch(liveQuestions.insert(record));
    mongo.close();
  },

  getLiveQuestions() {
    return new Promise(async (resolve, reject) => {
      const mongo = await tryCatch(MongoClient.connect(url));
      const collection = mongo.db(DB).collection('liveQuestions');
      const liveQuestions = await tryCatch(collection.find().toArray());
      resolve(liveQuestions);
    });
  },

  async postNewScore({
    userId,
    name,
    handle,
    avatar,
    created_at,
    questionId,
    answer,
    points
  }) {
    const mongo = await tryCatch(MongoClient.connect(url));
    const scoreBoard = mongo.db(DB).collection('scoreBoard');
    const user = await tryCatch(scoreBoard.findOne({ userId }));
    if (user != null) { // update score
      const newScore = user.score + 1;
      await tryCatch(scoreBoard.update({ userId }, updatedRecord));

    } else { // create new user record
      // TODO create new user record
      await tryCatch(scoreBoard.insert({ userId, score: 1 });
    }
    mongo.close();
  },

  adjustScore(req, res) {
    // TODO adjust a score manually
  },

  getScoreBoard() {
    // TODO return scores collection
  },

  addDeck(req, res) {
    const filePath = req.file.path;
    processUpload(filePath).then(newCards => {
      MongoClient.connect(url, (err, mongo) => {
        const collection = mongo.db(DB).collection('newCards');

        // Initialize the Ordered Batch
        // You can use initializeUnorderedBulkOp to initialize Unordered Batch
        const batch = collection.initializeUnorderedBulkOp();

        for (let i = 0; i < newCards.length; ++i) {
          batch.insert(newCards[i]);
        }

        // Execute the operations
        batch.execute((err, result) => {
          if (err) console.error(err);
          mongo.close();
        });
      });

      res.redirect('/');
    });
  },

  getNewCards(req, res) {
    MongoClient.connect(url, (err, mongo) => {
      const collection = mongo.db(DB).collection('newCards');

      collection.find({}).toArray((err, docs) => {
        res.json(docs);
        mongo.close();
        res.end();
      })
    });
  },

  getOldCards(req, res) {
    MongoClient.connect(url, (err, mongo) => {
      const collection = mongo.db(DB).collection('oldCards');

      collection.find({}).toArray((err, docs) => {
        res.json(docs);
        mongo.close();
        res.end();
      })
    });
  }

}
