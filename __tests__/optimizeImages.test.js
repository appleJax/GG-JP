const { optimizeImages } = require('../src/processAnkiJson');


test('adds alpha channel to images', () => {
  optimizeImages(__dirname + '/images').then(data => data).catch(console.error);
});
