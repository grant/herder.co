var uber = require('../api/uber');

var lat = 37.774929;
var lng = -122.419416;
uber.getProducts(lat, lng, function (data) {
  console.log(data);
});