import crypto from 'crypto';

const {
  ADMIN_PW,
  TWITTER_ACCOUNT
} = process.env;

// Normal +6 ... DST +5
const UTC_OFFSET = 5;
const ONE_WEEK = 1000 * 60 * 60 * 24 * 7;

export const HOURS = 3600000;

export function addLinkAndResults(answerText, questionId, userPoints) {
  const results = calculateReplyResults(userPoints);
  const questionLink = `Question: twitter.com/${TWITTER_ACCOUNT}/status/${questionId}`;

  const lines = answerText.split('\n');
  lines.splice(-1, 0, questionLink, results);

  return lines.join('\n');
}

export function average(newValue, oldAverage, n) {
  return Math.floor(
    (n * oldAverage + newValue) / (n + 1)
  )
}

export function calculateOneWeekAgo() {
  const now = new Date().getTime()
  return now - ONE_WEEK;
}

export function calculateReplyResults(userPoints) {
  const total = userPoints.length;
  const correct = userPoints.filter(entry => entry.points > 0).length;
  const percentCorrect = total > 0
    ? Math.round(correct / total * 100)
    : 0;

  return `正解率: ${percentCorrect}% (${correct}/${total})`;
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

export function countWrongAnswers(question) {
  return question.userPoints.filter(entry => entry.points === 0).length;
}

export function createBuffer(contents = '') {
  const buffer = Buffer.alloc(256);
  buffer.write(contents);
  return buffer;
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

export function getTimeTilUpdates() {
  return _getTimeUntil(21);
}

export function isCorrect(password) {
  const pw = createBuffer(password);
  const adminPw = createBuffer(ADMIN_PW);

  return crypto.timingSafeEqual(pw, adminPw);
}

export function parseDM(rawText) {
  const text = rawText.replace(/\s+/g, '');
  if (!text.match(/^QID/i)) return [ null, null ];

  const cardId = (text.match(/QID([0-9]+)/i) || [ null, null ])[1];
  const userAnswer = text.replace(/QID[0-9]+/i, '');
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

export function tweetLink(cardId) {
  return 'https://twitter.com' +
    `/search?q=from%3A${TWITTER_ACCOUNT}%20QID${cardId}` +
    '&ref_src=twcamp%5Eshare%7Ctwsrc%5Em5%7Ctwgr%5Eemail%7Ctwcon%5E7046%7Ctwterm%5E1';
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

  if (millisUntilTime < 0) { // already passed for today, wait until tomorrow
    millisUntilTime += 24 * HOURS;
  }

  return millisUntilTime;
}

function valid(index) {
  return index !== -1;
}
