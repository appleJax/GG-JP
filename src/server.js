import express       from 'express';
import bodyParser    from 'body-parser';
import path          from 'path';
import { session }   from 'Config/redis';
import { connectDB } from 'Config/mongo';
import twitterBot    from 'Twitter/bot';
import route         from './routes';

const app = express();

app.use(session);

app.set('port', (process.env.PORT || 3000));
app.set('view engine', 'pug');
app.set('views', path.resolve('dist/views'));
app.use(express.static(path.resolve('dist/public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

route(app);

// twitterBot.tweet();

if (process.env.NODE_ENV === 'production')
  twitterBot.start();

const PORT = app.get('port');

async function startApp() {
  await connectDB();
  app.listen(PORT, () =>
    console.log('Listening on port', PORT)
  );
}

startApp();

export default app;
