'use strict';

var util = require('util');

module.exports = function (source, options) {
  var opts = util._extend({
    indent: '  '
  }, options);

  var code = [];

  code.push('open Cohttp_lwt_unix');
  code.push('open Lwt');
  code.push('');

  // Create URI
  code.push(util.format('let uri = Uri.of_string "%s" in', source.fullUrl));

  // Add headers, including the cookies
  var headers = Object.keys(source.allHeaders);

  if (headers.length) {
    code.push('let headers = Header.init ()');

    headers.map(function (key) {
      code.push(util.format(opts.indent + '|> fun h -> Header.add h "%s" "%s"', key, source.allHeaders[key]));
    });

    code.push('in');
  }

  // Add body
  var bodyPresent = source.postData && source.postData.text;

  if (bodyPresent) {
    // Just text
    code.push(util.format('let body = %s in', JSON.stringify(source.postData.text)));
  } else if (source.postData && !source.postData.text && source.postData.params && source.postData.params.length) {
    // Post params
    bodyPresent = true;

    var body = source.postData.params.map(function (param) {
      return param.name + '=' + param.value;
    }).join('&');

    code.push(util.format('let body = "%s" in', body));
  }

  // Do the request
  code.push('');

  code.push(util.format('Client.call %s%s(Code.method_of_string "%s") uri',
    headers.length ? '~headers ' : '',
    bodyPresent ? '~body ' : '',
    source.method
  ));

  // Catch result
  code.push('>>= fun (res, body_stream) ->');
  code.push(opts.indent + '(* Do stuff with the result *)');

  return code.join('\n');
};

module.exports.info = {
  key: 'cohttp',
  title: 'CoHTTP',
  link: 'https://github.com/mirage/ocaml-cohttp',
  description: 'Cohttp is a very lightweight HTTP server using Lwt or Async for OCaml'
};