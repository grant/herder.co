var speed = 30;

var http = require('http');

function gs() {
  return {
    speedMPH: function (location) {
      return "location: " + location;
    },
    speedKPH: function (argument) {
      return 'blah';
    }
  };
}



module.exports.getSpeedFunctions = gs;