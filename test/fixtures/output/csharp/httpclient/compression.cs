var clientHandler = new HttpClientHandler
{
    AutomaticDecompression = DecompressionMethods.Deflate | DecompressionMethods.GZip,
};
var client = new HttpClient(clientHandler);
var request = new HttpRequestMessage
{
    Method = HttpMethod.Get,
    RequestUri = new Uri("http://mockbin.com/har"),
};
using (var response = await client.SendAsync(request))
{
    response.EnsureSuccessStatusCode();
    var body = await response.Content.ReadAsStringAsync();
    Console.WriteLine(body);
}