var Geo = require('../model/geo');

// Expect the data to be in the geo model format
module.exports.storeGeo = function (data, callback) {
  var geo = new Geo(data);
  geo.save(function (err, savedData) {
    console.log('saved');
    callback();
  });
};