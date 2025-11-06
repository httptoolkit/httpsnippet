RestClient restClient = RestClient.create();

ResponseEntity<String> response = restClient
  .method(HttpMethod.POST)
  .uri("http://example.test/%27%22%60$(%(%%7B%7B%7B/0%s//", uriBuilder -> {
    uriBuilder.queryParam("'", "squote-key-test");
    uriBuilder.queryParam("squote-value-test", "'");
    uriBuilder.queryParam("\"", "dquote-key-test");
    uriBuilder.queryParam("dquote-value-test", "\"");
    uriBuilder.queryParam("`", "backtick-key-test");
    uriBuilder.queryParam("backtick-value-test", "`");
    uriBuilder.queryParam("$(", "dollar-parenthesis-key-test");
    uriBuilder.queryParam("dollar-parenthesis-value-test", "$(");
    uriBuilder.queryParam("#{", "hash-brace-key-test");
    uriBuilder.queryParam("hash-brace-value-test", "#{");
    uriBuilder.queryParam("%(", "percent-parenthesis-key-test");
    uriBuilder.queryParam("percent-parenthesis-value-test", "%(");
    uriBuilder.queryParam("%{", "percent-brace-key-test");
    uriBuilder.queryParam("percent-brace-value-test", "%{");
    uriBuilder.queryParam("{{", "double-brace-key-test");
    uriBuilder.queryParam("double-brace-value-test", "{{");
    uriBuilder.queryParam("\\0", "null-key-test");
    uriBuilder.queryParam("null-value-test", "\\0");
    uriBuilder.queryParam("%s", "string-fmt-key-test");
    uriBuilder.queryParam("string-fmt-value-test", "%s");
    uriBuilder.queryParam("\\", "slash-key-test");
    uriBuilder.queryParam("slash-value-test", "\\");
    return uriBuilder.build();
  })
  .header("'", "squote-key-test")
  .header("squote-value-test", "'")
  .header("dquote-value-test", "\"")
  .header("`", "backtick-key-test")
  .header("backtick-value-test", "`")
  .header("$", "dollar-key-test")
  .header("dollar-parenthesis-value-test", "$(")
  .header("#", "hash-key-test")
  .header("hash-brace-value-test", "#{")
  .header("%", "percent-key-test")
  .header("percent-parenthesis-value-test", "%(")
  .header("percent-brace-value-test", "%{")
  .header("double-brace-value-test", "{{")
  .header("null-value-test", "\\0")
  .header("string-fmt-value-test", "%s")
  .header("slash-value-test", "\\")
  .contentType(MediaType.TEXT_PLAIN)
  .body("' \" ` $( #{ %( %{ {{ \\0 %s \\")
  .retrieve()
  .toEntity(String.class);
