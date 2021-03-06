var https = require('https');

var token = 'tn7qaSt4y_-gY39_pICe7q0Fyk7sqfkgxEAK-oLP';

var formatURI = function (baseURI, parameters) {
  var optionsArray = [];
  for (var key in parameters) {
    optionsArray.push(key + '=' + parameters[key]);
  }
  var parametersString = optionsArray.join('&');
  return baseURI + '?' + parametersString;
};

var get = function (uri, callback) {
  var options = {
    host: 'api.uber.com',
    port: 443,
    path: uri,
    headers: {
      Authorization: 'Token ' + token
    },
    method: 'GET'
  };

  var req = https.request(options, function(res) {
    res.on('data', function (data) {
      var json = JSON.parse(data);
      callback(json);
    });
  });
  req.end();

  req.on('error', function(e) {
    console.error(e);
  });
};

var getProducts = function (latitude, longitude, callback) {
  var productRequstBase = '/v1/products';
  var parameters = {latitude: latitude, longitude: longitude};
  var productURI = formatURI(productRequstBase, parameters);
  get(productURI, callback);
};

var getPrice = function (latitude, longitude, destLatitude, destLongitude, callback) {
  var priceRequestBase = '/v1/estimates/price';
  if (!destLatitude) {
    destLatitude = latitude;
  }
  if (!destLongitude) {
    destLongitude = longitude;
  }
  var parameters = {start_latitude: latitude, start_longitude: longitude,
    end_latitude: destLatitude, end_longitude: destLongitude};
  var priceURI = formatURI(priceRequestBase, parameters);
  get(priceURI, callback);
};

var getTime = function (latitude, longitude, callback) {
  var timeRequestBase = '/v1/estimates/time';
  var parameters = {start_latitude: latitude, start_longitude: longitude};
  var timeURI = formatURI(timeRequestBase, parameters);
  get(timeURI, callback);
};

module.exports.getProducts = getProducts;
module.exports.getPrice = getPrice;
module.exports.getTime = getTime;
