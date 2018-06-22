import passport from 'Config/passport';

const { UI_URL } = process.env;

export default (app) => {
  app.use(passport.initialize())
  app.use(passport.session())

  // API

  app.get('/api/login', passport.authenticate('twitter'));

  app.get('/oauth_callback',
    passport.authenticate('twitter'),
    (req, res) => {
      req.session.user = req.user;
      res.redirect(UI_URL);
    }
  );

  app.get('/api/session/user', (req, res) => {
    res.json(req.session.user || null);
  });

  app.post('/api/logout', (req, res) => {
    req.session.destroy(console.error);
    res.sendStatus(200);
  });
};
