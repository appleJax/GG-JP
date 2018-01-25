const fs = require('fs');
const path = require('path');
const unzip = require('unzip-stream');
const UPLOADS_PATH = path.resolve(__dirname, '../uploads');
const {
  formatQuestionAltText,
  formatQuestionText,
  formatAnswerAltText,
  formatAnswerText,
  getAnswers
} = require('./utils');


module.exports = {
  processUpload,
  parseAnkiJson
}

function processUpload(zipfilePath) {
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(zipfilePath)
      .pipe(unzip.Extract({ path: 'uploads' }));

    stream.on('close', () => {
      const files = fs.readdirSync(UPLOADS_PATH);
      const newCards = extractCardInfo(files);

      cleanUp(files);
      resolve(newCards);
    });
  });
}

function parseAnkiJson(filePath) {
  const contents = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return contents.notes.map(card => {
    let [
      expression,
      , // reading,
      ,// japMeaning,
      engMeaning,
      , // officialEng,
      questionImg,
      answerImg,
      , // audio
      , // prevLineImg,
      altAnswers,
      webLookup, // use for every answer so people can look up pronunciation
                 // https://ejje.weblio.jp/content/[webLookup (e.g. 切り換える)]
      notes,
      cardId
    ] = card.fields;

    [expression, engMeaning, notes] = [expression, engMeaning, notes].map(stripHtml);
    const answers = getAnswers(expression, altAnswers);

    return {
      questionAltText: formatQuestionAltText(expression),
      questionText:    formatQuestionText(expression, engMeaning, notes, cardId),
      questionImg:     getBase64(questionImg),
      answerAltText:   formatAnswerAltText(expression),
      answerText:      formatAnswerText(answers, webLookup, cardId),
      answerImg:       getBase64(answerImg),
      answers,
      cardId
    };
  });
}

function extractCardInfo(files) {
  let allNewCards = [];
  for (let file of files) {
    const currentFile = `${UPLOADS_PATH}/${file}`;
    const stats = fs.statSync(currentFile);

    if (stats.isFile() && file.match(/.+\.json$/)) {
      const newCards = parseAnkiJson(currentFile);
      allNewCards = allNewCards.concat(newCards);
    }
  }
  return allNewCards;
}

function stripHtml(string) {
  return string.replace(/<.*?>|&.*;/g, '');
}

function getSrc(string) {
  return (string.match(/src="(.+)"/) || [,])[1];
}

function getBase64(string) {
  let base64 = null;
  try {
    base64 = fs.readFileSync(
      `${UPLOADS_PATH}/media/${getSrc(string)}`,
      { encoding: 'base64' }
    );
  } catch (e) {
    // returning null...
  }
  return base64;
}

function cleanUp(files) {
  for (let file of files) {
    const root = `${UPLOADS_PATH}/${file}`;

    if (fs.lstatSync(root).isFile())
      fs.unlinkSync(root);
    else if (fs.lstatSync(root).isDirectory())
      deleteFolderRecursive(root);
  }
}

function deleteFolderRecursive(rootPath) {
  if (fs.existsSync(rootPath)) {
    fs.readdirSync(rootPath).forEach((file, index) => {
      const curPath = rootPath + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(rootPath);
  }
};
