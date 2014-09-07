var request = require('request');
var getData = {
  "Zip":"94025",
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

request(options, function (err, res, body) {
  console.log(body);
});