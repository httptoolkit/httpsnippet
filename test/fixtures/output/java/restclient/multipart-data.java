RestClient restClient = RestClient.create();

ResponseEntity<String> response = restClient
  .method(HttpMethod.POST)
  .uri("http://mockbin.com/har")
  .header("content-type", "multipart/form-data; boundary=---011000010111000001101001")
  .contentType(MediaType.MULTIPART_FORM_DATA)
  .body("-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"foo\"; filename=\"hello.txt\"\r\nContent-Type: text/plain\r\n\r\nHello World\r\n-----011000010111000001101001--\r\n")
  .retrieve()
  .toEntity(String.class);
