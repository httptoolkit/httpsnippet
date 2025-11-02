RestClient restClient = RestClient.create();

MultiValueMap<String, String> formDataMap = new LinkedMultiValueMap<>();
formDataMap.add("foo", "bar");
formDataMap.add("hello", "world");

ResponseEntity<String> response = restClient
  .method(HttpMethod.POST)
  .uri("http://mockbin.com/har")
  .contentType(MediaType.APPLICATION_FORM_URLENCODED)
  .body(formDataMap)
  .retrieve()
  .toEntity(String.class);
