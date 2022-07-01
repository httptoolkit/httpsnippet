const util = require('util')

exports.escape = function escape (value, options) {
  // The JSON-stringify string serialization algorithm, but generalized for string delimiters
  // (e.g. " or ') and different escape characters (e.g. Powershell uses `)
  // https://tc39.es/ecma262/multipage/structured-data.html#sec-quotejsonstring
  const {
    delimiter = '"',
    escapeChar = '\\',
    escapeNewlines = true
  } = options || {}

  return [...value].map((c) => {
    if (c === '\b') {
      return escapeChar + 'b'
    } else if (c === '\t') {
      return escapeChar + 't'
    } else if (c === '\n') {
      if (escapeNewlines) {
        return escapeChar + 'n'
      } else {
        return c // Don't just continue, or this is caught by < \u0020
      }
    } else if (c === '\f') {
      return escapeChar + 'f'
    } else if (c === '\r') {
      if (escapeNewlines) {
        return escapeChar + 'r'
      } else {
        return c // Don't just continue, or this is caught by < \u0020
      }
    } else if (c === escapeChar) {
      return escapeChar + escapeChar
    } else if (c === delimiter) {
      return escapeChar + delimiter
    } else if (c < '\u0020' || c > '\u007E') {
      // Delegate the trickier non-ASCII cases to the normal algorithm. Some of these are escaped as
      // \uXXXX, whilst others are represented literally. Since we're using this primarily for header
      // values that are generally (though not strictly?) ASCII-only, this should almost never happen.
      return JSON.stringify(c).slice(1, -1)
    } else {
      return c
    }
  }).join('')
}

function doubleQuoteEscape (value) {
  return exports.escape(value, { delimiter: '"' })
}

function singleQuoteEscape (value) {
  return exports.escape(value, { delimiter: "'" })
}

/**
 * Wraps the `util.format` function and adds the %qd, %qs and %v format options,
 * where `%qd` escapes characters for a single-line double-quoted string, `%qs`
 * escapes characters for a single-line single-quoted string, and `%v`
 * JSON-stringifies the value.
 *
 * @param {string} value
 * @param  {...string} format
 *
 * @returns {string} Formatted string
 */
exports.format = function format (value, ...format) {
  if (typeof value !== 'string') return ''

  let i = 0
  value = value.replace(/(?<!%)%([sdifjoOcv]|q[sd])/g, (m) => {
    // JSON-stringify
    if (m === '%v') {
      const [elem] = format.splice(i, 1)
      return JSON.stringify(elem)
    }
    // Escape for double-quoted string
    if (m === '%qd') {
      const [elem] = format.splice(i, 1)
      return doubleQuoteEscape(elem)
    }
    // Escape for single-quoted string
    if (m === '%qs') {
      const [elem] = format.splice(i, 1)
      return singleQuoteEscape(elem)
    }
    i += 1
    return m
  })

  const ret = util.format(value, ...format)
  return ret
}
