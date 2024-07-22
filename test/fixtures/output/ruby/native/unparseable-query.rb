require 'uri'
require 'net/http'

url = URI("http://mockbin.com/har?&&a=b&&")

http = Net::HTTP.new(url.host, url.port)

request = Net::HTTP::Get.new(url)

response = http.request(request)
puts response.read_body