OkHttpClient client = new OkHttpClient();

Request request = new Request.Builder()
  .url("http://mockbin.com/har")
  .get()
  .addHeader("accept-encoding", "deflate, gzip, br")
  .build();

Response response = client.newCall(request).execute();