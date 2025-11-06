RestClient restClient = RestClient.create();

ResponseEntity<String> response = restClient
  .method(HttpMethod.GET)
  .uri("http://mockbin.com/har", uriBuilder -> {
    uriBuilder.queryParam("foo", "bar");
    uriBuilder.queryParam("foo", "baz");
    uriBuilder.queryParam("baz", "abc");
    uriBuilder.queryParam("key", "value");
    return uriBuilder.build();
  })
  .retrieve()
  .toEntity(String.class);
