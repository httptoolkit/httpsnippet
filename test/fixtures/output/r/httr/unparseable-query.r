library(httr)

url <- "http://mockbin.com/har?&&a=b&&"

response <- VERB("GET", url, content_type("application/octet-stream"))

content(response, "text")