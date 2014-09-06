/**
 * Module dependencies.
 */

var http = require('http');
var express = require('express');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

app.get('*', function (req, res) {
  res.send('hi');
});