import routeAdminPanel from './admin';
import routeAuth  from './auth';
import routeApi   from './api';
import addWebhook from './twitter';

const { ORIGIN_URL } = process.env;

export default (app) => {

  // CORS
  app.use((req, res, next) => {
    if (req.secure) {
      res.header('Access-Control-Allow-Origin', `https://${ORIGIN_URL}`);
      res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
      res.header('Access-Control-Allow-Credentials', true);
      res.header('Access-Control-Max-Age', '86400'); // 24 hours
      res.header('Access-Control-Allow-Headers',
                'Origin, X-Requested-With, Content-Type, Accept');
      next();
    } else {
      res.redirect('https://' + req.headers.host + req.url)
    }
  });

  addWebhook(app);
  routeAuth(app);
  routeAdminPanel(app);
  routeApi(app);

};