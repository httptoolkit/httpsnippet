RestClient restClient = RestClient.create();

ResponseEntity<String> response = restClient
  .method(HttpMethod.GET)
  .uri("https://mockbin.com/har")
  .retrieve()
  .toEntity(String.class);