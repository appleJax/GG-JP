if (process.env.NODE_ENV == 'dev')
  require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const twitterBot = require('./twitterBot');

app.set('port', (process.env.PORT || 3000));
app.use(express.static(path.resolve(__dirname, '../dist')));
app.use(bodyParser.json());

require('./api')(app);

twitterBot.start();

app.listen(app.get('port'), () =>
  console.log('Listening on port', app.get('port'))
);

exports = module.exports = app;
