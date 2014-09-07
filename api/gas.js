var request = require('request');

var getGas = function (zip, callback) {
  var getData = {
  "Zip": zip,
  "FuelType":"A",
  "Radius":5
  };
  var options = {
    method: 'post',
    body: getData,
    json: true,
    url: 'http://fuelcaster.com/service/json/GetStationsByZipcode',
    headers: {
      'Accept-Encoding': 'gzip,deflate',
      'Content-Type': 'application/json'
    }
  };
  var req = request(options, function (err, res, body) {
    callback(body);
    });
    req.end();

    req.on('error', function(e) {
      console.error(e);
    });
};



module.exports.getGas = getGas;
