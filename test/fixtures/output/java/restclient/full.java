RestClient restClient = RestClient.create();

MultiValueMap<String, String> formDataMap = new LinkedMultiValueMap<>();
formDataMap.add("foo", "bar");

ResponseEntity<String> response = restClient
  .method(HttpMethod.POST)
  .uri("http://mockbin.com/har", uriBuilder -> {
    uriBuilder.queryParam("foo", "bar");
    uriBuilder.queryParam("foo", "baz");
    uriBuilder.queryParam("baz", "abc");
    uriBuilder.queryParam("key", "value");
    return uriBuilder.build();
  })
  .cookie("foo", "bar")
  .cookie("bar", "baz")
  .header("accept", "application/json")
  .contentType(MediaType.APPLICATION_FORM_URLENCODED)
  .body(formDataMap)
  .retrieve()
  .toEntity(String.class);
