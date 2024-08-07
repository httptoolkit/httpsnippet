/**
 * @description
 * HTTP code snippet generator for the Shell using HTTPie.
 *
 * @author
 * @AhmadNassri
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

'use strict'

const util = require('util')
const shell = require('../../helpers/shell')
const CodeBuilder = require('../../helpers/code-builder')

module.exports = function (source, options) {
  const opts = Object.assign({
    body: false,
    cert: false,
    headers: false,
    indent: '  ',
    pretty: false,
    print: false,
    queryParams: false,
    short: false,
    style: false,
    timeout: false,
    verbose: false,
    verify: false
  }, options)

  const code = new CodeBuilder(opts.indent, opts.indent !== false ? ' \\\n' + opts.indent : ' ')

  let raw = false
  const flags = []

  if (opts.headers) {
    flags.push(opts.short ? '-h' : '--headers')
  }

  if (opts.body) {
    flags.push(opts.short ? '-b' : '--body')
  }

  if (opts.verbose) {
    flags.push(opts.short ? '-v' : '--verbose')
  }

  if (opts.print) {
    flags.push(util.format('%s=%s', opts.short ? '-p' : '--print', opts.print))
  }

  if (opts.verify) {
    flags.push(util.format('--verify=%s', opts.verify))
  }

  if (opts.cert) {
    flags.push(util.format('--cert=%s', opts.cert))
  }

  if (opts.pretty) {
    flags.push(util.format('--pretty=%s', opts.pretty))
  }

  if (opts.style) {
    flags.push(util.format('--style=%s', opts.pretty))
  }

  if (opts.timeout) {
    flags.push(util.format('--timeout=%s', opts.timeout))
  }

  // construct query params
  if (opts.queryParams) {
    const queryStringKeys = Object.keys(source.queryObj)

    queryStringKeys.forEach(function (name) {
      const value = source.queryObj[name]

      if (Array.isArray(value)) {
        value.forEach(function (val) {
          code.push('%s==%s', name, shell.quote(val))
        })
      } else {
        code.push('%s==%s', name, shell.quote(value))
      }
    })
  }

  // construct headers
  Object.keys(source.allHeaders).sort().forEach(function (key) {
    code.push('%s:%s', shell.quote(key), shell.quote(source.allHeaders[key]))
  })

  if (source.postData.mimeType === 'application/x-www-form-urlencoded') {
    // construct post params
    if (source.postData.params && source.postData.params.length) {
      flags.push(opts.short ? '-f' : '--form')

      source.postData.params.forEach(function (param) {
        code.push('%s=%s', param.name, shell.quote(param.value))
      })
    }
  } else {
    raw = true
  }

  code.unshift('http %s%s %s', flags.length ? flags.join(' ') + ' ' : '', source.method, shell.quote(opts.queryParams ? source.url : source.fullUrl))

  if (raw && source.postData.text) {
    if (source.postData.text.includes('\\')) {
      // Printf handles escape characters more clearly & portably than echo
      code.unshift("printf '%%s' %s | ", shell.quote(source.postData.text))
    } else {
      code.unshift('echo %s | ', shell.quote(source.postData.text))
    }
  }

  return code.join()
}

module.exports.info = {
  key: 'httpie',
  title: 'HTTPie',
  link: 'http://httpie.org/',
  description: 'a CLI, cURL-like tool for humans'
}
