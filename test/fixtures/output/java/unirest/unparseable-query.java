HttpResponse<String> response = Unirest.get("http://mockbin.com/har?&&a=b&&")
  .asString();