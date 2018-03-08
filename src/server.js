import express    from 'express';
import bodyParser from 'body-parser';
import path       from 'path';
import session    from 'express-session'
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
  })
)

app.set('port', (process.env.PORT || 3000));
app.use(express.static(path.resolve(__dirname, '../dist')));
app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', UI_URL);
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Max-Age', '86400'); // 24 hours
  res.header('Access-Control-Allow-Headers',
             'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

auth(app);
route(app);

//twitterBot.start();

const PORT = app.get('port');
app.listen(PORT, () =>
  console.log('Listening on port', PORT)
);

export default app;
