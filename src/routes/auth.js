import passport from 'Config/passport';


export default (app) => {

  app.use(passport.initialize())
  app.use(passport.session())

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
    req.session.destroy(console.error);
  });

}
