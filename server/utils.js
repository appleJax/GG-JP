// "{{c1::下降::x(降,下).降.??}}"
// [≠ 降,下] [] 降 [] ([?] [?])
const urlencode = require('urlencode');
const WEBLOOKUP_URL = 'https://ejje.weblio.jp/content/';

module.exports = {

  formatQuestionAltText(expression) {
    const hint = formatHint(expression);
    const [min, max] = minMaxChars(hint);
    const minMax = min === max ? min : `${min} to ${max}`;
    const char_s = max > 1 ? 'characters' : 'character';
    const screenReaderHint = `(${minMax} ${char_s})`;
    return expression.replace(/\{\{.+?\}\}/g, screenReaderHint);
  },

  formatQuestionText(expression, engMeaning, notes, cardID) {
    const hint = formatHint(expression);
    const [min, max] = minMaxChars(hint);
    const minMax = min === max ? min : `${min}-${max}`;
    let tweetText = `What ${minMax} character answer means "${engMeaning}"?`;
    if (needsHint(hint))
      tweetText += `\nHint: ${hint}`;

    if (notes.length > 0)
      tweetText += `\nNotes: ${notes}`;

    tweetText += `\nQID${cardID}`;
    return tweetText;
  },

  formatAnswerAltText(expression) {
    return expression.replace(/\{\{.*?\:\:(.+?)\:\:.*?\}\}/g, '$1');
  },

  formatAnswerText(answers, webLookup, cardId) {
    const answer_s = answers.length > 1 ? 'Answers' : 'Answer';
    let answerText = `${answer_s}: ${answers.join(', ')}`;
    answerText += '\nDefinition: ' + WEBLOOKUP_URL + urlencode(webLookup);
    answerText += `\nQID${cardId}`;
    return answerText;
  },

  getAnswers(expression, altAnswers) {
    const acceptedAnswer = expression.match(/\:\:(.+?)\:\:/)[1];
    let otherAnswers = [];
    if (altAnswers && altAnswers.length > 0)
      otherAnswers = altAnswers.split(',');

    return [acceptedAnswer].concat(otherAnswers);
  },

  tryCatch(promise) {
   return promise
     .then(data => data)
     .catch(err => {
       console.error('Error:',err);
       return {};
     });
  }

} // module.exports


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
