import http.client

conn = http.client.HTTPConnection("example.test")

payload = "' \" ` $( #{ %( %{ {{ \\0 %s \\"

headers = {
    "'": "squote-key-test",
    "squote-value-test": "'",
    "dquote-value-test": "\"",
    "`": "backtick-key-test",
    "backtick-value-test": "`",
    "$": "dollar-key-test",
    "dollar-parenthesis-value-test": "$(",
    "#": "hash-key-test",
    "hash-brace-value-test": "#{",
    "%": "percent-key-test",
    "percent-parenthesis-value-test": "%(",
    "percent-brace-value-test": "%{",
    "double-brace-value-test": "{{",
    "null-value-test": "\\0",
    "string-fmt-value-test": "%s",
    "slash-value-test": "\\"
}

conn.request("POST", "/%27%22%60$(%(%%7B%7B%7B/0%s//?'=squote-key-test&squote-value-test='&%22=dquote-key-test&dquote-value-test=%22&%60=backtick-key-test&backtick-value-test=%60&%24(=dollar-parenthesis-key-test&dollar-parenthesis-value-test=%24(&%23%7B=hash-brace-key-test&hash-brace-value-test=%23%7B&%25(=percent-parenthesis-key-test&percent-parenthesis-value-test=%25(&%25%7B=percent-brace-key-test&percent-brace-value-test=%25%7B&%7B%7B=double-brace-key-test&double-brace-value-test=%7B%7B&%5C0=null-key-test&null-value-test=%5C0&%25s=string-fmt-key-test&string-fmt-value-test=%25s&%5C=slash-key-test&slash-value-test=%5C", payload, headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))