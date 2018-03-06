import DB                      from './dbOps';
import multer                  from 'multer';
import { getTimeTilNextTweet } from 'Utils';

const upload = multer({ dest: 'uploads/' });

export default (app) => {

  // CORS
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Max-Age', '86400'); // 24 hours
    res.header('Access-Control-Allow-Headers',
               'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });


  app.get('/api/cards/earned', DB.getEarnedCards);

  app.get('/api/cards/old',    DB.getOldCards);

  app.get('/api/countdown',    (req, res) =>
    res.json({ millis: getTimeTilNextTweet() })
  );

  app.get('/api/decks',        DB.getDeckTitles);

  app.get('/api/deck/:slug',   DB.getDeck);

  app.get('/api/live',         DB.serveLiveQuestions);

  app.get('/api/recent',       DB.serveRecentAnswers);

  app.get('/api/scores',       DB.getScores);

  app.post('/api/users/new',   DB.createUser);

  app.get('/api/user/:userId', DB.getUser);

  app.get('/api/userStats',    DB.getUserStats);


  // TODO - add authentication to following endpoints

  app.post('/deck/new',
    upload.single('zipfile'),
    DB.addDeck
  );

  app.post('/scores/edit', DB.adjustScore);

  app.get('/cards/new',    DB.getNewCards);

}
