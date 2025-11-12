require "http/client"

url = "http://mockbin.com/har"
headers = HTTP::Headers{
  "accept-encoding" => "deflate, gzip, br"
}

response = HTTP::Client.get url, headers: headers
puts response.body