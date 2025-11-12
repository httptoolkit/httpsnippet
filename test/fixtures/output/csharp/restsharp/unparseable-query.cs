var client = new RestClient("http://mockbin.com");
var request = new RestRequest("/har?&&a=b&&", Method.Get);
var response = client.Execute(request);