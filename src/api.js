const DB = require('./dbOps');
const upload = require('multer')({ dest: 'uploads/' });

module.exports = (app) => {

  // CORS
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Max-Age', '86400'); // 24 hours
    res.header('Access-Control-Allow-Headers',
               'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  app.get('/api/scores', (req, res) => {
    DB.getScores(req, res);
  });

  app.get('/api/score/:handle', (req, res) => {
    DB.getScore(req, res);
  });

  app.get('/api/cards/old', (req, res) => {
    DB.getOldCards(req, res);
  });


  // TODO - add authentication to following endpoints

  app.post('/deck/new', upload.single('zipfile'), (req, res) => {
    DB.addDeck(req, res);
  });

  app.post('/scores/edit', (req, res) => {
    DB.adjustScore(req, res);
  });

  app.get('/cards/new', (req, res) => {
    DB.getNewCards(req, res);
  });

} // module.exports
