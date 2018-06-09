import express       from 'express';
import serveStatic   from 'serve-static';
import mime          from 'mime-types';
import compression   from 'compression';
import path          from 'path';
import { session }   from 'Config/redis';
import { connectDB } from 'Config/mongo';
import useBodyParser from 'Config/bodyParser';
import twitterBot    from 'Twitter/bot';
import route         from './routes';

const app = express();

app.use(compression({ level: 4 }))
app.use(session);

app.set('port', (process.env.PORT || 3000));
app.set('view engine', 'pug');
app.set('views', path.resolve('dist/views'));
app.use(serveStatic(path.resolve('dist/public'), {
  maxAge: '1y',
  setHeaders: (res, path) => {
    if (noCache(path)) {
      res.setHeader('Cache-Control', 'public, max-age=0');
    }
  }
}));

useBodyParser(app);
route(app);

const PORT = app.get('port');

async function startApp() {
  await connectDB();

  app.listen(PORT, () =>
    console.log('Listening on port', PORT)
  );

  if (process.env.NODE_ENV !== 'dev') {
    twitterBot.start();
  }
}

startApp();

export default app;

// private

function noCache(path) {
  const mimeType = mime.lookup(path);
  return mimeType === 'text/html' ||
    mimeType === 'text/css' ||
    mimeType === 'application/json';
}
