import routeAdminPanel from './admin';
import routeAuth  from './auth';
import routeApi   from './api';
import addWebhook from './twitter';


export default (app) => {

  // CORS
  app.use((req, res, next) => {
    const protocol = ((req.get('Origin') || '').match(/^[a-z]+:\/\//i) || [])[0];
    res.header('Access-Control-Allow-Origin', `${protocol || 'https://'}${ORIGIN_URL}`); // ORIGIN_URL defined in webpack
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Max-Age', '86400'); // 24 hours
    res.header('Access-Control-Allow-Headers',
               'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  addWebhook(app);
  routeAuth(app);
  routeAdminPanel(app);
  routeApi(app);

};