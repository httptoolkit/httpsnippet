<?php

$client = new http\Client;
$request = new http\Client\Request;

$body = new http\Message\Body;
$body->append('\' " ` $( #{ %( %{ {{ \\0 %s \\');

$request->setRequestUrl('http://example.test/%27%22%60$(%(%%7B%7B%7B/0%s//');
$request->setRequestMethod('POST');
$request->setBody($body);

$request->setQuery(new http\QueryString([
  '\'' => 'squote-key-test',
  'squote-value-test' => '\'',
  '"' => 'dquote-key-test',
  'dquote-value-test' => '"',
  '`' => 'backtick-key-test',
  'backtick-value-test' => '`',
  '$(' => 'dollar-parenthesis-key-test',
  'dollar-parenthesis-value-test' => '$(',
  '#{' => 'hash-brace-key-test',
  'hash-brace-value-test' => '#{',
  '%(' => 'percent-parenthesis-key-test',
  'percent-parenthesis-value-test' => '%(',
  '%{' => 'percent-brace-key-test',
  'percent-brace-value-test' => '%{',
  '{{' => 'double-brace-key-test',
  'double-brace-value-test' => '{{',
  '\\0' => 'null-key-test',
  'null-value-test' => '\\0',
  '%s' => 'string-fmt-key-test',
  'string-fmt-value-test' => '%s',
  '\\' => 'slash-key-test',
  'slash-value-test' => '\\'
]));

$request->setHeaders([
  'squote-value-test' => '\'',
  'dquote-value-test' => '"',
  'backtick-value-test' => '`',
  'dollar-parenthesis-value-test' => '$(',
  'hash-brace-value-test' => '#{',
  'percent-parenthesis-value-test' => '%(',
  'percent-brace-value-test' => '%{',
  'double-brace-value-test' => '{{',
  'null-value-test' => '\\0',
  'string-fmt-value-test' => '%s',
  'slash-value-test' => '\\'
]);

$client->enqueue($request)->send();
$response = $client->getResponse();

echo $response->getBody();