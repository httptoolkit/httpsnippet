HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("http://example.test/%27%22%60$(%(%%7B%7B%7B/0%s//?'=squote-key-test&squote-value-test='&%22=dquote-key-test&dquote-value-test=%22&%60=backtick-key-test&backtick-value-test=%60&%24(=dollar-parenthesis-key-test&dollar-parenthesis-value-test=%24(&%23%7B=hash-brace-key-test&hash-brace-value-test=%23%7B&%25(=percent-parenthesis-key-test&percent-parenthesis-value-test=%25(&%25%7B=percent-brace-key-test&percent-brace-value-test=%25%7B&%7B%7B=double-brace-key-test&double-brace-value-test=%7B%7B&%5C0=null-key-test&null-value-test=%5C0&%25s=string-fmt-key-test&string-fmt-value-test=%25s&%5C=slash-key-test&slash-value-test=%5C"))
    .header("squote-value-test", "'")
    .header("dquote-value-test", "\"")
    .header("backtick-value-test", "`")
    .header("dollar-parenthesis-value-test", "$(")
    .header("hash-brace-value-test", "#{")
    .header("percent-parenthesis-value-test", "%(")
    .header("percent-brace-value-test", "%{")
    .header("double-brace-value-test", "{{")
    .header("null-value-test", "\\0")
    .header("string-fmt-value-test", "%s")
    .header("slash-value-test", "\\")
    .method("POST", HttpRequest.BodyPublishers.ofString("' \" ` $( #{ %( %{ {{ \\0 %s \\"))
    .build();
HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());