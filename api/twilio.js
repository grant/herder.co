var accountSid = 'AC8b1c9bf970c71033309d1ee72b9cc982';
var authToken = '';
var client = require('twilio')(accountSid, authToken);
 
client.messages.create({
    body: "Jenny please?! I love you <3",
    to: "+14159352345",
    from: "+14158141829"
}, function(err, message) {
    process.stdout.write(message.sid);
});

// Example options:
// {
//   body: "Jenny please?! I love you <3",
//   to: "+14159352345",
//   from: "+14158141829"
// }
module.exports = function (options) {

};