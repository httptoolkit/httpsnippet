const settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://mockbin.com/har?&&a=b&&",
  "method": "GET",
  "headers": {}
};

$.ajax(settings).done(function (response) {
  console.log(response);
});