var accountSid = 'AC8b1c9bf970c71033309d1ee72b9cc982';
var authToken = process.env.TWILIO_AUTH_TOKEN;
var client = require('twilio')(accountSid, authToken);

var sendMessage = function (driverContact, surge, wait, expectedTrend, callback) {
  var smsBody = "surge: " + surge + '\n' + "wait: " + wait + '\n'
  smsBody = smsBody + expectedTrend
  client.messages.create({
    body: smsBody,
    to: driverContact,
    from: driverContact
  }, function(err, message) {
    process.stdout.write(message.sid);
  });

}

module.exports.sendMessage = sendMessage;
