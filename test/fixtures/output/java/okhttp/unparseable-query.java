OkHttpClient client = new OkHttpClient();

Request request = new Request.Builder()
  .url("http://mockbin.com/har?&&a=b&&")
  .get()
  .build();

Response response = client.newCall(request).execute();