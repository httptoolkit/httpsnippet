# Targets

Currently the following output targets are supported:

## Go

### [Native](http://golang.org/pkg/net/http/#NewRequest)

> Golang HTTP client request

###### Options

| Option          | Default | Description                                           |
| --------------- | ------- | ----------------------------------------------------- |
| `checkErrors`   | `false` | add error checking for request, response and body     |
| `printBody`     | `true`  | include code to print the body as a string            |
| `timeout`       | `-1`    | sets a request timeout in seconds (requires go 1.3+)  |

----

## Java

### [Unirest](http://unirest.io/java.html)

> Lightweight HTTP Request Client Library

###### Options

| Option    | Default | Description                      |
| --------- | ------- | -------------------------------- |
| `indent`  | `  `    | line break & indent output value |

### [OkHttp](http://square.github.io/okhttp/)

> An HTTP Request Client Library

###### Options

| Option    | Default | Description                      |
| --------- | ------- | -------------------------------- |
| `indent`  | `  `    | line break & indent output value |

----

## JavaScript

### [jQuery.ajax](http://api.jquery.com/jquery.ajax/)

> Perform an asynchronous HTTP (Ajax) requests with jQuery

###### Options

| Option    | Default | Description                      |
| --------- | ------- | -------------------------------- |
| `indent`  | `  `    | line break & indent output value |

### [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)

> W3C Standard API that provides scripted client functionality

###### Options

| Option    | Default | Description                      |
| --------- | ------- | -------------------------------- |
| `cors`    | `true`  | use `xhr.withCredentials = true` |
| `indent`  | `  `    | line break & indent output value |

###### Options

----

## Node.js

### [Native](http://nodejs.org/api/http.html#http_http_request_options_callback)

> Node.js native HTTP interface

###### Options

| Option    | Default | Description                      |
| --------- | ------- | -------------------------------- |
| `indent`  | `  `    | line break & indent output value |

### [Request](https://github.com/request/request)

> Simplified HTTP request client

###### Options

| Option    | Default | Description                      |
| --------- | ------- | -------------------------------- |
| `indent`  | `  `    | line break & indent output value |

### [Unirest](http://unirest.io/nodejs.html)

> Lightweight HTTP Request Client Library

###### Options

| Option    | Default | Description                      |
| --------- | ------- | -------------------------------- |
| `indent`  | `  `    | line break & indent output value |

----

## Objective-C

### [NSURLSession](https://developer.apple.com/library/mac/documentation/Foundation/Reference/NSURLSession_class/index.html)

> Foundation's NSURLSession request

###### Options

| Option    | Default | Description                                                     |
| --------- | ------- | --------------------------------------------------------------- |
| `indent`  | `    `  | line break & indent output value                                |
| `pretty`  | `true`  | indent extracted headers/parameters in `NSDictionary` literals  |
| `timeout` | `10`    | NSURLRequest timeout                                            |

----

## OCaml

### [CoHTTP](https://github.com/mirage/ocaml-cohttp)

> CoHTTP is a very lightweight HTTP server using Lwt or Async for OCaml

###### Options

| Option    | Default | Description                      |
| --------- | ------- | -------------------------------- |
| `indent`  | `  `    | line break & indent output value |

----

## PHP

### [ext-curl](http://php.net/manual/en/book.curl.php)

> PHP with ext-curl

###### Options

| Option          | Default | Description                                     |
| --------------- | ------- | ----------------------------------------------- |
| `closingTag`    | `false` | add a closing tag `?>`                          |
| `indent`        | `    `  | line break & indent output value                |
| `maxRedirects`  | `10`    | value for `CURLOPT_MAXREDIRS`                   |
| `namedErrors`   | `false` | attempt to display curl error name instead of # |
| `noTags`        | `false` | do NOT output start and end tags: `<?php`, `?>` |
| `shortTags`     | `false` | use short opening tag: `<?`                     |
| `timeout`       | `30`    | value for `CURLOPT_TIMEOUT`                     |

### [pecl/http v1](http://php.net/manual/en/book.http.php)

> PHP with pecl/http v1

###### Options

| Option          | Default | Description                                     |
| --------------- | ------- | ----------------------------------------------- |
| `closingTag`    | `false` | add a closing tag `?>`                          |
| `indent`        | `    `  | line break & indent output value                |
| `noTags`        | `false` | do NOT output start and end tags: `<?php`, `?>` |
| `shortTags`     | `false` | use short opening tag: `<?`                     |

### [pecl/http v2](http://devel-m6w6.rhcloud.com/mdref/http)

> PHP with pecl/http v2

###### Options

| Option          | Default | Description                                     |
| --------------- | ------- | ----------------------------------------------- |
| `closingTag`    | `false` | add a closing tag `?>`                          |
| `indent`        | `    `  | line break & indent output value                |
| `noTags`        | `false` | do NOT output start and end tags: `<?php`, `?>` |
| `shortTags`     | `false` | use short opening tag: `<?`                     |

----

## Python

### [Python 3](https://docs.python.org/3/library/http.client.html)

> Python3 HTTP Client

### [Requests](http://docs.python-requests.org/en/latest/api/#requests.request)

Requests HTTP library

----

## Ruby

### [Native](http://ruby-doc.org/stdlib-2.2.1/libdoc/net/http/rdoc/Net/HTTP.html)

> Ruby HTTP client

----

## Shell

### [cURL](http://curl.haxx.se/)

> cURL is a command line tool and library for transferring data with URL syntax

| Option   | Default | Description                                                              |
| -------- | ------- | ------------------------------------------------------------------------ |
| `indent` | `  `    | line break & indent output value, set to `false` to disable line breaks  |
| `short`  | `false` | use short form of cURL CLI options                                       |

### [HTTPie](http://httpie.org)

> a CLI, cURL-like tool for humans

| Option        | Default | Description                                                                                                                             |
| ------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `body`        | `false` | only the response body is printed                                                                                                       |
| `cert`        | `false` | use a client side certificate *(see [httpie docs](https://github.com/jakubroztocil/httpie#client-side-ssl-certificate))*                |
| `headers`     | `false` | only the response headers are printed                                                                                                   |
| `indent`      | `  `    | line break & indent output value, set to `false` to disable line breaks                                                                 |
| `pretty`      | `false` | syntax highlighting *(see [httpie docs](https://github.com/jakubroztocil/httpie#colors-and-formatting))*                                |
| `print`       | `false` | selects parts of the HTTP exchange, e.g. `--print=Hh` *(see [httpie docs](https://github.com/jakubroztocil/httpie#output-options))*     |
| `queryParams` | `false` | use query params as CLI parameters *otherwise, query string is added to URL*                                                            |
| `short`       | `false` | use short form of cURL CLI options                                                                                                      |
| `style`       | `false` | syntax highlighting *(see [httpie docs](https://github.com/jakubroztocil/httpie#colors-and-formatting))*                                |
| `timeout`     | `false` | overwrite the default *30s* timeout                                                                                                     |
| `verbose`     | `false` | print the whole HTTP exchange (request and response)                                                                                    |
| `verify`      | `false` | server SSL certificate verification *(see [httpie docs](https://github.com/jakubroztocil/httpie#server-ssl-certificate-verification))*  |

### [Wget](https://www.gnu.org/software/wget/)

> a free software package for retrieving files using HTTP, HTTPS

| Option    | Default | Description                                                              |
| --------- | ------- | ------------------------------------------------------------------------ |
| `indent`  | `  `    | line break & indent output value, set to `false` to disable line breaks  |
| `short`   | `false` | use short form of cURL CLI options                                       |
| `verbose` | `false` | by default, `--quiet` is always used, unless `verbose` is set to `true`  |

----

## Swift

### [NSURLSession](https://developer.apple.com/library/mac/documentation/Foundation/Reference/NSURLSession_class/index.html)

> Foundation's NSURLSession request

| Option    | Default | Description                                                     |
| --------- | ------- | --------------------------------------------------------------- |
| `indent`  | `  `    | line break & indent output value                                |
| `pretty`  | `true`  | indent extracted headers/parameters in `NSDictionary` literals  |
| `timeout` | `10`    | NSURLRequest timeout                                            |


## C#

### [RestSharp](http://restsharp.org/)

> Simple REST and HTTP API Client for .NET

## C

### [LibCurl](http://curl.haxx.se/libcurl/)

> A easy-to-use client-side URL transfer library
