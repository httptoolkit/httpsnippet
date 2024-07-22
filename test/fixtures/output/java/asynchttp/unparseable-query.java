AsyncHttpClient client = new DefaultAsyncHttpClient();
client.prepare("GET", "http://mockbin.com/har?&&a=b&&")
  .execute()
  .toCompletableFuture()
  .thenAccept(System.out::println)
  .join();

client.close();