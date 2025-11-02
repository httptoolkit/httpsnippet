RestClient restClient = RestClient.create();

MultipartBodyBuilder multipartBuilder = new MultipartBodyBuilder();
multipartBuilder.part("foo", "bar");

ResponseEntity<String> response = restClient
  .method(HttpMethod.POST)
  .uri("http://mockbin.com/har")
  .contentType(MediaType.MULTIPART_FORM_DATA)
  .body(multipartBuilder.build())
  .retrieve()
  .toEntity(String.class);
