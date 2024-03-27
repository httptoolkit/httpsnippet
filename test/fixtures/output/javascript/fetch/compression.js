const options = {method: 'GET', headers: {'accept-encoding': 'deflate, gzip, br'}};

fetch('http://mockbin.com/har', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));