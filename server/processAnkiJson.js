const fs = require('fs');

function processJson(pathToJsonFile) {
  const contents = JSON.parse(fs.readFileSync(pathToJsonFile, 'utf8'));
  return contents.notes.map(card => {
    let [
      expression,
      reading,
      japMeaning,
      engMeaning,
      officialEng,
      questionImg,
      answerImg,
      , // blank field
      prevLineImg,
      notes,
      noteID
    ] = card.fields;

    return {
      expression:  addBlank(stripTags(expression)),
      reading:     stripTags(reading),
      japMeaning:  stripTags(japMeaning),
      engMeaning:  stripTags(engMeaning),
      officialEng: stripTags(officialEng),
      questionImg: getBase64(questionImg),
      answerImg:   getBase64(answerImg),
      prevLineImg: getBase64(prevLineImg),
      notes:       stripTags(notes),
      noteID
    };
  });
}

function stripTags(string) {
  return string.replace(/<.*?>/g, '');
}

function addBlank(string) {
  return string.replace(/\{\{.*\}\}/, '...');
}

function getSrc(string) {
  return (string.match(/src="(.+)"/) || [,])[1];
}

function getBase64(string) {
  let base64 = null;
  try {
    base64 = fs.readFileSync(
      `assets/media/${getSrc(string)}`,
      { encoding: 'base64' }
    );
  } catch (e) {
    // returning null...
  }
  return base64;
}

module.exports = processJson;
