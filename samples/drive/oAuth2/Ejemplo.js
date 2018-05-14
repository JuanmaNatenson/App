var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var connect = require('connect');
var serveStatic = require('serve-static');

//app.use(serveStatic('../../../pepito/primerob.html')); 
 
router.get('/data', function(req,res){ 
	res.json([ {"id": 1, "name": "Pepito", "city": "Buenos Aires"}]); 
});

router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'pepito', 'primerob.html'));
});


module.exports = router;

app.listen(3000);