var client = new RestClient("http://mockbin.com");
var request = new RestRequest("/har?foo%5Bbar%5D=baz%2Czap&fiz=buz&key=value", Method.Get);
var response = client.Execute(request);