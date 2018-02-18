import fs from 'fs';
import { PNG } from 'pngjs2';
import path from 'path';
import unzip from 'unzip-stream';
import {
  formatQuestionAltText,
  formatQuestionText,
  formatAnswerAltText,
  formatAnswerText,
  getAnswers,
  tryCatch
} from 'Utils';
const UPLOADS_PATH = path.resolve(__dirname, '../uploads');


export function processUpload(zipfilePath) {
  return new Promise(async (resolve, reject) => {
    const stream = fs.createReadStream(zipfilePath)
      .pipe(unzip.Extract({ path: 'uploads' }));

    stream.on('close', async () => {
      const files = fs.readdirSync(UPLOADS_PATH);
      await tryCatch(optimizeImages(UPLOADS_PATH + '/media'));
      console.log('Finished optimizing images!');
      const newCards = extractCardInfo(files);

      cleanUp(files);
      resolve(newCards);
    });
  });
}

export function optimizeImages(dirPath) {
  return new Promise((resolve, reject) => {
    const filesProcessing = [];
    fs.readdirSync(dirPath).forEach(file => {
      if (/.*\.png$/.test(file)) {
        const currentFile = dirPath + "/" + file;
        const contents = fs.readFileSync(currentFile);
        const writeStream = fs.createWriteStream(currentFile);
        const currentImage = new Promise((res, rej) =>
          writeStream.on('close', res)
        );
        filesProcessing.push(currentImage);
        new PNG({ filterType: 4, deflateLevel: 1 })
          .parse(contents, (err, png) => {
            // Give upper left pixel an opacity
            // of 254 so Twitter won't convert
            // to jpeg
            png.data[3] -= 1;
            png.pack().pipe(writeStream);
          });
      }
    });
    Promise.all(filesProcessing).then(resolve);
  });
}

export function parseAnkiJson(filePath) {
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
      prevLineImg,
      prevLineAltText,
      altAnswers,
      webLookup, // use for every answer so people can look up pronunciation
                 // https://ejje.weblio.jp/content/[webLookup (e.g. 切り換える)]
      notes,
      cardId
    ] = card.fields;

    [expression, engMeaning, notes] = [expression, engMeaning, notes].map(stripHtml);
    const answers = getAnswers(expression, altAnswers);

    return {
      cardId,
      questionText:    formatQuestionText(expression, engMeaning, notes, cardId),
      questionImg:     getBase64(questionImg),
      questionAltText: formatQuestionAltText(expression),
      prevLineImg:     getBase64(prevLineImg),
      prevLineAltText,
      answerText:      formatAnswerText(answers, engMeaning, webLookup, cardId),
      answerImg:       getBase64(answerImg),
      answerAltText:   formatAnswerAltText(expression),
      answers,
      mediaUrls: []
    };
  });
}


// private functions

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
  if (!string || string.length === 0) return;

  let base64;
  try {
    base64 = fs.readFileSync(
      `${UPLOADS_PATH}/media/${getSrc(string)}`,
      { encoding: 'base64' }
    );
  } catch (e) {
    console.error(e);
    // return undefined...
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
    fs.readdirSync(rootPath).forEach(file => {
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
