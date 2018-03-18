import crypto from 'crypto';

const { TWITTER_TOKEN_SECRET } = process.env;


export default (app) => {

  app.get('/webhook/twitter', (req, res) => {
    console.log('params', req.params);
    const hmac = crypto.createHmac('sha256', TWITTER_TOKEN_SECRET);
    hmac.update(req.params.crc_token || '');
    const hash = hmac.digest('base64');
    console.log('response', hash)
    res.json({ response_token: `sha256=${hash}` });
  });

  app.post('/webhook/twitter', (req, res) => {
    const twitterHash = req.header('x-twitter-webhooks-signature');
    console.log('twitterHash:', twitterHash);
    console.log('req.body:', req.body)
  });

}
