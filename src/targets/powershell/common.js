'use strict'

const CodeBuilder = require('../../helpers/code-builder')
const helpers = require('../../helpers/headers')

// Within a single quote, the ONLY character to worry about is the single quote
// itself (escaped by doubling). Newlines, backticks, slashes etc are all treated
// as literal characters.
const psSqEscape = function (input) {
  return input
    .replace(/'/g, "''")
}

module.exports = function (command) {
  return function (source, options) {
    const code = new CodeBuilder()
    const methods = [
      'DEFAULT',
      'DELETE',
      'GET',
      'HEAD',
      'MERGE',
      'OPTIONS',
      'PATCH',
      'POST',
      'PUT',
      'TRACE'
    ]
    const methodArg = methods.includes(source.method.toUpperCase()) ? '-Method' : '-CustomMethod'

    const commandOptions = []

    // Add headers, including the cookies
    const headers = Object.keys(source.headersObj)

    // construct headers
    if (headers.length) {
      code.push('$headers=@{}')
      headers.forEach(function (key) {
        if (key !== 'connection') { // Not allowed
          code.push("$headers.Add('%s', '%s')",
            psSqEscape(key),
            psSqEscape(source.headersObj[key])
          )
        }
      })
      commandOptions.push('-Headers $headers')
    }

    // construct cookies
    if (source.cookies.length) {
      code.push('$session = New-Object Microsoft.PowerShell.Commands.WebRequestSession')

      source.cookies.forEach(function (cookie) {
        code.push('$cookie = New-Object System.Net.Cookie')

        code.push("$cookie.Name = '%s'", psSqEscape(cookie.name))
        code.push("$cookie.Value = '%s'", psSqEscape(cookie.value))
        code.push("$cookie.Domain = '%s'", psSqEscape(source.uriObj.host))

        code.push('$session.Cookies.Add($cookie)')
      })
      commandOptions.push('-WebSession $session')
    }

    if (source.postData.text) {
      const contentType = helpers.getHeader(source.allHeaders, 'content-type')
      if (contentType) {
        commandOptions.push("-ContentType '" + psSqEscape(contentType) + "'")
      }

      commandOptions.push(
        "-Body '" + psSqEscape(source.postData.text) + "'"
      )
    }

    code.push("$response = %s -Uri '%s' %s %s %s",
      command,
      psSqEscape(source.fullUrl),
      methodArg,
      source.method,
      commandOptions.join(' ')
    )
    return code.join()
  }
}
