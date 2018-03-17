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

route(app);

if (process.env.NODE_ENV === 'production')
  twitterBot.start();

const PORT = app.get('port');
app.listen(PORT, () =>
  console.log('Listening on port', PORT)
);

export default app;
