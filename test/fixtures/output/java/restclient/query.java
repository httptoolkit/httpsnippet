RestClient restClient = RestClient.create();

ResponseEntity<String> response = restClient
  .method(HttpMethod.GET)
  .uri("http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value")
  .retrieve()
  .toEntity(String.class);