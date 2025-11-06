RestClient restClient = RestClient.create();

ResponseEntity<String> response = restClient
  .method(HttpMethod.POST)
  .uri("http://mockbin.com/har")
  .contentType(MediaType.TEXT_PLAIN)
  .body("Hello World")
  .retrieve()
  .toEntity(String.class);
