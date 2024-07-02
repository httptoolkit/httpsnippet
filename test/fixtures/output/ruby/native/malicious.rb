require 'uri'
require 'net/http'

url = URI("http://example.test/%27%22%60$(%(%%7B%7B%7B/0%s//?'=squote-key-test&squote-value-test='&%22=dquote-key-test&dquote-value-test=%22&%60=backtick-key-test&backtick-value-test=%60&%24(=dollar-parenthesis-key-test&dollar-parenthesis-value-test=%24(&%23%7B=hash-brace-key-test&hash-brace-value-test=%23%7B&%25(=percent-parenthesis-key-test&percent-parenthesis-value-test=%25(&%25%7B=percent-brace-key-test&percent-brace-value-test=%25%7B&%7B%7B=double-brace-key-test&double-brace-value-test=%7B%7B&%5C0=null-key-test&null-value-test=%5C0&%25s=string-fmt-key-test&string-fmt-value-test=%25s&%5C=slash-key-test&slash-value-test=%5C")

http = Net::HTTP.new(url.host, url.port)

request = Net::HTTP::Post.new(url)
request["'"] = 'squote-key-test'
request["squote-value-test"] = '\''
request["dquote-value-test"] = '"'
request["`"] = 'backtick-key-test'
request["backtick-value-test"] = '`'
request["$"] = 'dollar-key-test'
request["dollar-parenthesis-value-test"] = '$('
request["#"] = 'hash-key-test'
request["hash-brace-value-test"] = '#{'
request["%"] = 'percent-key-test'
request["percent-parenthesis-value-test"] = '%('
request["percent-brace-value-test"] = '%{'
request["double-brace-value-test"] = '{{'
request["null-value-test"] = '\\0'
request["string-fmt-value-test"] = '%s'
request["slash-value-test"] = '\\'
request.body = "' \" ` $( #{ %( %{ {{ \\0 %s \\"

response = http.request(request)
puts response.read_body