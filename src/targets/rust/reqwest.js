/**
 * @description
 * HTTP code snippet generator for Rust using reqwest
 *
 * @author
 * @Benjscho
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

const CodeBuilder = require('../../helpers/code-builder')
const { escape } = require('../../helpers/format')
const { literalRepresentation } = require('./helpers')

module.exports = ({ queryObj, url, postData, allHeaders, method }, options) => {
  const opts = {
    indent: '    ',
    pretty: true,
    ...options
  }

  let indentLevel = 0

  // start snippet
  const code = new CodeBuilder(opts.indent)

  // import reqwest
  code.push(indentLevel, 'use reqwest;')
  code.blank()

  // start async main for tokio
  code.push(indentLevel, '#[tokio::main]')
  code.push(indentLevel, 'pub async fn main() {')
  indentLevel += 1

  // add url
  code.push(indentLevel, `let url = "${url}";`)
  code.blank()

  let hasQuery = false
  // construct query string
  if (Object.keys(queryObj).length) {
    hasQuery = true
    code.push(indentLevel, 'let querystring = [')
    indentLevel += 1
    for (const [key, value] of Object.entries(queryObj)) {
      code.push(indentLevel, `("${escape(key)}", "${escape(value)}"),`)
    }
    indentLevel -= 1
    code.push(indentLevel, '];')
    code.blank()
  }

  // construct payload
  let payload = {}
  const files = {}

  let hasFiles = false
  let hasForm = false
  let hasBody = false
  let jsonPayload = false
  let isMultipart = false
  switch (postData.mimeType) {
    case 'application/json':
      if (postData.jsonObj) {
        code.push(
          indentLevel,
          `let payload = ${literalRepresentation(postData.jsonObj, opts, indentLevel)};`
        )
      }
      jsonPayload = true
      break

    case 'multipart/form-data':
      isMultipart = true

      if (!postData.params) {
        code.push(indentLevel, 'let form = reqwest::multipart::Form::new()')
        code.push(indentLevel + 1, '.text("", "");')
        break
      }

      payload = {}
      postData.params.forEach(p => {
        if (p.fileName) {
          files[p.name] = p.fileName
          hasFiles = true
        } else {
          payload[p.name] = p.value
        }
      })

      if (hasFiles) {
        for (const line of fileToPartString) {
          code.push(indentLevel, line)
        }
        code.blank()
      }
      code.push(indentLevel, 'let form = reqwest::multipart::Form::new()')

      for (const [name, fileName] of Object.entries(files)) {
        code.push(indentLevel + 1, `.part("${name}", file_to_part("${fileName}").await)`)
      }
      for (const [name, value] of Object.entries(payload)) {
        code.push(indentLevel + 1, `.text("${name}", "${value}")`)
      }
      code.pushToLast(';')

      break

    default: {
      if (postData.mimeType === 'application/x-www-form-urlencoded' && postData.paramsObj) {
        code.push(
          indentLevel,
          `let payload = ${literalRepresentation(postData.paramsObj, opts, indentLevel)};`
        )
        hasForm = true
        break
      }

      if (postData.text) {
        code.push(
          indentLevel,
          `let payload = ${literalRepresentation(postData.text, opts, indentLevel)};`
        )
        hasBody = true
        break
      }
    }
  }

  if (hasForm || jsonPayload || hasBody) {
    code.unshift('use serde_json::json;')
    code.blank()
  }

  let hasHeaders = false
  // construct headers
  if (Object.keys(allHeaders).length) {
    hasHeaders = true
    code.push(indentLevel, 'let mut headers = reqwest::header::HeaderMap::new();')
    for (const [key, value] of Object.entries(allHeaders)) {
      // Skip setting content-type if there is a file, as this header will
      // cause the request to hang, and reqwest will set it for us.
      if (key.toLowerCase() === 'content-type' && isMultipart) {
        continue
      }
      code.push(
        indentLevel,
        `headers.insert("${escape(key)}", ${literalRepresentation(value, opts)}.parse().unwrap());`
      )
    }
    code.blank()
  }

  // construct client
  code.push(indentLevel, 'let client = reqwest::Client::new();')

  // construct query
  switch (method) {
    case 'POST':
      code.push(indentLevel, 'let response = client.post(url)')
      break

    case 'GET':
      code.push(indentLevel, 'let response = client.get(url)')
      break

    default: {
      code.push(
        indentLevel,
        `let response = client.request(reqwest::Method::from_str("${method}").unwrap(), url)`
      )
      code.unshift('use std::str::FromStr;')
      break
    }
  }

  if (hasQuery) {
    code.push(indentLevel + 1, '.query(&querystring)')
  }

  if (isMultipart) {
    code.push(indentLevel + 1, '.multipart(form)')
  }

  if (hasHeaders) {
    code.push(indentLevel + 1, '.headers(headers)')
  }

  if (jsonPayload) {
    code.push(indentLevel + 1, '.json(&payload)')
  }

  if (hasForm) {
    code.push(indentLevel + 1, '.form(&payload)')
  }

  if (hasBody) {
    code.push(indentLevel + 1, '.body(payload)')
  }

  // send query
  code.push(indentLevel + 1, '.send()')
  code.push(indentLevel + 1, '.await;')
  code.blank()

  // Print response
  code.push(indentLevel, 'let results = response.unwrap()')
  code.push(indentLevel + 1, '.json::<serde_json::Value>()')
  code.push(indentLevel + 1, '.await')
  code.push(indentLevel + 1, '.unwrap();')
  code.blank()

  code.push(indentLevel, 'dbg!(results);')

  code.push('}\n')

  return code.join()
}

const fileToPartString = [
  'async fn file_to_part(file_name: &\'static str) -> reqwest::multipart::Part {',
  '    let file = tokio::fs::File::open(file_name).await.unwrap();',
  '    let stream = tokio_util::codec::FramedRead::new(file, tokio_util::codec::BytesCodec::new());',
  '    let body = reqwest::Body::wrap_stream(stream);',
  '    reqwest::multipart::Part::stream(body)',
  '        .file_name(file_name)',
  '        .mime_str("text/plain").unwrap()',
  '}'
]

module.exports.info = {
  key: 'reqwest',
  title: 'reqwest',
  link: 'https://docs.rs/reqwest/latest/reqwest/',
  description: 'reqwest HTTP library'
}
