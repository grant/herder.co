var async = require('async');
var Geo = require('../model/geo');

var dayArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

var formattedDayArray = function () {
    var today = new Date();
    var currentDay = today.getDay();
    return dayArray.splice(currentDay + 1) + dayArray(0, currentDay)
};

var locations = require('../data/locations');

var getMapData = function (callback) {
  var locationsObject = {};
  var currentDate = new Date();
  for (var locationDataIndex in locations) {
    var locationData = locations[locationDataIndex];
    var lat = locationData[0];
    var lng = locationData[1];
    var data = Geo.find({lat: lat, lng: lng, "created_on": {"$gte": currentDate}}).sort([['_id', -1]]), function (err, data) {
      var priceData = data[0]['time']['priceData'];
      var timeData = data[0]['time']['timeData'];
      }
    locationsObject[locationDataIndex] = {latitude: lat, longituge: lng, price: priceData, wait: timeData}
  }
}

var getDailyMaximums = function (latitude, longitude, callback) {
  var oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  var data = Geo.find({lat: latitude, lng: longitude, "created_on": {"$gt": oneWeekAgo}}), function (err, data) {
    var dailyMaximumsObject = {};
    for (var day in formattedDayArray) {
      var currentDate = oneWeekAgo.getDate();
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
        };
        return [dailySurgeMax, dailyTimeMax];
      };
      oneWeekAgo.setDate(oneWeekAgo.getDate + 1);
    };
    callback()
  };
};

var getHourlyMaximums = function (latitude, longitude, callback) {
  var yesterdayDate = new Date();
  var tempTime = new Date();
  yesterday.setDate(yesterday.getDate() - 7);
  var dailyMaxObject = {};
  var data = Geo.find({lat: lat, lng: lng, "created_on": {"$gte": yesterdayDate}}).sort([['_id', -1]]), function (err, data) {
  for (element in data) {
    var surge = data[element]['time']['priceData'];
    var wait = data[element]['time']['timeData'];
    dailyMaxObject[tempTime] = [surge, wait]
    tempTime.setMinutes(tempTime.getMinutes() - 15)
  }
  callback
};

module.exports.getMapData = gatMapData;
module.exports.getDailyMaximums = getDailyMaximums;
module.exports.getHourlyMaximums = getHourlyMaximums;
