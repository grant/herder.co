var uber = require('../api/uber');

var lat = 37.774929;
var lng = -122.419416;
var destLat = lat + 0.2;
var destLng = lng;
uber.getPrice(lat, lng, destLat, destLng, function (data) {
  console.log(data);
});