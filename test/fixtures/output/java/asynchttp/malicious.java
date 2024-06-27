AsyncHttpClient client = new DefaultAsyncHttpClient();
client.prepare("POST", "http://example.test/%27%22%60$(%(%%7B%7B%7B/0%s//?'=squote-key-test&squote-value-test='&%22=dquote-key-test&dquote-value-test=%22&%60=backtick-key-test&backtick-value-test=%60&%24(=dollar-parenthesis-key-test&dollar-parenthesis-value-test=%24(&%23%7B=hash-brace-key-test&hash-brace-value-test=%23%7B&%25(=percent-parenthesis-key-test&percent-parenthesis-value-test=%25(&%25%7B=percent-brace-key-test&percent-brace-value-test=%25%7B&%7B%7B=double-brace-key-test&double-brace-value-test=%7B%7B&%5C0=null-key-test&null-value-test=%5C0&%25s=string-fmt-key-test&string-fmt-value-test=%25s&%5C=slash-key-test&slash-value-test=%5C")
  .setHeader("squote-value-test", "'")
  .setHeader("dquote-value-test", "\"")
  .setHeader("backtick-value-test", "`")
  .setHeader("dollar-parenthesis-value-test", "$(")
  .setHeader("hash-brace-value-test", "#{")
  .setHeader("percent-parenthesis-value-test", "%(")
  .setHeader("percent-brace-value-test", "%{")
  .setHeader("double-brace-value-test", "{{")
  .setHeader("null-value-test", "\\0")
  .setHeader("string-fmt-value-test", "%s")
  .setHeader("slash-value-test", "\\")
  .setBody("' \" ` $( #{ %( %{ {{ \\0 %s \\")
  .execute()
  .toCompletableFuture()
  .thenAccept(System.out::println)
  .join();

client.close();