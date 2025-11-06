RestClient restClient = RestClient.create();

ResponseEntity<String> response = restClient
  .method(HttpMethod.POST)
  .uri("http://mockbin.com/har")
  .cookie("foo", "bar")
  .cookie("bar", "baz")
  .retrieve()
  .toEntity(String.class);
