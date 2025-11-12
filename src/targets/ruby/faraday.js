const CodeBuilder = require('../../helpers/code-builder')

module.exports = ({ uriObj, queryObj, method: rawMethod, postData, allHeaders }) => {
  const code = new CodeBuilder()

  // To support custom methods we check for the supported methods
  // and if doesn't exist then we build a custom class for it
  const method = rawMethod.toUpperCase()
  const methods = [
    'GET',
    'POST',
    'HEAD',
    'DELETE',
    'PATCH',
    'PUT',
    'OPTIONS',
    'COPY',
    'LOCK',
    'UNLOCK',
    'MOVE',
    'TRACE'
  ]

  if (!methods.includes(method)) {
    code.push(`# Faraday cannot currently run ${method} requests. Please use another client.`)
    return code.join()
  }

  code.push("require 'faraday'")
  code.blank()

  // Write body to beginning of script
  if (postData.mimeType === 'application/x-www-form-urlencoded') {
    if (postData.params) {
      code.push('data = {')
      postData.params.forEach(param => {
        code.push(`  :${param.name} => ${JSON.stringify(param.value)},`)
      })
      code.push('}')
      code.blank()
    }
  }

  code.push('conn = Faraday.new(')
  code.push(`  url: '${uriObj.protocol}//${uriObj.host}',`)
  if (allHeaders['content-type'] || allHeaders['Content-Type']) {
    code.push(`  headers: {'Content-Type' => '${allHeaders['content-type'] || allHeaders['Content-Type']}'}`)
  }
  code.push(')')

  code.blank()
  code.push(`response = conn.${method.toLowerCase()}('${uriObj.pathname}') do |req|`)

  const headers = Object.keys(allHeaders)
  if (headers.length) {
    headers.forEach(key => {
      if (key.toLowerCase() !== 'content-type') {
        code.push("  req.headers['%qs'] = '%qs'", key, allHeaders[key])
      }
    })
  }

  Object.keys(queryObj).forEach(name => {
    const value = queryObj[name]
    if (Array.isArray(value)) {
      code.push(`  req.params['%qs'] = ${JSON.stringify(value)}`, name)
    } else {
      code.push("  req.params['%qs'] = '%qs'", name, value)
    }
  })

  switch (postData.mimeType) {
    case 'application/x-www-form-urlencoded':
      if (postData.params) {
        code.push('  req.body = URI.encode_www_form(data)')
      }
      break

    case 'application/json':
      if (postData.jsonObj) {
        code.push(`  req.body = ${JSON.stringify(postData.text)}`)
      }
      break

    default:
      if (postData.text) {
        code.push(`  req.body = ${JSON.stringify(postData.text)}`)
      }
  }

  code.push('end')
  code.blank()
  code.push('puts response.status')
  code.push('puts response.body')

  return code.join()
}

module.exports.info = {
  key: 'faraday',
  title: 'faraday',
  link: 'https://github.com/lostisland/faraday',
  description: 'Faraday HTTP client'
}
