import bodyParser    from 'body-parser';

export default (app) => {

  app.post('/webhook/twitter', bodyParser.urlencoded({ verify: rawBodySaver, extended: true }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

}

export const saveRawBody = bodyParser.json({ verify: rawBodySaver });


// private

function rawBodySaver (req, res, buf, encoding) {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8');
  }
}
