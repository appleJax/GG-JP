import express       from 'express';
import path          from 'path';
import { session }   from 'Config/redis';
import { connectDB } from 'Config/mongo';
import useBodyParser from 'Config/bodyParser';
import twitterBot    from 'Twitter/bot';
import route         from './routes';

const app = express();

app.use(session);

app.set('port', (process.env.PORT || 3000));
app.set('view engine', 'pug');
app.set('views', path.resolve('dist/views'));
app.use(express.static(path.resolve('dist/public')));

useBodyParser(app);
route(app);

const PORT = app.get('port');

async function startApp() {
  await connectDB();

  app.listen(PORT, () =>
    console.log('Listening on port', PORT)
  );

  if (process.env.NODE_ENV !== 'dev') {
    twitterBot.start();
  }
}

twitterBot.test();

startApp();

export default app;