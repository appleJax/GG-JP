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
app.use(express.static(path.resolve(__dirname, '../dist')));
app.use(bodyParser.json());

route(app);

//twitterBot.tweet();
//twitterBot.listen();

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
