library(httr)

url <- "http://example.test/%27%22%60$(%(%%7B%7B%7B/0%s//"

queryString <- list(
  "'" = "squote-key-test",
  "squote-value-test" = "'",
  "\"" = "dquote-key-test",
  "dquote-value-test" = "\"",
  "`" = "backtick-key-test",
  "backtick-value-test" = "`",
  "$(" = "dollar-parenthesis-key-test",
  "dollar-parenthesis-value-test" = "$(",
  "#{" = "hash-brace-key-test",
  "hash-brace-value-test" = "#{",
  "%(" = "percent-parenthesis-key-test",
  "percent-parenthesis-value-test" = "%(",
  "%{" = "percent-brace-key-test",
  "percent-brace-value-test" = "%{",
  "{{" = "double-brace-key-test",
  "double-brace-value-test" = "{{",
  "\\0" = "null-key-test",
  "null-value-test" = "\\0",
  "%s" = "string-fmt-key-test",
  "string-fmt-value-test" = "%s",
  "\\" = "slash-key-test"
  "slash-value-test" = "\\",
)

payload <- "' \" ` $( #{ %( %{ {{ \\0 %s \\"

encode <- "raw"

response <- VERB("POST", url, body = payload, query = queryString, add_headers(squote_value_test = '\'', dquote_value_test = '"', backtick_value_test = '`', dollar_parenthesis_value_test = '$(', hash_brace_value_test = '#{', percent_parenthesis_value_test = '%(', percent_brace_value_test = '%{', double_brace_value_test = '{{', null_value_test = '\\0', string_fmt_value_test = '%s', slash_value_test = '\\'), content_type("text/plain"), encode = encode)

content(response, "text")