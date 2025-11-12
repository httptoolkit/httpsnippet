/**
 * @description
 * HTTP code snippet generator for native Crystal
 *
 * @author
 * @yanecc
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

const CodeBuilder = require('../../helpers/code-builder')

const { escape } = require('../../helpers/format')

module.exports = function ({ method: rawMethod, fullUrl, postData, allHeaders }, options = {}) {
  const { insecureSkipVerify = false } = options

  const code = new CodeBuilder()

  code.push('require "http/client"')

  code.blank()

  code.push(`url = "${fullUrl}"`)

  const headers = Object.keys(allHeaders)
  if (headers.length) {
    code.push('headers = HTTP::Headers{')
    headers.forEach(key => {
      code.push(`  "${key}" => "${escape(allHeaders[key])}"`)
    })
    code.push('}')
  }

  if (postData.text) {
    code.push(`reqBody = ${JSON.stringify(postData.text)}`)
  }

  code.blank()

  const method = rawMethod.toUpperCase()
  const methods = ['GET', 'POST', 'HEAD', 'DELETE', 'PATCH', 'PUT', 'OPTIONS']

  const headersContext = headers.length ? ', headers: headers' : ''
  const bodyContext = postData.text ? ', body: reqBody' : ''
  const sslContext = insecureSkipVerify ? ', tls: OpenSSL::SSL::Context::Client.insecure' : ''

  if (methods.includes(method)) {
    code.push(
      `response = HTTP::Client.${method.toLowerCase()} url${headersContext}${bodyContext}${sslContext}`
    )
  } else {
    code.push(
      `response = HTTP::Client.exec "${method}", url${headersContext}${bodyContext}${sslContext}`
    )
  }

  code.push('puts response.body')

  return code.join()
}

module.exports.info = {
  key: 'native',
  title: 'http::client',
  link: 'https://crystal-lang.org/api/master/HTTP/Client.html',
  description: 'Crystal HTTP client'
}
