const unirest = require("unirest");

const req = unirest("GET", "http://mockbin.com/har?&&&");

req.end(function (res) {
  if (res.error) throw new Error(res.error);

  console.log(res.body);
});