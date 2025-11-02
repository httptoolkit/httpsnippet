RestClient restClient = RestClient.create();

ResponseEntity<String> response = restClient
  .method(HttpMethod.valueOf("PROPFIND"))
  .uri("http://mockbin.com/har")
  .retrieve()
  .toEntity(String.class);
