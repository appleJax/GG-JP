const DB = require('./dbOps');
const upload = require('multer')({ dest: 'uploads/' });
const processCards = require('./processAnkiJson');

module.exports = (app) => {

  app.post('/deck/new', upload.single('zipfile'), (req, res) => {
    DB.addDeck(req, res);
  });

  app.post('/scores/edit', (req, res) => {
    DB.adjustScore(req, res);
  });

  app.get('/cards/new', (req, res) => {
    DB.getNewCards(req, res);
  });

  app.get('/cards/old', (req, res) => {
    DB.getOldCards(req, res);
  });

} // module.exports
