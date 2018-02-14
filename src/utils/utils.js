const urlencode = require('urlencode');
const WEBLOOKUP_URL = 'https://ejje.weblio.jp/content/';
const { TWITTER_ACCOUNT } = process.env;

const HOURS = 3600000;

module.exports = {

  HOURS,

  formatQuestionAltText(expression) {
    const hint = formatHint(expression);
    const [min, max] = minMaxChars(hint);
    const minMax = min === max ? min : `${min} to ${max}`;
    const s = max > 1 ? 's' : '';
    const screenReaderHint = `(${minMax} character${s})`;
    return expression.replace(/\{\{.+?\}\}/g, screenReaderHint);
  },

  formatQuestionText(expression, engMeaning, notes, cardID) {
    const hint = formatHint(expression);
    const [min, max] = minMaxChars(hint);
    const minMax = min === max ? min : `${min}-${max}`;
    let tweetText = `What ${minMax} character answer means "${engMeaning}"?`;
    if (needsHint(hint))
      tweetText += `\nHint: ${hint}`;

    if (notes) tweetText += `\nNotes: ${notes}`;

    tweetText += `\nQID${cardID}`;
    return tweetText;
  },

  formatAnswerAltText(expression) {
    return expression.replace(/\{\{.*?\:\:(.+?)\:\:.*?\}\}/g, '$1');
  },

  formatAnswerText(answers, engMeaning, webLookup, cardId) {
    const s = answers.length > 1 ? 's' : '';
    let answerText = `Answer${s}: ${answers.join(', ')}`;
    answerText += `\nEnglish Meaning: "${engMeaning}"`;
    answerText += '\nDefinition: ' + WEBLOOKUP_URL + urlencode(webLookup);
    answerText += `\nQID${cardId}`;
    return answerText;
  },

  addQuestionLink(answerText, questionId) {
    const questionLink = `Question: twitter.com/${TWITTER_ACCOUNT}/status/${questionId}`;
    const lines = answerText.split('\n');
    lines.splice(-1, 0, questionLink);
    return lines.join('\n');
  },

  getAnswers(expression, altAnswers) {
    const acceptedAnswer = expression.match(/\:\:(.+?)\:\:/)[1];
    let otherAnswers = [];
    if (altAnswers && altAnswers.length > 0)
      otherAnswers = altAnswers.split(',');

    return [acceptedAnswer].concat(otherAnswers);
  },

  calculateScore(answerPostedAt, {questionPostedAt, alreadyAnswered}) {
    const timeToAnswer = Math.floor(
      (new Date(answerPostedAt) - new Date(questionPostedAt)) / HOURS
    );
    const score = 24 - timeToAnswer;

    return Math.max(score, 0);
  },

  extractAnswer(text) {
    return text.trim().slice(TWITTER_ACCOUNT.length + 2);
  },

  calculateNewStats({
    score,
    average: {
      n,
      value: oldAverage
    }
  }) {

    const newAverage = Math.floor(
      (n*oldAverage + score) / (n + 1)
    );

    return {
      score: 0,
      attempts: 0,
      correct: 0,
      average: {
        n: n + 1,
        value: newAverage
      }
    };
  },

  getTimeUntil(hour) {
    // https://stackoverflow.com/questions/4455282/call-a-javascript-function-at-a-specific-time-of-day
    const now = new Date();
    let millisUntilTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hour, 0, 0, 0) - now;

    if (millisUntilTime < 0) // already passed for today, wait until tomorrow
      millisUntilTime += 24*HOURS;

    return millisUntilTime;
  },

  tryCatch(promise) {
   return promise
     .then(data => data)
     .catch(err => {
       console.error('Error:',err);
       return {};
     });
  },

  contains(item, list) {
    return valid(list.indexOf(item));
  }

} // module.exports


function valid(index) {
  return index !== -1;
}

function needsHint(hint) {
  return hint.replace(/\[\]/g, '').trim().length !== 0;
}

function maxChars(hint) {
  const missingCharRegex = /\[.*?\]/g;
  const missingChars = (hint.match(missingCharRegex) || []).length
  const gimmeChars = hint.replace(missingCharRegex, '').replace(/[\s+\(\)]/g, '').length;

  return missingChars + gimmeChars;
}

function minChars(hint) {
  const optionalChars = (hint.match(/\?/g) || []).length
  return maxChars(hint) - optionalChars;
}

function minMaxChars(hint) {
  return [minChars(hint), maxChars(hint)];
}

function formatHint(expression) {
  const legend = expression.match(/\:\:.+?\:\:(.+?)\}\}/)[1];
  const normalized = groupMultiXs(groupXs(groupQuestionMarks(legend)));

  return flatten(split(normalized)).map(group => {
    if (group === '.')
      return '[]';

    if (group === '-')
      return '[] [] [] [] []'

    if (/\?/.test(group)) {
      const result = [];
      const numChars = Number(group.match(/\d+/)[0])
      for (let i = 0; i < numChars; i++)
        result.push('[?]')

      if (result.length === 1)
        return '[?]';

      return '(' + result.join(' ') + ')'
    }

    if (/≠/.test(group)) {
      const negatedChars = group.replace(/≠/g, '');
      return `[≠${negatedChars}]`
    }
    // else (character gimme)
    return group;
  }).join(' ');
}

function groupQuestionMarks(string) {
  return string.replace(/(\?+)/g, (match, p1) => `(${p1.length}?)`);
}

function groupXs(string) {
  return string.replace(/≠[^(]/g, '($&)');
}

function groupMultiXs(string) {
  return string.replace(/≠\((.*)\)/g, '(≠$1)')
}

function split(str) {
  return str.split(/[\(\)]/)
            .map(group =>
              /\?|≠/.test(group)
              ? group
              : group.split('')
            );
}

function scalar(v) {
  return !Array.isArray(v);
}

function flatten(deep, flat = []) {
  if (deep.length === 0)
    return flat;

  let [head, ...tail] = deep;
  return scalar(head)
    ? flatten(tail, flat.concat(head))
    : flatten(tail, flat.concat(flatten(head)));
}
