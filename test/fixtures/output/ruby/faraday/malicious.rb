require 'faraday'

conn = Faraday.new(
  url: 'http://example.test',
)

response = conn.post('/%27%22%60$(%(%%7B%7B%7B/0%s//') do |req|
  req.headers['\''] = 'squote-key-test'
  req.headers['squote-value-test'] = '\''
  req.headers['dquote-value-test'] = '"'
  req.headers['`'] = 'backtick-key-test'
  req.headers['backtick-value-test'] = '`'
  req.headers['$'] = 'dollar-key-test'
  req.headers['dollar-parenthesis-value-test'] = '$('
  req.headers['#'] = 'hash-key-test'
  req.headers['hash-brace-value-test'] = '#{'
  req.headers['%'] = 'percent-key-test'
  req.headers['percent-parenthesis-value-test'] = '%('
  req.headers['percent-brace-value-test'] = '%{'
  req.headers['double-brace-value-test'] = '{{'
  req.headers['null-value-test'] = '\\0'
  req.headers['string-fmt-value-test'] = '%s'
  req.headers['slash-value-test'] = '\\'
  req.params['\''] = 'squote-key-test'
  req.params['squote-value-test'] = '\''
  req.params['"'] = 'dquote-key-test'
  req.params['dquote-value-test'] = '"'
  req.params['`'] = 'backtick-key-test'
  req.params['backtick-value-test'] = '`'
  req.params['$('] = 'dollar-parenthesis-key-test'
  req.params['dollar-parenthesis-value-test'] = '$('
  req.params['#{'] = 'hash-brace-key-test'
  req.params['hash-brace-value-test'] = '#{'
  req.params['%('] = 'percent-parenthesis-key-test'
  req.params['percent-parenthesis-value-test'] = '%('
  req.params['%{'] = 'percent-brace-key-test'
  req.params['percent-brace-value-test'] = '%{'
  req.params['{{'] = 'double-brace-key-test'
  req.params['double-brace-value-test'] = '{{'
  req.params['\\0'] = 'null-key-test'
  req.params['null-value-test'] = '\\0'
  req.params['%s'] = 'string-fmt-key-test'
  req.params['string-fmt-value-test'] = '%s'
  req.params['\\'] = 'slash-key-test'
  req.params['slash-value-test'] = '\\'
  req.body = "' \" ` $( #{ %( %{ {{ \\0 %s \\"
end

puts response.status
puts response.body