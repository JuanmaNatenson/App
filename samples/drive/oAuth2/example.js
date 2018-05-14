'use strict';

const {google} = require('googleapis');

var drive = google.drive({ version: 'v3' });
drive.apiKey = "AIzaSyAkuFjbwP2B_lN3tBe9SC9Hcga-7UoDwoA"
drive.setScope = "https://www.googleapis.com/auth/drive.file"

drive.files.create({
    resource: {
        name: 'text.text',
        mimeType: 'text/plain',
        parents:['1ATscm2nsE9KpjA66iXHB9jnMrbyik7PP']
    },
    media: {
        mimeType: 'text/plain',

        body: fs.createReadStream('files/text.text')

    }
});