'use strict'

const CodeBuilder = require('../../helpers/code-builder')
const helpers = require('../../helpers/headers')

module.exports = function (source, options) {
  const code = new CodeBuilder()

  code.push('CURL *hnd = curl_easy_init();')
    .blank()
    .push('curl_easy_setopt(hnd, CURLOPT_CUSTOMREQUEST, "%s");', source.method.toUpperCase())
    .push('curl_easy_setopt(hnd, CURLOPT_URL, "%s");', source.fullUrl)

  // Add headers, including the cookies
  const headers = Object.keys(source.headersObj)

  // construct headers
  if (headers.length) {
    code.blank()
      .push('struct curl_slist *headers = NULL;')

    headers.forEach(function (key) {
      code.push('headers = curl_slist_append(headers, "%s: %qd");', key, source.headersObj[key])
    })

    code.push('curl_easy_setopt(hnd, CURLOPT_HTTPHEADER, headers);')
  }

  // construct cookies
  if (helpers.hasHeader(source.allHeaders, 'cookie')) {
    code.blank()
      .push('curl_easy_setopt(hnd, CURLOPT_COOKIE, "%s");', helpers.getHeader(source.allHeaders, 'cookie'))
  }

  if (source.postData.text) {
    code.blank()
      .push('curl_easy_setopt(hnd, CURLOPT_POSTFIELDS, %s);', JSON.stringify(source.postData.text))
  }

  if (helpers.hasHeader(source.allHeaders, 'accept-encoding')) {
    code.blank()
      .push('curl_easy_setopt(hnd, CURLOPT_ACCEPT_ENCODING, "");')
  }

  code.blank()
    .push('CURLcode ret = curl_easy_perform(hnd);')

  return code.join()
}

module.exports.info = {
  key: 'libcurl',
  title: 'Libcurl',
  link: 'http://curl.haxx.se/libcurl/',
  description: 'Simple REST and HTTP API Client for C'
}
