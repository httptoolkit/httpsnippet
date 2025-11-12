var client = new RestClient("https://mockbin.com");
var request = new RestRequest("/har", Method.Get);
var response = client.Execute(request);