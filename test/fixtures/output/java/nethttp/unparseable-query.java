HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("http://mockbin.com/har?&&a=b&&"))
    .method("GET", HttpRequest.BodyPublishers.noBody())
    .build();
HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());