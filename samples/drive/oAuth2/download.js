'use strict';

const {google} = require('googleapis');
const sampleClient = require('../sampleclient');
const fs = require('fs');
const os = require('os');
const uuid = require('uuid');
const path = require('path');

const drive = google.drive({
  version: 'v3',
  auth: sampleClient.oAuth2Client
});

async function runSample (fileId) {
  return new Promise(async (resolve, reject) => {
    const filePath = path.join(os.tmpdir(), uuid.v4());
    console.log(`writing to ${filePath}`);
    const dest = fs.createWriteStream(filePath);
    let progress = 0;
    const res = await drive.files.get(
      {fileId, alt: 'media'},
      {responseType: 'stream'}
    );
    res.data
      .on('end', () => {
        console.log('Done downloading file.');
        resolve(filePath);
      })
      .on('error', err => {
        console.error('Error downloading file.');
        reject(err);
      })
      .on('data', d => {
        progress += d.length;
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(`Downloaded ${progress} bytes`);
      })
      .pipe(dest);
  });
}

// if invoked directly (not tests), authenticate and run the samples
if (module === require.main) {
  if (process.argv.length !== 3) {
    console.error('Usage: node samples/drive/download.js $FILE_ID');
    process.exit();
  }
  const fileId = process.argv[2];
  const scopes = [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.appdata',
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/drive.metadata',
    'https://www.googleapis.com/auth/drive.metadata.readonly',
    'https://www.googleapis.com/auth/drive.photos.readonly',
    'https://www.googleapis.com/auth/drive.readonly'
  ];
  sampleClient.authenticate(scopes)
    .then(c => runSample(fileId))
    .catch(console.error);
}

// export functions for testing purposes
module.exports = {
  runSample,
  client: sampleClient.oAuth2Client
};
