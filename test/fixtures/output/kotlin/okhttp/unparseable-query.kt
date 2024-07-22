val client = OkHttpClient()

val request = Request.Builder()
  .url("http://mockbin.com/har?&&a=b&&")
  .get()
  .build()

val response = client.newCall(request).execute()