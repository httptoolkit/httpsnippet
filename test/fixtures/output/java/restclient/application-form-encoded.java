RestClient restClient = RestClient.create();

ResponseEntity<String> response = restClient
  .method(HttpMethod.POST)
  .uri("http://mockbin.com/har")
  .header("content-type", "application/x-www-form-urlencoded")
  .contentType(MediaType.APPLICATION_FORM_URLENCODED)
  .body("foo=bar&hello=world")
  .retrieve()
  .toEntity(String.class);