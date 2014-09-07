var accountSid = 'AC8b1c9bf970c71033309d1ee72b9cc982';
var authToken = process.env.TWILIO_AUTH_TOKEN;
var client = require('twilio')(accountSid, authToken);

var sendMessage = function (driverContact, surge, wait, expectedTrend, callback) {
  var smsBody = "surge: " + surge + '\n' + "wait: " + wait + '\n';
  smsBody = smsBody + expectedTrend;
  var details = {
    body: smsBody,
    to: process.env.GRANT_PHONE,
    from: '+16506469710'
  };
  client.messages.create(details, function(err, message) {
    callback(message);
  });
};

module.exports.sendMessage = sendMessage;
