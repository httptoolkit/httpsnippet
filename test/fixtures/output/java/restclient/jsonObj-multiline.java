RestClient restClient = RestClient.create();

ResponseEntity<String> response = restClient
  .method(HttpMethod.POST)
  .uri("http://mockbin.com/har")
  .contentType(MediaType.APPLICATION_JSON)
  .body("{\n  \"foo\": \"bar\"\n}")
  .retrieve()
  .toEntity(String.class);
