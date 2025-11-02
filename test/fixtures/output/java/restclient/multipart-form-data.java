RestClient restClient = RestClient.create();

ResponseEntity<String> response = restClient
  .method(HttpMethod.POST)
  .uri("http://mockbin.com/har")
  .header("Content-Type", "multipart/form-data; boundary=---011000010111000001101001")
  .contentType(MediaType.parseMediaType("multipart/form-data"))
  .body("-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"foo\"\r\n\r\nbar\r\n-----011000010111000001101001--\r\n")
  .retrieve()
  .toEntity(String.class);