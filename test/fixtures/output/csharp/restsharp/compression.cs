var client = new RestClient("http://mockbin.com");
var request = new RestRequest("/har", Method.Get);
request.AddHeader("accept-encoding", "deflate, gzip, br");
var response = client.Execute(request);