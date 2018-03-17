import express     from 'express';
import bodyParser  from 'body-parser';
import path        from 'path';
import { session } from 'Config/redis';
import twitterBot  from './twitterBot';
import route       from './routes';

const app = express();

app.use(session);

app.set('port', (process.env.PORT || 3000));
app.use(express.static(path.resolve(__dirname, '../dist')));
app.use(bodyParser.json());

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

route(app);

if (process.env.NODE_ENV === 'production')
  twitterBot.start();

const PORT = app.get('port');
app.listen(PORT, () =>
  console.log('Listening on port', PORT)
);

export default app;
