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

// Based off org.springframework.http.HttpMethod
const standardMethods = ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'TRACE']

// Based off org.springframework.http.MediaType
const standardMediaTypes = {
  'application/atom+xml': 'APPLICATION_ATOM_XML',
  'application/cbor': 'APPLICATION_CBOR',
  'application/x-www-form-urlencoded': 'APPLICATION_FORM_URLENCODED',
  'application/graphql-response+json': 'APPLICATION_GRAPHQL_RESPONSE',
  'application/json': 'APPLICATION_JSON',
  'application/x-ndjson': 'APPLICATION_NDJSON',
  'application/octet-stream': 'APPLICATION_OCTET_STREAM',
  'application/pdf': 'APPLICATION_PDF',
  'application/problem+json': 'APPLICATION_PROBLEM_JSON',
  'application/problem+xml': 'APPLICATION_PROBLEM_XML',
  'application/x-protobuf': 'APPLICATION_PROTOBUF',
  'application/rss+xml': 'APPLICATION_RSS_XML',
  'application/xhtml+xml': 'APPLICATION_XHTML_XML',
  'application/xml': 'APPLICATION_XML',
  'application/yaml': 'APPLICATION_YAML',
  'image/gif': 'IMAGE_GIF',
  'image/jpeg': 'IMAGE_JPEG',
  'image/png': 'IMAGE_PNG',
  'multipart/form-data': 'MULTIPART_FORM_DATA',
  'multipart/mixed': 'MULTIPART_MIXED',
  'multipart/related': 'MULTIPART_RELATED',
  'text/event-stream': 'TEXT_EVENT_STREAM',
  'text/html': 'TEXT_HTML',
  'text/markdown': 'TEXT_MARKDOWN',
  'text/plain': 'TEXT_PLAIN',
  'text/xml': 'TEXT_XML'
}

module.exports = function (source, options) {
  const opts = Object.assign({
    indent: '  ',
    entityClass: 'String'
  }, options)

  const code = new CodeBuilder(opts.indent)

  code.push('RestClient restClient = RestClient.create();')
    .blank()

  code.push('ResponseEntity<%s> response = restClient', opts.entityClass)

  if (standardMethods.includes(source.method.toUpperCase())) {
    code.push(1, '.method(HttpMethod.%s)', source.method.toUpperCase())
  } else {
    code.push(1, '.method(HttpMethod.valueOf("%s"))', source.method.toUpperCase())
  }

  if (Object.keys(source.queryObj).length) {
    code.push(1, '.uri("%s", uriBuilder -> {', source.url)
    Object.keys(source.queryObj).forEach(function (key) {
      const value = source.queryObj[key]
      if (Array.isArray(value)) {
        value.forEach(function (val) {
          code.push(2, 'uriBuilder.queryParam("%qd", "%qd");', key, val)
        })
      } else {
        code.push(2, 'uriBuilder.queryParam("%qd", "%qd");', key, value)
      }
    })
    code.push(2, 'return uriBuilder.build();')
    code.push(1, '})')
  } else {
    code.push(1, '.uri("%s")', source.url)
  }

  if (source.cookies && source.cookies.length) {
    source.cookies.forEach(function (cookie) {
      code.push(1, '.cookie("%qd", "%qd")', cookie.name, cookie.value)
    })
  }

  const headers = Object.keys(source.headersObj)
  if (headers.length) {
    headers.forEach(function (key) {
      code.push(1, '.header("%s", "%qd")', key, source.headersObj[key])
    })
  }

  if (source.postData && source.postData.text) {
    if (source.postData.mimeType) {
      const mappedEnumConst = standardMediaTypes[source.postData.mimeType]
      if (mappedEnumConst) {
        code.push(1, '.contentType(MediaType.%s)', mappedEnumConst)
      } else {
        code.push(1, '.contentType(MediaType.parseMediaType("%s"))', source.postData.mimeType)
      }
    }

    code.push(1, '.body(%s)', JSON.stringify(source.postData.text))
  }

  code.push(1, '.retrieve()')
  code.push(1, '.toEntity(%s.class);', opts.entityClass)

  return code.join()
}

module.exports.info = {
  key: 'restclient',
  title: 'Spring RestClient',
  link: 'https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/client/RestClient.html',
  description: 'Spring Framework REST client'
}
