import express    from 'express';
import bodyParser from 'body-parser';
import path       from 'path';
import twitterBot from './twitterBot';
import route      from './api';

const app = express();

app.set('port', (process.env.PORT || 3000));
app.use(express.static(path.resolve(__dirname, '../dist')));
app.use(bodyParser.json());

route(app);

//twitterBot.start();

const PORT = app.get('port');
app.listen(PORT, () =>
  console.log('Listening on port', PORT)
);

export default app;
