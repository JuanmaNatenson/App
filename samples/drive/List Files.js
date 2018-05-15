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

function lukeFileWalker (folder, drive) 
{
	var fol = "'"+folder;
	var der = fol+"'";
	drive.files.list({
    auth: jwtClient,
    fields : '*',
    q:der+" in parents"
    }, function (err, response) 
	{
	    if (err) 
	    {
	        console.log('The API returned an error: ' + err);
	        return;
	    }
	   
	    var files = response.data.files;
		if (files.length == 0) 
		{
	        console.log('No files found.');
	    } 
	    
	    else if (files.length > 0) 
	    {
    	    for (var i = 0; i < files.length; i++) 
	   		{
		    	var file = files[i];
			    console.log('%s (%s) [%s]', file.name, file.id, file.parents);
		        if (file.mimeType == 'application/vnd.google-apps.folder')
		        {
		   			lukeFileWalker (file.id, drive);
		        }

	   		}
		}

	}
);
}



lukeFileWalker("1obB8eTPSye5trVyH5GU6HNWSYU13YRcI", drive)