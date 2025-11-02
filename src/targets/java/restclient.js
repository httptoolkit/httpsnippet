/**
 * @description
 * HTTP code snippet generator for Java using Spring RestClient.
 *
 * @author
 * @jamezrin
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

'use strict'

const CodeBuilder = require('../../helpers/code-builder')

const standardMethods = ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'TRACE']

module.exports = function (source, options) {
  const opts = Object.assign({
    indent: '  '
  }, options)

  const code = new CodeBuilder(opts.indent)

  code.push('RestClient restClient = RestClient.create();')
    .blank()

  code.push('ResponseEntity<String> response = restClient')

  if (standardMethods.includes(source.method.toUpperCase())) {
    code.push(1, '.method(HttpMethod.%s)', source.method.toUpperCase())
  } else {
    code.push(1, '.method(HttpMethod.valueOf("%s"))', source.method.toUpperCase())
  }

  code.push(1, '.uri("%s")', source.fullUrl)

  if (source.cookies && source.cookies.length) {
    source.cookies.forEach(function (cookie) {
      code.push(1, '.cookie("%s", "%s")', cookie.name, cookie.value)
    })
  }

  const headers = Object.keys(source.allHeaders).filter(function (key) {
    return key.toLowerCase() !== 'cookie'
  })
  if (headers.length) {
    headers.forEach(function (key) {
      code.push(1, '.header("%s", "%qd")', key, source.allHeaders[key])
    })
  }

  if (source.postData && source.postData.text) {
    if (source.postData.mimeType === 'application/json') {
      code.push(1, '.contentType(MediaType.APPLICATION_JSON)')
      code.push(1, '.body(%s)', JSON.stringify(source.postData.text))
    } else if (source.postData.mimeType === 'application/x-www-form-urlencoded') {
      code.push(1, '.contentType(MediaType.APPLICATION_FORM_URLENCODED)')
      code.push(1, '.body(%s)', JSON.stringify(source.postData.text))
    } else if (source.postData.mimeType && source.postData.mimeType.startsWith('multipart/form-data')) {
      code.push(1, '.contentType(MediaType.parseMediaType("multipart/form-data"))')
      code.push(1, '.body(%s)', JSON.stringify(source.postData.text))
    } else {
      if (source.postData.mimeType) {
        code.push(1, '.contentType(MediaType.parseMediaType("%s"))', source.postData.mimeType)
      }
      code.push(1, '.body(%s)', JSON.stringify(source.postData.text))
    }
  }

  code.push(1, '.retrieve()')
  code.push(1, '.toEntity(String.class);')

  return code.join()
}

module.exports.info = {
  key: 'restclient',
  title: 'Spring RestClient',
  link: 'https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/client/RestClient.html',
  description: 'Spring Framework REST client'
}
