<?php

$curl = curl_init();

curl_setopt_array($curl, [
  CURLOPT_URL => "http://example.test/%27%22%60$(%(%%7B%7B%7B/0%s//?'=squote-key-test&squote-value-test='&%22=dquote-key-test&dquote-value-test=%22&%60=backtick-key-test&backtick-value-test=%60&%24(=dollar-parenthesis-key-test&dollar-parenthesis-value-test=%24(&%23%7B=hash-brace-key-test&hash-brace-value-test=%23%7B&%25(=percent-parenthesis-key-test&percent-parenthesis-value-test=%25(&%25%7B=percent-brace-key-test&percent-brace-value-test=%25%7B&%7B%7B=double-brace-key-test&double-brace-value-test=%7B%7B&%5C0=null-key-test&null-value-test=%5C0&%25s=string-fmt-key-test&string-fmt-value-test=%25s&%5C=slash-key-test&slash-value-test=%5C",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "' \" ` $( #{ %( %{ {{ \\0 %s \\",
  CURLOPT_HTTPHEADER => [
    "#: hash-key-test",
    "$: dollar-key-test",
    "%: percent-key-test",
    "': squote-key-test",
    "`: backtick-key-test",
    "backtick-value-test: `",
    "dollar-parenthesis-value-test: $(",
    "double-brace-value-test: {{",
    "dquote-value-test: \"",
    "hash-brace-value-test: #{",
    "null-value-test: \\0",
    "percent-brace-value-test: %{",
    "percent-parenthesis-value-test: %(",
    "slash-value-test: \\",
    "squote-value-test: '",
    "string-fmt-value-test: %s"
  ],
]);

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}