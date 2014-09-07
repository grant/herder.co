var accountSid = 'AC8b1c9bf970c71033309d1ee72b9cc982';
var authToken = process.env.TWILIO_AUTH_TOKEN;
var client = require('twilio')(accountSid, authToken);
<<<<<<< HEAD
 
// Example options:
// {
//   body: "Jenny please?! I love you <3",
//   to: "+14159352345",
//   from: "+16506469710"
// }
module.exports = function (options) {
  client.messages.create(options, function (err, message) {
    console.log('sent message');
=======

var sendMessage = function (driverContact, surge, wait, expectedTrend, callback) {
  var smsBody = "surge: " + surge + '\n' + "wait: " + wait + '\n'
  smsBody = smsBody + expectedTrend
  client.messages.create({
    body: smsBody,
    to: driverContact,
    from: driverContact
  }, function(err, message) {
    process.stdout.write(message.sid);
>>>>>>> add twilio sample call
  });

}

module.exports.sendMessage = sendMessage;
