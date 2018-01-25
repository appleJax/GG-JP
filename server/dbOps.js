const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGODB_URI;
const DB = process.env.MONGO_DB;
const { processUpload } = require('./processAnkiJson');

module.exports = {
  getRandomQuestion() {
    return new Promise((resolve, reject) => {
      MongoClient.connect(url, (err, mongo) => {
        const newCards = mongo.db(DB).collection('newCards');
        const oldCards = mongo.db(DB).collection('oldCards');
        newCards.findOne({}, (err, randomCard) => {
          oldCards.insert(randomCard, (err, res) => {
            if (err) console.error(err);
            newCards.remove(randomCard, (err, res) => {
              if (err) console.error(err);
              mongo.close();
              resolve(randomCard);
            });
          });
        });
      });
    });
  },

  getCardAnswer(cardId) {
    return new Promise((resolve, reject) => {
      MongoClient.connect(url, (err, mongo) => {
        const oldCards = mongo.db(DB).collection('oldCards');
        oldCards.findOne({ cardId }, (err, answerCard) => {
          mongo.close();
          resolve(answerCard);
        });
      });
    });
  },

  processNewScore(req, res) {
      MongoClient.connect(url, (err, mongo) => {
        const handle = req.body.handle;
        const collection = mongo.db(DB).collection('leaderBoard');
        const user = collection.findOne({ handle }, (err, user) => {
          if (user) {
            const newScore = user.score + 1;
            collection.update({ handle }, newScore, (err, result) => {
              if (err) console.error(err);
              mongo.close();
              res.end();
            });
          } else {
            collection.insert({ handle, score: 1 }, (err, result) => {
              if (err) console.error(err);
              mongo.close();
              res.end();
            });
          }
        });
      });
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
