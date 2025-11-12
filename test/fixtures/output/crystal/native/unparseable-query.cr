require "http/client"

url = "http://mockbin.com/har?&&a=b&&"

response = HTTP::Client.get url
puts response.body