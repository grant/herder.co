/**
 * Module dependencies.
 */

var http = require('http');
var jade = require('jade');

var processData = require('./api/processData');

var express = require('express');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static('public'));

// Connect to db
var db = require('./api/db');
db.connect();

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

app.get('/', function (req, res) {
  res.render('main');
});

// API
app.get('/api/', function (req, res) {
  res.send({});
});

app.get('/updatedatabase', function (req, res) {
  var locations = require('./data/locations');
  for (var locationDataIndex in locations) {
    var locationData = locations[locationDataIndex];
    var lat = locationData[0];
    var lng = locationData[1];
    processData.saveLatLngPoint(lat, lng, function () {
      res.send('done');
    });
  }
});