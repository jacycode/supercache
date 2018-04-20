var express = require('express');
var app = express();

//static resources
app.use(express.static(__dirname));

//core cross
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

//index.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.listen(6606, function() {
  console.log('https://www.marrymin.com:6606');
});
