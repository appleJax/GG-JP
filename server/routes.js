const DB = require('./dbOps');
const upload = multer({ dest: 'uploads/' });
const processCards = require('./server/processAnkiJson');

module.exports = (app) => {

  app.post('/deck/new', upload.single('zipfile'), (req, res) => {
    DB.addDeck(req, res);
  });

  app.post('/newscore', (req, res) => {
    DB.processNewScore(req, res);
  });

} // module.exports
