import DB                      from './dbOps';
import multer                  from 'multer';
import { getTimeTilNextTweet } from 'Utils';

const upload = multer({ dest: 'uploads/' });

export default (app) => {

  app.get('/api/cards/earned',    DB.getEarnedCards);

  app.get('/api/cards/old',       DB.getOldCards);

  app.get('/api/decks',           DB.getDeckTitles);

  app.get('/api/deck/:slug',      DB.getDeck);

  app.get('/api/live',            DB.serveLiveQuestions);

  app.get('/api/recent',          DB.serveRecentAnswers);

  app.get('/api/scores',          DB.getScores);

  app.get('/api/userStats',       DB.getUserStats);

  app.get('/api/countdown', (req, res) =>
    res.json({ millis: getTimeTilNextTweet() })
  );


  // TODO - add authentication to following endpoints

  app.post('/deck/new',
    upload.single('zipfile'),
    DB.addDeck
  );

  app.post('/scores/edit', DB.adjustScore);

  app.get('/cards/new',    DB.getNewCards);

}
