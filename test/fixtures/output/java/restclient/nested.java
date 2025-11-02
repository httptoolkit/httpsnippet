RestClient restClient = RestClient.create();

ResponseEntity<String> response = restClient
  .method(HttpMethod.GET)
  .uri("http://mockbin.com/har?foo%5Bbar%5D=baz%2Czap&fiz=buz&key=value")
  .retrieve()
  .toEntity(String.class);