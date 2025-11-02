RestClient restClient = RestClient.create();

MultipartBodyBuilder multipartBuilder = new MultipartBodyBuilder();
multipartBuilder.part("foo", new FileSystemResource("test/fixtures/files/hello.txt"))
  .contentType(MediaType.TEXT_PLAIN);

ResponseEntity<String> response = restClient
  .method(HttpMethod.POST)
  .uri("http://mockbin.com/har")
  .contentType(MediaType.MULTIPART_FORM_DATA)
  .body(multipartBuilder.build())
  .retrieve()
  .toEntity(String.class);
