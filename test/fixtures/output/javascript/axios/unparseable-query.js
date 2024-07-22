import axios from "axios";

const options = {method: 'GET', url: 'http://mockbin.com/har?&&a=b&&'};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});