import passport from 'Config/passport';
import authorization from 'express-authorization';
import multer from 'multer';
import DB from 'DB/ops';
import { replaceQueueCard } from 'DB/tweetQueue';
import { addAltAnswer, issueAnswerCorrection } from 'Admin/utils';

const upload = multer({ dest: 'uploads/' });
const ensureAdmin = authorization
  .ensureRequest
  .redirectTo('/admin/login')
  .isPermitted('admin');

export default (app) => {
  // if there's a flash message in the session request,
  // make it available in the response, then delete it
  app.use((req, res, next) => {
    if (req.session) {
      res.locals.flash = req.session.flash;
      delete req.session.flash;
      next();
    } else next();
  });

  // Admin Panel

  // app.get('/',
  //   redirectAdmin,
  //   (req, res) => res.render('index')
  // );

  app.get('/admin/login',
    redirectAdmin,
    (req, res) => res.render('login')
  );

  app.post('/admin/login',
    passport.authenticate('local', {
      failureRedirect: '/admin/login',
      successRedirect: '/admin'
    })
  );

  app.post('/admin/logout', (req, res) => {
    req.session.destroy(console.error);
    res.redirect('/admin/login');
  });

  app.get('/admin',
    ensureAdmin,
    serveAdminPage
  );

  app.post('/admin/deck/new',
    ensureAdmin,
    upload.single('zipfile'), (req, res) =>
      DB.addDeck(req)
        .then(() => {
          req.session.flash = {
            type: 'success',
            message: 'Deck uploaded successfully.'
          };
          res.redirect('/admin');
        })
        .catch(err => {
          req.session.flash = {
            type: 'error',
            message: err.message || 'Something went wrong. Please try again.'
          };
          res.redirect('/admin');
        })
  );

  app.post('/admin/scores/edit',
    ensureAdmin,
    DB.adjustScore
  );

  app.post('/admin/queue-card/replace',
    ensureAdmin,
    (req, res) =>
      replaceQueueCard(req)
        .then(_ => {
          req.session.flash = {
            type: 'success',
            message: `QID${req.body.cardId} successfully replaced.`
          };
          res.redirect('/admin')
        })
        .catch(err => {
          req.session.flash = {
            type: 'error',
            message: err.message || 'Something went wrong. Please try again.'
          };
          res.redirect('/admin')
        })
  );

  app.post('/admin/corrections',
    ensureAdmin,
    (req, res, next) =>
      issueAnswerCorrection(req)
        .then(_ => {
          req.session.flash = {
            type: 'success',
            message: `QID${req.body.cardId} successfully corrected.`
          };
          res.redirect('/admin');
        })
        .catch(err => {
          req.session.flash = {
            type: 'error',
            message: err.message || 'Something went wrong. Please try again.'
          };
          res.redirect('/admin');
        })
  );

  app.post('/admin/add-alt-answer',
    ensureAdmin,
    (req, res, next) =>
      addAltAnswer(req)
        .then(_ => {
          req.session.flash = {
            type: 'success',
            message: `"${req.body.altAnswer}" successfully added as an alternate answer to QID${req.body.cardId}`
          };
          res.redirect('/admin');
        })
        .catch(err => {
          req.session.flash = {
            type: 'error',
            message: err.message || 'Something went wrong. Please try again.'
          };
          res.redirect('/admin');
        })
  );
}; // export default

function redirectAdmin(req, res, next) {
  if (authorization.considerSubject(req.user).isPermitted('admin')) {
    res.redirect('/admin');
  } else next();
}

function serveAdminPage(req, res) {
  DB.getQueue().then(tweetQueue => {
    res.render('admin', {
      adminUser: true,
      queue: tweetQueue,
      flash: res.locals.flash
    })
  })
}
