RestClient restClient = RestClient.create();

ResponseEntity<String> response = restClient
  .method(HttpMethod.POST)
  .uri("http://mockbin.com/har", uriBuilder -> {
    uriBuilder.queryParam("foo", "bar");
    uriBuilder.queryParam("foo", "baz");
    uriBuilder.queryParam("baz", "abc");
    uriBuilder.queryParam("key", "value");
    return uriBuilder.build();
  })
  .cookie("foo", "bar")
  .cookie("bar", "baz")
  .header("accept", "application/json")
  .header("content-type", "application/x-www-form-urlencoded")
  .contentType(MediaType.APPLICATION_FORM_URLENCODED)
  .body("foo=bar")
  .retrieve()
  .toEntity(String.class);
