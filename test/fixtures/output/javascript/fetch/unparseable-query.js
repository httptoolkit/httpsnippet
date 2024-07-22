const options = {method: 'GET'};

fetch('http://mockbin.com/har?&&a=b&&', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));