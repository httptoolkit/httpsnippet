const request = require('request');

const options = {
  method: 'GET',
  url: 'http://mockbin.com/har',
  headers: {'accept-encoding': 'deflate, gzip, br'}
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});