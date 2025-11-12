'use strict'

const CodeBuilder = require('../../helpers/code-builder')
const { escape } = require('../../helpers/format')
const helpers = require('../../helpers/headers')

module.exports = function (source, options) {
  const code = new CodeBuilder()
  const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS']

  function toPascalCase (str) {
    return str.replace(
      /\w+/g,
      word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
  }

  if (methods.indexOf(source.method.toUpperCase()) === -1) {
    return 'Method not supported'
  } else {
    code.push('var client = new RestClient("%s//%s");', source.uriObj.protocol, source.uriObj.host)
    code.push('var request = new RestRequest("%s", Method.%s);', escape(source.uriObj.path), toPascalCase(source.method))
  }

  // Add headers, including the cookies
  const headers = Object.keys(source.headersObj)

  // construct headers
  if (headers.length) {
    headers.forEach(function (key) {
      code.push('request.AddHeader("%s", "%qd");', key, source.headersObj[key])
    })
  }

  // construct cookies
  if (source.cookies.length) {
    source.cookies.forEach(function (cookie) {
      code.push('request.AddCookie("%s", "%s");', cookie.name, cookie.value)
    })
  }

  if (source.postData.text) {
    const contentTypeHeader = helpers.getHeader(source.allHeaders, 'content-type')

    code.push(
      'request.AddParameter(%s, %s, ParameterType.RequestBody);',
      contentTypeHeader ? `"${escape(contentTypeHeader)}"` : 'null',
      JSON.stringify(source.postData.text)
    )
  }

  code.push('var response = client.Execute(request);')
  return code.join()
}

module.exports.info = {
  key: 'restsharp',
  title: 'RestSharp',
  link: 'http://restsharp.org/',
  description: 'Simple REST and HTTP API Client for .NET'
}
