<?php

$request = new HttpRequest();
$request->setUrl('http://mockbin.com/har?&&a=b&&');
$request->setMethod(HTTP_METH_GET);

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}