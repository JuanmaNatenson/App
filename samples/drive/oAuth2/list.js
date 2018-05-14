'use strict';

const {google} = require('googleapis');
const sampleClient = require('../sampleclient');

const drive = google.drive({
  version: 'v1',
  auth: ''
});

async function runSample (query) {
  const params = { pageSize: 3 };
  params.q = query;
  const res = await drive.files.list(params);
  console.log(res.data);
  return res.data;
}

if (module === require.main) {
  const scopes = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
  sampleClient.authenticate(scopes)
    .then(c => runSample())
    .catch(console.error);
}

module.exports = {
  runSample,
  client: sampleClient.oAuth2Client
};