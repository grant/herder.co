var async = require('async');
var store = require('./store');
var uber = require('./uber');

// Calls the uber api and saves the lat long data in the database
function saveLatLngPoint (lat, lng, outerCallback) {
  console.log('start process');
  async.parallel({
    price: function (callback) {
      uber.getPrice(lat, lng, undefined, undefined, function (priceData) {
        callback(undefined, priceData);
      });
    },
    time: function (callback) {
      uber.getTime(lat, lng, function (timeData) {
        callback(undefined, timeData);
      });
    }
  }, function (err, results) {
    var priceData = results.price;
    var timeData = results.time;
    store.storeGeo({
      lat: lat,
      lng: lng,
      time: {
        priceData: priceData.prices,
        timeData: timeData.times
      }
    }, function () {
      outerCallback();
    });
  });
}

module.exports.saveLatLngPoint = saveLatLngPoint;