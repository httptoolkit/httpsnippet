'use strict'

const util = require('util')

function concatValues (
  concatType,
  values,
  pretty,
  indentation,
  indentLevel
) {
  const currentIndent = indentation.repeat(indentLevel)
  const closingBraceIndent = indentation.repeat(indentLevel - 1)
  const join = pretty ? `,\n${currentIndent}` : ', '
  const openingBrace = concatType === 'object' ? 'json!({' : '('
  const closingBrace = concatType === 'object' ? '})' : ')'

  if (pretty) {
    return `${openingBrace}\n${currentIndent}${values.join(
      join
    )}\n${closingBraceIndent}${closingBrace}`
  }

  return `${openingBrace}${values.join(join)}${closingBrace}`
}

/**
 * Create a valid Rust string of a literal value using serde_json according to its type.
 *
 * @param {*} value Any Javascript literal
 * @param {Object} opts Target options
 * @return {string}
 */
exports.literalRepresentation = (
  value,
  opts,
  indentLevel
) => {
  /*
   * Note: this version is almost entirely borrowed from the Python client helper. The
   * only real modification involves the braces and the types. The helper
   * could potentially be parameterised for reuse.
   */
  indentLevel = indentLevel === undefined ? 1 : indentLevel + 1

  switch (Object.prototype.toString.call(value)) {
    case '[object Number]':
      return value

    case '[object Array]': {
      let pretty = false
      const valuesRep = value.map(v => {
        // Switch to prettify if the value is a dict with more than one key.
        if (Object.prototype.toString.call(v) === '[object Object]') {
          pretty = Object.keys(v).length > 1
        }
        return exports.literalRepresentation(v, opts, indentLevel)
      })
      return concatValues('array', valuesRep, pretty, opts.indent, indentLevel)
    }

    case '[object Object]': {
      const keyValuePairs = []
      for (const k in value) {
        keyValuePairs.push(
          util.format('%s: %s',
            exports.literalRepresentation(k, opts, indentLevel),
            exports.literalRepresentation(value[k], opts, indentLevel)
          )
        )
      }
      return concatValues(
        'object',
        keyValuePairs,
        opts.pretty && keyValuePairs.length > 1,
        opts.indent,
        indentLevel
      )
    }

    case '[object Null]':
      return 'json!(null)'

    case '[object Boolean]':
      return value ? 'true' : 'false'

    default:
      if (value === null || value === undefined) {
        return ''
      }
      return JSON.stringify(value)
  }
}
