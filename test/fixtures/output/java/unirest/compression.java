HttpResponse<String> response = Unirest.get("http://mockbin.com/har")
  .header("accept-encoding", "deflate, gzip, br")
  .asString();