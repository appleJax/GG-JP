require('dotenv').config()

const express = require('express');
const app = express();
const twitterBot = require('./server/twitterBot')


app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname + '/public'));

twitterBot.start();

app.listen(app.get('port'), () =>
  console.log('Listening on port', app.get('port'))
);

exports = module.exports = app;
