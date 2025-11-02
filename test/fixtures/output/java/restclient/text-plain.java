RestClient restClient = RestClient.create();

ResponseEntity<String> response = restClient
  .method(HttpMethod.POST)
  .uri("http://mockbin.com/har")
  .header("content-type", "text/plain")
  .contentType(MediaType.TEXT_PLAIN)
  .body("Hello World")
  .retrieve()
  .toEntity(String.class);
