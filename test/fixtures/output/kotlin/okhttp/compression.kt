val client = OkHttpClient()

val request = Request.Builder()
  .url("http://mockbin.com/har")
  .get()
  .addHeader("accept-encoding", "deflate, gzip, br")
  .build()

val response = client.newCall(request).execute()