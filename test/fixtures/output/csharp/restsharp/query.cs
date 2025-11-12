var client = new RestClient("http://mockbin.com");
var request = new RestRequest("/har?foo=bar&foo=baz&baz=abc&key=value", Method.Get);
var response = client.Execute(request);