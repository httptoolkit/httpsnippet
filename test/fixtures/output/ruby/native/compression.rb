require 'uri'
require 'net/http'

url = URI("http://mockbin.com/har")

http = Net::HTTP.new(url.host, url.port)

request = Net::HTTP::Get.new(url)
request["accept-encoding"] = 'deflate, gzip, br'

response = http.request(request)
puts response.read_body