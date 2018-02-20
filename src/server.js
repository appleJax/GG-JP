import express from 'express';
const app = express();
import path from 'path';
import bodyParser from 'body-parser';
import twitterBot from './twitterBot';
import route from './api';

app.set('port', (process.env.PORT || 3000));
app.use(express.static(path.resolve(__dirname, '../dist')));
app.use(bodyParser.json());

route(app);

twitterBot.start();

app.listen(app.get('port'), () =>
  console.log('Listening on port', app.get('port'))
);

export default app;
