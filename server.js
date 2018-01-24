if (process.env.NODE_ENV == 'dev')
  require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const twitterBot = require('./server/twitterBot');

app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

require('./server/routes')(app);

//console.log('Processing...');
//console.log(processCards(__dirname + '/assets/mzm.json'));

//twitterBot.start();

app.listen(app.get('port'), () =>
  console.log('Listening on port', app.get('port'))
);

exports = module.exports = app;
