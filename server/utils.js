// "{{c1::下降::x降...??}}"
// [≠ 降] [] [] [] ([?] [?])

module.exports = {

  formatExpression(expression) {
    const legend = (expression.match(/\:\:.+\:\:(.+)\}\}/) || [,])[1];
    const normalized = stripXs(groupQuestionMarks(legend));

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
      // else (negated group)
      return `[≠ ${group}]`
    }).join(' ');
  }

} // module.exports


function groupQuestionMarks(string) {
  return string.replace(/(\?+)/g, (match, p1) => `${p1.length}?`);
}

function stripXs(string) {
  return string.replace(/x/g, "");
}

function split(str) {
  return str.split(/[\(\)]/)
            .map(group =>
              /\?/.test(group)
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
