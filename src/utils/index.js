import urlencode from 'urlencode';
const WEBLOOKUP_URL = 'https://ejje.weblio.jp/content/';
const { TWITTER_ACCOUNT, LEADERBOARD } = process.env;

export const HOURS = 3600000;

export function addLinks(answerText, questionId) {
  const questionLink = `Question: twitter.com/${TWITTER_ACCOUNT}/status/${questionId}`;
  const lines = answerText.split('\n');
  lines.splice(-1, 0, questionLink);
  lines.splice(-1, 0, `Leaderboard: ${LEADERBOARD}`);
  return lines.join('\n');
}

export function average(newValue, oldAverage, n) {
  return Math.floor(
    (n*oldAverage + newValue) / (n + 1)
  )
}

export function calculateNewStats(
  { score,
    average: {
      n,
      value: oldAverage
    }
  },
  addRank
) {

  const newStats = {
    attempts: 0,
    correct: 0,
    totalPossible: 0,
    score: 0,
    avgTimeToAnswer: 0,
    average: {
      n: n + 1,
      value: average(score, oldAverage, n)
    }
  };

  if (addRank) newStats.rank = 0;

  return newStats;
}

export function calculateScore(replyPostedAt, { questionPostedAt }) {
  const timeToAnswer = Math.floor(
    (replyPostedAt - questionPostedAt) / HOURS
  );
  const score = 24 - timeToAnswer;

  return Math.max(score, 0);
}

export function calculateTimeToAnswer(replyPostedAt, { questionPostedAt }) {
  return Math.floor(
    (replyPostedAt - questionPostedAt) / 1000
  )
}

export function contains(item, list) {
  return valid(list.indexOf(item));
}

export function extractAnswer(text) {
  return text.trim().slice(TWITTER_ACCOUNT.length + 2);
}

export function formatAnswerAltText(expression) {
  return expression.replace(/\{\{.*?\:\:(.+?)\:\:.*?\}\}/g, '$1');
}

export function formatAnswerText(answers, cardId, engMeaning, webLookup) {
  const s = answers.length > 1 ? 's' : '';
  let answerText = `Answer${s}: ${answers.join(', ')}`;
  answerText += `\nEnglish: "${engMeaning}"`;

  if (webLookup)
    answerText += '\nLookup: ' + WEBLOOKUP_URL + urlencode(webLookup);

  answerText += `\nQID${cardId}`;
  return answerText;
}

export function formatQuestionAltText(expression) {
  const hint = formatHint(expression);
  const [min, max] = minMaxChars(hint);
  const minMax = min === max ? min : `${min} to ${max}`;
  const s = max > 1 ? 's' : '';
  const screenReaderHint = `(${minMax} character${s})`;
  return expression.replace(/\{\{.+?\}\}/g, screenReaderHint);
}

export function formatQuestionText(
  cardID,
  engMeaning,
  expression,
  game,
  notes
) {

  const hint = formatHint(expression);
  const [min, max] = minMaxChars(hint);
  const minMax = min === max ? min : `${min}-${max}`;
  let tweetText = `What ${minMax} character answer means "${engMeaning}"?`;
  if (needsHint(hint))
    tweetText += `\nHint: ${hint}`;

  if (notes) tweetText += `\nNotes: ${notes}`;

  tweetText += `\nGame: ${game.replace(/\s(ENG|JP)$/, '')}`;
  tweetText += `\nQID${cardID}`;
  return tweetText;
}

export function formatFlashCards(cards) {
  return cards.map(card => {
    card.questionText = card.questionText.split('\n')[0];
    const s = card.answers.length > 1 ? 's' : '';
    card.answers = `Answer${s}: ${card.answers.join(', ')}`;
    card.mediaUrl = (card.mediaUrls.length === 3)
      ? card.mediaUrls[1]
      : card.mediaUrls[0];

    delete card.mediaUrls;
    return card;
  });
}

export function getAnswers(expression, altAnswers) {
  const acceptedAnswer = expression.match(/\:\:(.+?)\:\:/)[1];
  let otherAnswers = [];
  if (altAnswers && altAnswers.length > 0)
    otherAnswers = altAnswers.split(',');

  return [acceptedAnswer].concat(otherAnswers);
}

export const getLiveAnswers = (cards) =>
  cards.reduce(
    (allAnswers, card) =>
      allAnswers.concat(card.answers)
  , []);

export const getQuestionSpoilerText = (cards) =>
  cards.reduce(
    (allText, card) =>
      allText + ' ' + [
        card.prevLineAltText,
        card.questionAltText,
        card.answerAltText,
        card.otherVisibleContext
      ].join(' ')
  , '');

export const getSpoilerText = (cards) =>
  cards.reduce(
    (allText, card) =>
      allText + ' ' + [
      card.answers,
      card.mediaUrls.map(obj => obj.altText),
      card.otherVisibleContext
    ].join(' ')
  , '');

export function getTimeTilNextTweet() {
  const startTimes = [ 2, 8, 14, 20 ].map(_getTimeUntil);
  return Math.min(...startTimes);
}

export const getTimeUntil = (hour) => _getTimeUntil(hour)

export function isSpoiled(questionCard, spoilerText, liveAnswers) {
  const questionSpoilerText = getQuestionSpoilerText([ questionCard ]);
  const existingSpoilers = questionCard.answers.some(
    answer => spoilerText.includes(answer)
  );
  const willSpoil = liveAnswers.some(
    answer => questionSpoilerText.includes(answer)
  );

  return existingSpoilers || willSpoil;
}

export function tryCatch(promise) {
 return promise
   .then(data => data)
   .catch(err => {
     console.error('Error:',err);
     return {};
   });
}


// private functions

function flatten(deep, flat = []) {
  if (deep.length === 0)
    return flat;

  let [head, ...tail] = deep;
  return scalar(head)
    ? flatten(tail, flat.concat(head))
    : flatten(tail, flat.concat(flatten(head)));
}

function formatHint(expression) {
  const legend = expression.match(/\:\:.+?\:\:(.+?)\}\}/)[1];
  const normalized = groupMultiXs(groupXs(groupQuestionMarks(legend)));

  return flatten(split(normalized)).map(group => {
    if (group === '.')
      return '[_]';

    if (group === '-')
      return '[_] [_] [_] [_] [_]'

    if (/\?/.test(group)) {
      const result = [];
      const numChars = Number(group.match(/\d+/)[0])
      for (let i = 0; i < numChars; i++)
        result.push('[?]')

      if (result.length === 1)
        return '[?]';

      return '(' + result.join(' ') + ')'
    }

    if (/[≠x]/.test(group)) {
      const negatedChars = group.replace(/[≠x]/g, '');
      return `[≠${negatedChars}]`
    }
    // else (character gimme)
    return group;
  }).join(' ');
}

function _getTimeUntil(hour) {
  // UTC offset +6 ... DST +5
  const offset = 5;

  const now = new Date();
  hour = (hour + offset) % 24;
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

function groupMultiXs(string) {
  return string.replace(/[≠x]\((.*?)\)/g, '(≠$1)')
}

function groupQuestionMarks(string) {
  return string.replace(/(\?+)/g, (match, p1) => `(${p1.length}?)`);
}

function groupXs(string) {
  return string.replace(/[≠x][^(]/g, '($&)');
}

function maxChars(hint) {
  return hint.match(/([^\s]+)/g).length;
}

function minChars(hint) {
  const optionalChars = (hint.match(/\?/g) || []).length;
  return maxChars(hint) - optionalChars;
}

function minMaxChars(hint) {
  return [minChars(hint), maxChars(hint)];
}

function needsHint(hint) {
  return hint.replace(/\[_\]/g, '').trim().length !== 0;
}

function split(str) {
  return str.split(/[\(\)]/)
            .map(group =>
              /\?|≠|x/.test(group)
              ? group
              : group.split('')
            );
}

function scalar(v) {
  return !Array.isArray(v);
}

function valid(index) {
  return index !== -1;
}
