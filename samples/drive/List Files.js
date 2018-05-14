let {google} = require('googleapis');
let privatekey = require("./privatekey.json");
let drive = google.drive('v3');

// configure a JWT auth client
let jwtClient = new google.auth.JWT(
       privatekey.client_email,
       null,
       privatekey.private_key,
       ['https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/calendar']);

//authenticate request
jwtClient.authorize(function (err, tokens) {
 if (err) {
   console.log(err);
   return;
 } else {
   console.log("Successfully connected!");
 }
});

//Google Drive API
drive.files.list({
   auth: jwtClient,
}, function (err, response) {
   if (err) {
       console.log('The API returned an error: ' + err);
       return;
   }
   var files = response.files;
   console.log(response.data.files);
	if (files.length == 0) {
       console.log('No files found.');
    } else if (files.length > 0) {
       console.log('Files from Google Drive:');
       for (var i = 0; i < files.length; i++) {
           var file = files[i];
           console.log('%s (%s)', file.name, file.id);
       }
   }
});