RestClient restClient = RestClient.create();

ResponseEntity<String> response = restClient
  .method(HttpMethod.GET)
  .uri("http://mockbin.com/har")
  .header("accept-encoding", "deflate, gzip, br")
  .retrieve()
  .toEntity(String.class);