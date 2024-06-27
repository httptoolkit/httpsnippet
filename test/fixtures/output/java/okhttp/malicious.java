OkHttpClient client = new OkHttpClient();

MediaType mediaType = MediaType.parse("text/plain");
RequestBody body = RequestBody.create(mediaType, "' \" ` $( #{ %( %{ {{ \\0 %s \\");
Request request = new Request.Builder()
  .url("http://example.test/%27%22%60$(%(%%7B%7B%7B/0%s//?'=squote-key-test&squote-value-test='&%22=dquote-key-test&dquote-value-test=%22&%60=backtick-key-test&backtick-value-test=%60&%24(=dollar-parenthesis-key-test&dollar-parenthesis-value-test=%24(&%23%7B=hash-brace-key-test&hash-brace-value-test=%23%7B&%25(=percent-parenthesis-key-test&percent-parenthesis-value-test=%25(&%25%7B=percent-brace-key-test&percent-brace-value-test=%25%7B&%7B%7B=double-brace-key-test&double-brace-value-test=%7B%7B&%5C0=null-key-test&null-value-test=%5C0&%25s=string-fmt-key-test&string-fmt-value-test=%25s&%5C=slash-key-test&slash-value-test=%5C")
  .post(body)
  .addHeader("squote-value-test", "'")
  .addHeader("dquote-value-test", "\"")
  .addHeader("backtick-value-test", "`")
  .addHeader("dollar-parenthesis-value-test", "$(")
  .addHeader("hash-brace-value-test", "#{")
  .addHeader("percent-parenthesis-value-test", "%(")
  .addHeader("percent-brace-value-test", "%{")
  .addHeader("double-brace-value-test", "{{")
  .addHeader("null-value-test", "\\0")
  .addHeader("string-fmt-value-test", "%s")
  .addHeader("slash-value-test", "\\")
  .build();

Response response = client.newCall(request).execute();