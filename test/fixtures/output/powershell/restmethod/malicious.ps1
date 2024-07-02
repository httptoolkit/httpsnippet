$headers=@{}
$headers.Add('squote-value-test', '''')
$headers.Add('dquote-value-test', '"')
$headers.Add('backtick-value-test', '`')
$headers.Add('dollar-parenthesis-value-test', '$(')
$headers.Add('hash-brace-value-test', '#{')
$headers.Add('percent-parenthesis-value-test', '%(')
$headers.Add('percent-brace-value-test', '%{')
$headers.Add('double-brace-value-test', '{{')
$headers.Add('null-value-test', '\0')
$headers.Add('string-fmt-value-test', '%s')
$headers.Add('slash-value-test', '\')
$response = Invoke-RestMethod -Uri 'http://example.test/%27%22%60$(%(%%7B%7B%7B/0%s//?''=squote-key-test&squote-value-test=''&%22=dquote-key-test&dquote-value-test=%22&%60=backtick-key-test&backtick-value-test=%60&%24(=dollar-parenthesis-key-test&dollar-parenthesis-value-test=%24(&%23%7B=hash-brace-key-test&hash-brace-value-test=%23%7B&%25(=percent-parenthesis-key-test&percent-parenthesis-value-test=%25(&%25%7B=percent-brace-key-test&percent-brace-value-test=%25%7B&%7B%7B=double-brace-key-test&double-brace-value-test=%7B%7B&%5C0=null-key-test&null-value-test=%5C0&%25s=string-fmt-key-test&string-fmt-value-test=%25s&%5C=slash-key-test&slash-value-test=%5C' -Method POST -Headers $headers -Body ''' " ` $( #{ %( %{ {{ \0 %s \'