/**
 * Geolocation-based Uber data
 *
 * The database is structured in this way:
 *
 * Geolocation coordinate -> [Many] Times
 * Times -> Data
 * Data: [Price surge, Wait time]
 */

var mongoose = require('mongoose');

// Times
var timeMomentSchema = new mongoose.Schema({
  priceData: Object,
  timeData: Object
});
var TimeMoment = mongoose.model('TimeMoment', timeMomentSchema);

var geoSchema = new mongoose.Schema({
  lat: Number,
  lng: Number,
  time: TimeMoment
});
var Geo = mongoose.model('Geo', geoSchema);
module.exports = Geo;