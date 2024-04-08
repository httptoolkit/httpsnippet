AsyncHttpClient client = new DefaultAsyncHttpClient();
client.prepare("GET", "http://mockbin.com/har")
  .setHeader("accept-encoding", "deflate, gzip, br")
  .execute()
  .toCompletableFuture()
  .thenAccept(System.out::println)
  .join();

client.close();