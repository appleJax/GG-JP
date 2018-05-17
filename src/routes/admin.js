import passport from 'Config/passport';
import authorization from 'express-authorization';
import multer from 'multer';
import DB from 'DB/ops';
import { replaceQueueCard } from 'DB/tweetQueue';
import { issueAnswerCorrection } from 'Admin/utils';
import { tryCatch } from 'Utils';

const upload = multer({ dest: 'uploads/' });


export default (app) => {

  // Admin Panel

  app.get('/',
    redirectAdmin,
    (req, res) => res.render('index')
  );

  app.get('/login',
    redirectAdmin,
    (req, res) => res.render('login')
  );

  app.post('/login',
    passport.authenticate('local', {
      failureRedirect: '/',
      successRedirect: '/admin'
    })
  );

  app.post('/logout', (req, res) => {
    req.session.destroy(console.error);
    res.redirect('/login');
  });

  app.get('/admin',
    authorization.ensureRequest.isPermitted('admin'),
    async (req, res) => {
      const tweetQueue = await tryCatch(
        DB.getQueue()
      );
      res.render('admin', { adminUser: true, queue: tweetQueue });
    }
  );

  app.post('/deck/new',
    authorization.ensureRequest.isPermitted('admin'),
    upload.single('zipfile'), (req, res) =>
      DB.addDeck(req).then(_ => res.redirect('/admin'))
  );

  app.post('/scores/edit',
    authorization.ensureRequest.isPermitted('admin'),
    DB.adjustScore
  );

  app.post('/queue-card/replace',
    authorization.ensureRequest.isPermitted('admin'),
    (req, res) => replaceQueueCard(req).then(_ => res.redirect('/admin'))
  );

  app.post('/corrections',
    authorization.ensureRequest.isPermitted('admin'),
    (req, res) => issueAnswerCorrection(req).then(_ => res.redirect('/admin'))
  );


}

function redirectAdmin(req, res, next) {
  if (authorization.considerSubject(req.user).isPermitted('admin'))
    res.redirect('/admin');
  else next();
}