var client = new RestClient("http://mockbin.com");
var request = new RestRequest("/har", Method.Post);
request.AddHeader("content-type", "text/plain");
request.AddParameter("text/plain", "Hello World", ParameterType.RequestBody);
var response = client.Execute(request);