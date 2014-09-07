var uber = require('../api/uber');

var lat = '';
var lng = '';
uber.getProducts(lat, lng, function (data) {
  console.log(data);
});