RestClient restClient = RestClient.create();

ResponseEntity<String> response = restClient
  .method(HttpMethod.POST)
  .uri("http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value")
  .cookie("foo", "bar")
  .cookie("bar", "baz")
  .header("accept", "application/json")
  .header("content-type", "application/x-www-form-urlencoded")
  .contentType(MediaType.APPLICATION_FORM_URLENCODED)
  .body("foo=bar")
  .retrieve()
  .toEntity(String.class);
