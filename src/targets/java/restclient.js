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

const multipartMimeTypes = [
  'multipart/form-data',
  'multipart/mixed',
  'multipart/related',
  'multipart/alternative'
]

module.exports = function (source, options) {
  const opts = Object.assign({
    indent: '  ',
    entityType: 'String'
  }, options)

  const state = {
    bodyType: null
  }

  const code = new CodeBuilder(opts.indent)

  code.push('RestClient restClient = RestClient.create();')
    .blank()

  if (source.postData) {
    if (source.postData.params && source.postData.mimeType === 'application/x-www-form-urlencoded') {
      state.bodyType = 'form'

      code.push('MultiValueMap<String, String> formDataMap = new LinkedMultiValueMap<>();')

      source.postData.params.forEach(function (param) {
        code.push('formDataMap.add("%qd", "%qd");', param.name, param.value)
      })

      code.blank()
    } else if (source.postData.params && multipartMimeTypes.includes(source.postData.mimeType)) {
      state.bodyType = 'multipart'

      code.push('MultipartBodyBuilder multipartBuilder = new MultipartBodyBuilder();')

      source.postData.params.forEach(function (param) {
        if (param.fileName) {
          if (param.value) {
            code.push('multipartBuilder.part("%s", "%qd")', param.name, param.value)
            code.push(1, '.filename("%s")', param.fileName)
          } else {
            code.push('multipartBuilder.part("%s", new FileSystemResource("%s"))', param.name, param.fileName)
          }

          if (param.contentType) {
            const mediaTypeConstant = standardMediaTypes[param.contentType]
            if (mediaTypeConstant) {
              code.push(1, '.contentType(MediaType.%s);', mediaTypeConstant)
            } else {
              code.push(1, '.contentType(MediaType.parseMediaType("%s"));', param.contentType)
            }
          } else {
            code.push(1, ';')
          }
        } else {
          code.push('multipartBuilder.part("%s", "%qd");', param.name, param.value || '')
        }
      })

      code.blank()
    } else if (source.postData.text) {
      state.bodyType = 'plaintext'
    }
  }

  code.push('ResponseEntity<%s> response = restClient', opts.entityType)

  if (standardMethods.includes(source.method.toUpperCase())) {
    code.push(1, '.method(HttpMethod.%s)', source.method.toUpperCase())
  } else {
    code.push(1, '.method(HttpMethod.valueOf("%s"))', source.method.toUpperCase())
  }

  if (Object.keys(source.queryObj).length) {
    code.push(1, '.uri("%s", uriBuilder -> {', source.url)

    Object.keys(source.queryObj).forEach(function (key) {
      const value = source.queryObj[key]
      const iterable = Array.isArray(value) ? value : [value]
      iterable.forEach(function (val) {
        code.push(2, 'uriBuilder.queryParam("%qd", "%qd");', key, val)
      })
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
      if (key.toLowerCase() !== 'content-type') {
        code.push(1, '.header("%s", "%qd")', key, source.headersObj[key])
      }
    })
  }

  if (source.postData && state.bodyType) {
    if (source.postData.mimeType) {
      const mediaTypeEnumConstant = standardMediaTypes[source.postData.mimeType]
      if (mediaTypeEnumConstant) {
        code.push(1, '.contentType(MediaType.%s)', mediaTypeEnumConstant)
      } else {
        code.push(1, '.contentType(MediaType.parseMediaType("%s"))', source.postData.mimeType)
      }
    }

    if (state.bodyType === 'form') {
      code.push(1, '.body(formDataMap)')
    } else if (state.bodyType === 'multipart') {
      code.push(1, '.body(multipartBuilder.build())')
    } else if (state.bodyType === 'plaintext') {
      code.push(1, '.body("%qd")', source.postData.text)
    }
  }

  code.push(1, '.retrieve()')
  code.push(1, '.toEntity(%s.class);', opts.entityType)

  return code.join()
}

module.exports.info = {
  key: 'restclient',
  title: 'Spring RestClient',
  link: 'https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/client/RestClient.html',
  description: 'Spring Framework REST client'
}
