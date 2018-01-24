const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGODB_URI;
const processUpload = require('./processAnkiJson');

module.exports = {
  getRandomCard() {
    MongoClient.connect(url, (err, mongo) => {
      const newCards = mongo.db('ankiCards').collection('newCards');
      const oldCards = mongo.db('ankiCards').collection('oldCards');
      const randomCard = newCards.findOne();

      oldCards.insert(randomCard);
      newCards.remove(randomCard);

      mongo.close();
      return randomCard;
    });
  },

  processNewScore(req, res) {
      MongoClient.connect(url, (err, mongo) => {
        const handle = req.body.handle;
        const collection = mongo.db('ankiCards').collection('leaderBoard');
        const user = collection.findOne({ handle });

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
    },

    addDeck(req, res) {
      const filePath = req.file.path;
      const newCards = processUpload(filePath);

      MongoClient.connect(url, (err, mongo) => {
        const collection = mongo.db('ankiCards').collection('newCards');

        // Initialize the Ordered Batch
        // You can use initializeUnorderedBulkOp to initialize Unordered Batch
        const batch = collection.initializeUnorderedBulkOp();

        for (let i = 0; i < newCards.length; ++i) {
          batch.insert(newCards[i]);
        }

        // Execute the operations
        batch.execute((err, result) => {
          if (err) console.error(err);
          console.log('Successfully added new card deck!!!');
          mongo.close();
        });
      });

      res.redirect('/');
    },

    getNewCards(req, res) {
      MongoClient.connect(url, (err, mongo) => {
        const collection = mongo.db('ankiCards').collection('newCards');

        collection.find({}).toArray((err, docs) => {
          res.json(docs);
          mongo.close();
          res.end();
        })
      });
    }

}
