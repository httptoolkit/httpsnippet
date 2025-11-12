var client = new RestClient("http://mockbin.com");
var request = new RestRequest("/har", Method.Post);
request.AddHeader("content-type", "application/x-www-form-urlencoded");
request.AddParameter("application/x-www-form-urlencoded", "foo=bar&hello=world", ParameterType.RequestBody);
var response = client.Execute(request);