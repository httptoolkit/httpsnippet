/**
 * @description
 * HTTP code snippet generator for native Go.
 *
 * @author
 * @montanaflynn
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

'use strict'

const CodeBuilder = require('../../helpers/code-builder')

module.exports = function (source, options) {
  // Let's Go!
  const code = new CodeBuilder('\t')

  // Define Options
  const opts = Object.assign({
    showBoilerplate: true,
    checkErrors: false,
    printBody: true,
    timeout: -1
  }, options)

  const errorPlaceholder = opts.checkErrors ? 'err' : '_'

  const indent = opts.showBoilerplate ? 1 : 0

  const errorCheck = function () {
    if (opts.checkErrors) {
      code.push(indent, 'if err != nil {')
        .push(indent + 1, 'panic(err)')
        .push(indent, '}')
    }
  }

  // Create boilerplate
  if (opts.showBoilerplate) {
    code.push('package main')
      .blank()
      .push('import (')
      .push(indent, '"fmt"')

    if (opts.timeout > 0) {
      code.push(indent, '"time"')
    }

    if (opts.insecureSkipVerify) {
      code.push(indent, '"crypto/tls"')
    }

    if (source.postData.text) {
      code.push(indent, '"strings"')
    }

    code.push(indent, '"net/http"')

    if (opts.printBody) {
      code.push(indent, '"io/ioutil"')
    }

    code.push(')')
      .blank()
      .push('func main() {')
      .blank()
  }

  // Create an insecure transport for the client
  if (opts.insecureSkipVerify) {
    code.push(indent, 'insecureTransport := http.DefaultTransport.(*http.Transport).Clone()')
    code.push(indent, 'insecureTransport.TLSClientConfig = &tls.Config{InsecureSkipVerify: true}')
  }

  // Create client
  let client
  if (opts.timeout > 0 || opts.insecureSkipVerify) {
    client = 'client'
    code.push(indent, 'client := http.Client{')

    if (opts.timeout > 0) {
      code.push(indent + 1, 'Timeout: time.Duration(%s * time.Second),', opts.timeout)
    }

    if (opts.insecureSkipVerify) {
      code.push(indent + 1, 'Transport: insecureTransport,')
    }

    code.push(indent, '}')
    code.blank()
  } else {
    client = 'http.DefaultClient'
  }

  code.push(indent, 'url := "%q"', source.fullUrl)
    .blank()

  // If we have body content or not create the var and reader or nil
  if (source.postData.text) {
    code.push(indent, 'payload := strings.NewReader(%s)', JSON.stringify(source.postData.text))
      .blank()
      .push(indent, 'req, %s := http.NewRequest("%q", url, payload)', errorPlaceholder, source.method)
      .blank()
  } else {
    code.push(indent, 'req, %s := http.NewRequest("%q", url, nil)', errorPlaceholder, source.method)
      .blank()
  }

  errorCheck()

  // Add headers
  if (Object.keys(source.allHeaders).length) {
    Object.keys(source.allHeaders).forEach(function (key) {
      code.push(indent, 'req.Header.Add("%q", "%q")', key, source.allHeaders[key])
    })

    code.blank()
  }

  // Make request
  code.push(indent, 'res, %s := %s.Do(req)', errorPlaceholder, client)
  errorCheck()

  // Get Body
  if (opts.printBody) {
    code.blank()
      .push(indent, 'defer res.Body.Close()')
      .push(indent, 'body, %s := ioutil.ReadAll(res.Body)', errorPlaceholder)
    errorCheck()
  }

  // Print it
  code.blank()
    .push(indent, 'fmt.Println(res)')

  if (opts.printBody) {
    code.push(indent, 'fmt.Println(string(body))')
  }

  // End main block
  if (opts.showBoilerplate) {
    code.blank()
      .push('}')
  }

  return code.join()
}

module.exports.info = {
  key: 'native',
  title: 'NewRequest',
  link: 'http://golang.org/pkg/net/http/#NewRequest',
  description: 'Golang HTTP client request'
}
