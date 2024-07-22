const request = require('request');

const options = {method: 'GET', url: 'http://mockbin.com/har?&&a=b&&'};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});