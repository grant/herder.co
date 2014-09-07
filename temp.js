var https = require('https');

// curl -H 'Authorization: Token YOUR_SERVER_TOKEN' \
// 'https://api.uber.com/v1/products?latitude=37.7759792&longitude=-122.41823'

var token = 'tn7qaSt4y_-gY39_pICe7q0Fyk7sqfkgxEAK-oLP';

var options = {
  host: 'api.uber.com',
  port: 443,
  path: '/v1/products?latitude=37.7759792&longitude=-122.41823',
  headers: {
    Authorization: 'Token ' + token
  },
  method: 'GET'
};

var req = https.request(options, function(res) {
  res.on('data', function (data) {
    // console.log(data); // I can't parse it because, it's a string. why?
    var json = JSON.parse(data);
    console.log(json);
  });
});
req.end();

req.on('error', function(e) {
  console.error(e);
});