library(httr)

url <- "http://mockbin.com/har"

response <- VERB("GET", url, add_headers(accept_encoding = 'deflate, gzip, br'), content_type("application/octet-stream"))

content(response, "text")