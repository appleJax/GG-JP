import urlencode from 'urlencode';
import crypto from 'crypto';

const {
  ADMIN_PW,
  APP_URL,
  DM_URL,
  TWITTER_ACCOUNT
} = process.env;

const WEBLOOKUP_URL = 'https://ejje.weblio.jp/content/';

// Normal +6 ... DST +5
const UTC_OFFSET = 5;


export const HOURS = 3600000;

export function addLink(answerText, questionId) {
  const questionLink = `Question: twitter.com/${TWITTER_ACCOUNT}/status/${questionId}`;
  const lines = answerText.split('\n');
  lines.splice(-1, 0, questionLink);
  return lines.join('\n');
}

export function average(newValue, oldAverage, n) {
  return Math.floor(
    (n*oldAverage + newValue) / (n + 1)
  )
}

export function calculateScore(replyPostedAt, { questionPostedAt }) {
  const timeToAnswer = Math.floor(
    (replyPostedAt - questionPostedAt) / HOURS
  );
  const deduction = Math.max(timeToAnswer, 0);
  const score = 24 - deduction;

  return Math.max(score, 0);
}

export function calculateTimeToAnswer(replyPostedAt, { questionPostedAt }) {
  const timeToAnswer = Math.floor(
    (replyPostedAt - questionPostedAt) / 1000
  );
  return Math.max(timeToAnswer, 1);
}

export function contains(item, list) {
  return valid(list.indexOf(item));
}

export function formatFlashCards(cards) {
  return cards.map(card => {
    const lines = card.questionText.split('\n');
    card.questionText = lines[0];
    if (lines[1] && lines[1].startsWith('Hint')) {
      card.questionText += '\n' + lines[1];
    }
    card.questionMediaUrls = card.mediaUrls.slice(...card.mainImageSlice);
    card.answerMediaUrls = card.mediaUrls.slice(card.mainImageSlice[1]);
    return card;
  });
}

export function getHour() {
  let utcHours = new Date().getUTCHours() - UTC_OFFSET;
  if (utcHours < 0) {
    utcHours += 24
  }
  return utcHours
}

export function getTimeTilNextTweet() {
  const startTimes = [ 2, 8, 14, 20 ].map(_getTimeUntil);
  return Math.min(...startTimes);
}

export const getTimeUntil = (hour) => _getTimeUntil(hour)

export function isCorrect(password) {
  const pw = new Buffer(256);
  pw.write(password);

  const adminPw = new Buffer(256);
  adminPw.write(ADMIN_PW);

  return crypto.timingSafeEqual(pw, adminPw);
}

export function parseDM(rawText) {
  const text = rawText.replace(/\s+/g, '');
  const cardId = (text.match(/QID([0-9]+)/i) || [,'notFound'])[1];
  const userAnswer = text.replace(/QID[0-9]+/i, '')
                         
  return [ cardId, userAnswer ];
}

export const send = (res) =>
  (data) => res.json(data);

export function t(type, defaultVal) {
  return {
    type,
    default: defaultVal
  };
}

export function tryCatch(promise) {
 return promise
   .then(data => data)
   .catch(err => {
     console.error('Error:', err);
     return {};
   });
}


// private functions

function _getTimeUntil(hour) {
  const now = new Date();
  hour = (hour + UTC_OFFSET) % 24;
  const utcNow = now.getTime();
  let millisUntilTime = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    hour, 0, 0, 0) - utcNow;

  if (millisUntilTime < 0) // already passed for today, wait until tomorrow
    millisUntilTime += 24*HOURS;

  return millisUntilTime;
}

function valid(index) {
  return index !== -1;
}
