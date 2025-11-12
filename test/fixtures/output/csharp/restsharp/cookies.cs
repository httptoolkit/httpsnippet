var client = new RestClient("http://mockbin.com");
var request = new RestRequest("/har", Method.Post);
request.AddCookie("foo", "bar");
request.AddCookie("bar", "baz");
var response = client.Execute(request);