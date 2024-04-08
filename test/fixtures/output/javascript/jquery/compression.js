const settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://mockbin.com/har",
  "method": "GET",
  "headers": {
    "accept-encoding": "deflate, gzip, br"
  }
};

$.ajax(settings).done(function (response) {
  console.log(response);
});