const fs = require('fs');
const path = require('path');
const unzip = require('unzip-stream');

function processUpload(zipfilePath) {
  return new Promise((resolve, reject) => {
    console.log('Zipfile path:', zipfilePath)
    const stream = fs.createReadStream(zipfilePath)
      .pipe(unzip.Extract({ path: 'uploads' }));

    stream.on('close', () => {
      const uploads = path.resolve(__dirname, '../uploads');
      const files = fs.readdirSync(uploads);
      console.log('rootDir:', uploads);
      let allNewCards = [];

      for (let file of files) {
        console.log('File found:', file);
        const currentFile = `${uploads}/${file}`;
        const stats = fs.statSync(currentFile);

        if (stats.isFile() && file.match(/.+\.json$/)) {

          const contents = JSON.parse(fs.readFileSync(currentFile, 'utf8'));
          const newCards = contents.notes.map(card => {
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

          allNewCards = allNewCards.concat(newCards);
        }
      }

      for (let file of files) {
        const root = `${uploads}/${file}`;

        if (fs.lstatSync(root).isFile())
          fs.unlinkSync(root);
        else if (fs.lstatSync(root).isDirectory())
          deleteFolderRecursive(root);
      }

      resolve(allNewCards);
    });
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

module.exports = processUpload;
