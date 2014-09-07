var accountSid = 'AC32a3c49700934481addd5ce1659f04d2';
var authToken = "";
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