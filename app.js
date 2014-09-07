/**
 * Module dependencies.
 */

var http = require('http');
var jade = require('jade');
var async = require('async');

var retrieve = require('./api/retrieve');
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
app.get('/api/:lat/:lng', function (req, res) {
  var lat = req.param('lat');
  var lng = req.param('lng');
  // get closest lat lng
  var locations = require('./data/locations');
  var minLatLng;
  var minDist = 1000000;
  for (var i in locations) {
    var loc = locations[i];
    var nextLat = loc[0];
    var nextLng = loc[1];
    var dis = Math.sqrt(Math.pow(lat - nextLat, 2) + Math.pow(lng - nextLng, 2));
    if (dis < minDist) {
      minDist = dis;
      minLatLng = {lat: nextLat, lng: nextLng};
    }
  }

  retrieve.getHourlyMaximums(minLatLng.lat, minLatLng.lng, function (hourData) {
    retrieve.getMapData(function (mapData) {
      res.send({
        hour: hourData,
        map: mapData
      });
    });
  });
});

function addToArray (lat, lng, savePointArray) {
  savePointArray.push(function (callback) {
    processData.saveLatLngPoint(lat, lng, function () {
      callback();
    });
  });
}

app.get('/updatedatabase', function (req, res) {
  var locations = require('./data/locations');
  var savePointArray = [];
  for (var locationDataIndex in locations) {
    var locationData = locations[locationDataIndex];
    var lat = locationData[0];
    var lng = locationData[1];
    addToArray(lat, lng, savePointArray);
  }
  async.series(savePointArray, function () {
    console.log('all done');
    res.send('all done');
  });
});

app.get('/sms', function (req, res) {
  var sampleLat = '37.7785951';
  var sampleLng = '-122.38926979999997';
  var driverContact = '6465049375';
  var fakeSurge = 1.75;
  var fakeWait = 10;
  var expectedTrend = 'The due to wait time trending, surge will likely increase.';
  twilio.sendMessage(driverContact, surge, wait, expectedTrend, function (result) {
    console.log(result)
  })
})
