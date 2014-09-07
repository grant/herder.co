var async = require('async');
var Geo = require('../model/geo');

var dayArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

var getFormattedDayArray = function () {
  var today = new Date();
  var currentDay = today.getDay();
  return dayArray.splice(currentDay + 1) + dayArray.splice(0, currentDay);
};

var locations = require('../data/locations');

// Adds a geolocation callback to the array for a cetain lat and lng
function addGeoCallback (lat, lng, geoCallbackArray) {
  geoCallbackArray.push(function (callback) {
    Geo.find({
      lat: lat,
      lng: lng
    }).sort({'_id': -1}).exec(function (err, data) {
      var priceData = data[0].time.priceData;
      var timeData = data[0].time.timeData;
      var formattedData = {
        lat: lat,
        lng: lng,
        price: priceData,
        wait: timeData
      };
      callback(null, formattedData);
    });
  });
}

// Gets the data needed to render the map
var getMapData = function (callback) {
  var locationsObject = {};
  var geoCallbackArray = [];
  for (var locationDataIndex in locations) {
    var locationData = locations[locationDataIndex];
    var lat = locationData[0];
    var lng = locationData[1];
    addGeoCallback(lat, lng, geoCallbackArray);
  }
  // execute query
  async.parallel(geoCallbackArray, function (err, data) {
    callback(data);
  });
};

// Gets the data needed to render the daily maximums for the line charts
var getDailyMaximums = function (latitude, longitude, callback) {
  var oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  Geo.find({
    lat: latitude,
    lng: longitude
    // createdAt: {
    //   "$gt": oneWeekAgo
    // }
  }, function (err, data) {
    console.log(data);
    var dailyMaximumsObject = {};
    var formattedDayArray = getFormattedDayArray();
    for (var day in formattedDayArray) {
      var dailySurgeMax = 0;
      var dailyTimeMax = 0;
      dailyMaximumsObject[formattedDayArray[day]] = function () {
        for (var element in data) {
          if (data[element]['time']['priceData'] > dailySurgeMax) {
            dailySurgeMax = data[element]['time']['priceData'];
          }
          if (data[element]['time']['timeData'] > dailyTimeMax) {
            dailySurgeMax = data[element]['time']['timeData'];
          }
        }
        return [dailySurgeMax, dailyTimeMax];
      };
      oneWeekAgo.setDate(oneWeekAgo.getDate + 1);
    }
    callback();
  });
};

// Gets the data needed to render the hourly maximums for the line charts
var getHourlyMaximums = function (latitude, longitude, callback) {
  var yesterdayDate = new Date();
  var tempTime = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 7);
  var dailyMaxObject = {};
  Geo.find({
    lat: latitude,
    lng: longitude
    // "created_on": {
    //   "$gte": yesterdayDate
    // }
  }).sort({'_id': -1}).exec(function (err, data) {
    for (var element in data) {
      var surge = data[element]['time']['priceData'];
      var wait = data[element]['time']['timeData'];
      dailyMaxObject[tempTime] = [surge, wait];
      tempTime.setMinutes(tempTime.getMinutes() - 15);
    }
    callback(dailyMaxObject);
  });
};

module.exports.getMapData = getMapData;
module.exports.getDailyMaximums = getDailyMaximums;
module.exports.getHourlyMaximums = getHourlyMaximums;