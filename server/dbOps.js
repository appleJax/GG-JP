const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGODB_URI;
const unzip = require('unzip');
const processUpload = require('./processAnkiJson');

module.exports = {
  getRandomCard() {
    MongoClient.connect(url, (err, db) => {
      const newCards = db.collection('newCards');
      const oldCards = db.collection('oldCards');
      const randomCard = newCards.findOne();

      oldCards.insert(randomCard);
      newCards.remove(randomCard);

      db.close();
      return randomCard;
    });
  },

  processNewScore(req, res) {
      MongoClient.connect(url, (err, db) => {
        const handle = req.body.handle;
        const collection = db.collection('leaderBoard');
        const user = collection.findOne({ handle });

        if (user) {
          const newScore = user.score + 1;
          collection.update({ handle }, newScore, (err, result) => {
            if (err) console.error(err);
            db.close();
            res.end();
          });
        } else {
          collection.insert({ handle, score: 1 }, (err, result) => {
            if (err) console.error(err);
            db.close();
            res.end();
          });
        }
      });
    },

    addDeck(req, res) {
      const filePath = req.file.path;
      const newCards = processUpload(filePath);

      Mongoclient.connect(url, (err, db) => {
        const collection = db.collection('newCards');

        // Initialize the Ordered Batch
        // You can use initializeUnorderedBulkOp to initialize Unordered Batch
        const batch = collection.initializeUnorderedBulkOp();

        for (let i = 0; i < newCards.length; ++i) {
          batch.insert(newCard[i]);
        }

        // Execute the operations
        batch.execute((err, result) => {
          if (err) console.error(err);
          console.log('Successfully added new card deck!!!');
          db.close();
        });
      });

      res.redirect('/');
    }

}
