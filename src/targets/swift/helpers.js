'use strict'

const util = require('util')
const { escape } = require('../../helpers/format')

/**
 * Create an string of given length filled with blank spaces
 *
 * @param {number} length Length of the array to return
 * @param {string} str String to pad out with
 * @return {string}
 */
function buildString (length, str) {
  return Array.apply(null, new Array(length)).map(String.prototype.valueOf, str).join('')
}

/**
 * Create a string corresponding to a Dictionary or Array literal representation with pretty option
 * and indentation.
 */
function concatArray (arr, pretty, indentation, indentLevel) {
  const currentIndent = buildString(indentLevel, indentation)
  const closingBraceIndent = buildString(indentLevel - 1, indentation)
  const join = pretty ? ',\n' + currentIndent : ', '

  if (pretty) {
    return '[\n' + currentIndent + arr.join(join) + '\n' + closingBraceIndent + ']'
  } else {
    return '[' + arr.join(join) + ']'
  }
}

module.exports = {
  /**
   * Create a string corresponding to a valid declaration and initialization of a Swift array or dictionary literal
   *
   * @param {string} name Desired name of the instance
   * @param {Object} parameters Key-value object of parameters to translate to a Swift object litearal
   * @param {Object} opts Target options
   * @return {string}
   */
  literalDeclaration: function (name, parameters, opts) {
    return util.format('let %s = %s', name, this.literalRepresentation(parameters, opts))
  },

  /**
   * Create a valid Swift string of a literal value according to its type.
   *
   * @param {*} value Any JavaScript literal
   * @param {Object} opts Target options
   * @return {string}
   */
  literalRepresentation: function (value, opts, indentLevel) {
    indentLevel = indentLevel === undefined ? 1 : indentLevel + 1

    switch (Object.prototype.toString.call(value)) {
      case '[object Number]':
        return value

      case '[object Array]': {
        // Don't prettify arrays nto not take too much space
        let pretty = false
        const valuesRepresentation = value.map(function (v) {
          // Switch to prettify if the value is a dictionary with multiple keys
          if (Object.prototype.toString.call(v) === '[object Object]') {
            pretty = Object.keys(v).length > 1
          }
          return this.literalRepresentation(v, opts, indentLevel)
        }.bind(this))
        return concatArray(valuesRepresentation, pretty, opts.indent, indentLevel)
      }

      case '[object Object]': {
        const keyValuePairs = []
        for (const k in value) {
          keyValuePairs.push(
            util.format('%s: %s',
              this.literalRepresentation(k, opts, indentLevel),
              this.literalRepresentation(value[k], opts, indentLevel)
            )
          )
        }
        return concatArray(keyValuePairs, opts.pretty && keyValuePairs.length > 1, opts.indent, indentLevel)
      }

      case '[object Boolean]':
        return value.toString()

      default:
        if (value === null || value === undefined) {
          return ''
        }
        return '"' + escape(value.toString()) + '"'
    }
  }
}
