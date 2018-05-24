import crypto from 'crypto';
import { createBuffer } from 'Utils';
import { processWebhookEvent } from 'Twitter/utils';

const { TWITTER_API_SECRET } = process.env;


export default (app) => {

  app.get('/webhook/twitter', (req, res) => {
    const hash = crypto
      .createHmac('sha256', TWITTER_API_SECRET)
      .update(req.query.crc_token || '')
      .digest('base64');

    res.json({ response_token: `sha256=${hash}` });
  });

  app.post('/webhook/twitter', (req, res) => {
    const isValid = validate(req);
    if (isValid) {
      console.log('Webhook req.body:', req.body)
      processWebhookEvent(req.body).then(_ =>
        res.sendStatus(200)
      );
    } else {
      res.sendStatus(403);
    }
  });

}

// private

function validate(req) {
  const twitterHash = req.header('X-Twitter-Webhooks-Signature');
  const payload = createBuffer(twitterHash);

  const hash = crypto
    .createHmac('sha256', TWITTER_API_SECRET)
    .update(JSON.stringify(req.body))
    .digest('base64');

  console.log('Twitter hash:', twitterHash);
  console.log('My hash:', hash);
  
  const expected = createBuffer(`sha256=${hash}`);

  return crypto.timingSafeEqual(payload, expected);
}