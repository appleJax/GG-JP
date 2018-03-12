import express    from 'express';
import bodyParser from 'body-parser';
import path       from 'path';
import session    from 'express-session';
import twitterBot from './twitterBot';
import auth       from './auth';
import route      from './api';

const { SESSION_SECRET } = process.env
const app = express();

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
    // cookie: { maxAge: 604800000 } // one week
  })
);

app.set('port', (process.env.PORT || 3000));
app.use(express.static(path.resolve(__dirname, '../dist')));
app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
  let protocol = 'http';
  if (req.secure) protocol += 's';
  res.header('Access-Control-Allow-Origin', `${protocol}://${UI_URL}`);
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Vary', 'Origin');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Max-Age', '86400'); // 24 hours
  res.header('Access-Control-Allow-Headers',
             'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

auth(app);
route(app);

if (process.env.NODE_ENV === 'production')
  twitterBot.start();

const PORT = app.get('port');
app.listen(PORT, () =>
  console.log('Listening on port', PORT)
);

export default app;
