var client = new RestClient("http://mockbin.com");
var request = new RestRequest("/har", Method.Post);
request.AddHeader("content-type", "application/json");
request.AddParameter("application/json", "{\n  \"foo\": \"bar\"\n}", ParameterType.RequestBody);
var response = client.Execute(request);