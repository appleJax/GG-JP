const { parseAnkiJson } = require('../server/processAnkiJson');


test('parseAnkiJson produces a new Cards in the correct format', () => {
  console.log(
    parseAnkiJson(__dirname + '/jsonFiles/mzm.json')
    .map(({altText, tweetText, answers, webLookup}) => ({altText, tweetText, answers, webLookup}))
  );
});
