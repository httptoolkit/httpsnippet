require 'faraday'

conn = Faraday.new(
  url: 'http://mockbin.com',
)

response = conn.get('/har') do |req|
  req.headers['accept-encoding'] = 'deflate, gzip, br'
end

puts response.status
puts response.body