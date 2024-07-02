/**
 * @description
 * HTTP code snippet generator for R using httr
 *
 * @author
 * @gabrielakoreeda
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

'use strict'

const util = require('util')
const { escape } = require('../../helpers/format')
const { getHeader } = require('../../helpers/headers')
const CodeBuilder = require('../../helpers/code-builder')

module.exports = function (source, options) {
  // Start snippet
  const code = new CodeBuilder()

  // Import httr
  code.push('library(httr)')
    .blank()

  // Set URL
  code.push('url <- "%s"', source.url)
    .blank()

  // Construct query string
  const qs = source.queryObj
  const queryCount = Object.keys(qs).length
  delete source.queryObj.key

  if (source.queryString.length === 1) {
    code.push('queryString <- list(%s = "%s")', Object.keys(qs), Object.values(qs).toString())
      .blank()
  } else if (source.queryString.length > 1) {
    let count = 1

    code.push('queryString <- list(')

    for (const query in qs) {
      const safeKey = query.match(/^[a-zA-Z][\w._]*$/)
        ? query
        : '"' + escape(query) + '"'

      if (count++ !== queryCount - 1) {
        code.push('  %s = "%qd",', safeKey, qs[query].toString())
      } else {
        code.push('  %s = "%qd"', safeKey, qs[query].toString())
      }
    }

    code.push(')')
      .blank()
  }

  // Construct payload
  const payload = JSON.stringify(source.postData.text)

  if (payload) {
    code.push('payload <- %s', payload)
      .blank()
  }

  // Define encode
  if (source.postData.text || source.postData.jsonObj || source.postData.params) {
    switch (source.postData.mimeType) {
      case 'application/x-www-form-urlencoded':
        code.push('encode <- "form"')
          .blank()
        break

      case 'application/json':
        code.push('encode <- "json"')
          .blank()
        break

      case 'multipart/form-data':
        code.push('encode <- "multipart"')
          .blank()
        break

      default:
        code.push('encode <- "raw"')
          .blank()
        break
    }
  }

  // Construct headers
  const cookieHeader = getHeader(source.allHeaders, 'cookie')
  const acceptHeader = getHeader(source.allHeaders, 'accept')

  const setCookies = cookieHeader
    ? 'set_cookies(`' + cookieHeader.replace(/;/g, '", `').replace(/` /g, '`').replace(/=/g, '` = "') + '")'
    : undefined

  const setAccept = acceptHeader
    ? `accept("${escape(acceptHeader)}")`
    : undefined

  const setContentType = 'content_type("' + source.postData.mimeType + '")'

  const otherHeaders = Object.entries(source.allHeaders)
    // These headers are all handled separately:
    .filter(([key]) => !['cookie', 'accept', 'content-type'].includes(key.toLowerCase()))
    .map(([key, value]) => `${key.replace(/-/g, '_')} = '${escape(value, { delimiter: "'" })}'`)
    .join(', ')

  const setHeaders = otherHeaders
    ? `add_headers(${otherHeaders})`
    : undefined

  // Construct request
  const method = source.method
  let request = util.format('response <- VERB("%s", url', method)

  if (payload) {
    request += ', body = payload'
  }

  if (source.queryString.length) {
    request += ', query = queryString'
  }

  const headerAdditions = [setHeaders, setContentType, setAccept, setCookies].filter(x => !!x).join(', ')

  if (headerAdditions) {
    request += ', ' + headerAdditions
  }

  if (source.postData.text || source.postData.jsonObj || source.postData.params) {
    request += ', encode = encode'
  }

  request += ')'

  code.push(request)
    .blank()

  // Print response
    .push('content(response, "text")')

  return code.join()
}

module.exports.info = {
  key: 'httr',
  title: 'httr',
  link: 'https://cran.r-project.org/web/packages/httr/vignettes/quickstart.html',
  description: 'httr: Tools for Working with URLs and HTTP'
}
