RestClient restClient = RestClient.create();

ResponseEntity<String> response = restClient
  .method(HttpMethod.GET)
  .uri("http://mockbin.com/har")
  .header("accept", "application/json")
  .header("x-foo", "Bar")
  .header("quoted-value", "\"quoted\" 'string'")
  .retrieve()
  .toEntity(String.class);