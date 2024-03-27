var client = new RestClient("http://mockbin.com/har");
var request = new RestRequest(Method.GET);
request.AddHeader("accept-encoding", "deflate, gzip, br");
IRestResponse response = client.Execute(request);