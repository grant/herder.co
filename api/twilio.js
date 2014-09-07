var accountSid = 'AC8b1c9bf970c71033309d1ee72b9cc982';
var authToken = process.env.TWILIO_AUTH_TOKEN;
var client = require('twilio')(accountSid, authToken);
 
// Example options:
// {
//   body: "Jenny please?! I love you <3",
//   to: "+14159352345",
//   from: "+16506469710"
// }
module.exports = function (options) {
  client.messages.create(options, function (err, message) {
    console.log('sent message');
  });
};