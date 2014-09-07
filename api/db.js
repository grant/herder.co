module.exports.connect = function() {
  var mongoose = require('mongoose');
  var connectionURI = process.env.MONGOLAB_URI;

  // mongoose.connect(connectionURI);
  console.log(connectionURI);
};