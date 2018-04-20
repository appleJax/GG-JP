import passport from 'Config/passport';
import authorization from 'express-authorization';
import DB from 'DB/ops';
import { tryCatch } from 'Utils';


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

}

function redirectAdmin(req, res, next) {
  if (authorization.considerSubject(req.user).isPermitted('admin'))
    res.redirect('/admin');
  else next();
}