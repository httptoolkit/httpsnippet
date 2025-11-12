var client = new RestClient("http://mockbin.com");
var request = new RestRequest("/har", Method.Get);
request.AddHeader("accept", "application/json");
request.AddHeader("x-foo", "Bar");
request.AddHeader("quoted-value", "\"quoted\" 'string'");
var response = client.Execute(request);