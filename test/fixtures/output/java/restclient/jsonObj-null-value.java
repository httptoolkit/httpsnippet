RestClient restClient = RestClient.create();

ResponseEntity<String> response = restClient
  .method(HttpMethod.POST)
  .uri("http://mockbin.com/har")
  .header("content-type", "application/json")
  .contentType(MediaType.APPLICATION_JSON)
  .body("{\"foo\":null}")
  .retrieve()
  .toEntity(String.class);