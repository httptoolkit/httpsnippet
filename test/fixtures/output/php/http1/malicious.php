<?php

$request = new HttpRequest();
$request->setUrl('http://example.test/%27%22%60$(%(%%7B%7B%7B/0%s//');
$request->setMethod(HTTP_METH_POST);

$request->setQueryData([
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
]);

$request->setHeaders([
  '\'' => 'squote-key-test',
  'squote-value-test' => '\'',
  'dquote-value-test' => '"',
  '`' => 'backtick-key-test',
  'backtick-value-test' => '`',
  '$' => 'dollar-key-test',
  'dollar-parenthesis-value-test' => '$(',
  '#' => 'hash-key-test',
  'hash-brace-value-test' => '#{',
  '%' => 'percent-key-test',
  'percent-parenthesis-value-test' => '%(',
  'percent-brace-value-test' => '%{',
  'double-brace-value-test' => '{{',
  'null-value-test' => '\\0',
  'string-fmt-value-test' => '%s',
  'slash-value-test' => '\\'
]);

$request->setBody('\' " ` $( #{ %( %{ {{ \\0 %s \\');

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}