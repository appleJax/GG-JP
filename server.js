if (process.env.NODE_ENV == 'dev')
  require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const twitterBot = require('./src/server/twitterBot');

app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + '/dist'));
app.use(bodyParser.json());

require('./src/server/routes')(app);

twitterBot.start();

app.listen(app.get('port'), () =>
  console.log('Listening on port', app.get('port'))
);

exports = module.exports = app;
