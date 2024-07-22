var client = new RestClient("http://mockbin.com/har?&&a=b&&");
var request = new RestRequest(Method.GET);
IRestResponse response = client.Execute(request);