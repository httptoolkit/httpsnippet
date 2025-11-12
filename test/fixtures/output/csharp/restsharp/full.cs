var client = new RestClient("http://mockbin.com");
var request = new RestRequest("/har?foo=bar&foo=baz&baz=abc&key=value", Method.Post);
request.AddHeader("accept", "application/json");
request.AddHeader("content-type", "application/x-www-form-urlencoded");
request.AddCookie("foo", "bar");
request.AddCookie("bar", "baz");
request.AddParameter("application/x-www-form-urlencoded", "foo=bar", ParameterType.RequestBody);
var response = client.Execute(request);