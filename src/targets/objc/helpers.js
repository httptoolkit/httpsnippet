'use strict'

const util = require('util')

const { escape } = require('../../helpers/format')

module.exports = {
  /**
   * Create an string of given length filled with blank spaces
   *
   * @param {number} length Length of the array to return
   * @return {string}
   */
  blankString: function (length) {
    return Array.apply(null, new Array(length)).map(String.prototype.valueOf, ' ').join('')
  },

  /**
   * Create a string corresponding to a valid declaration and initialization of an Objective-C object literal.
   *
   * @param {string} nsClass Class of the litteral
   * @param {string} name Desired name of the instance
   * @param {Object} parameters Key-value object of parameters to translate to an Objective-C object litearal
   * @param {boolean} indent If true, will declare the litteral by indenting each new key/value pair.
   * @return {string} A valid Objective-C declaration and initialization of an Objective-C object litteral.
   *
   * @example
   *   nsDeclaration('NSDictionary', 'params', {a: 'b', c: 'd'}, true)
   *   // returns:
   *   NSDictionary *params = @{ @"a": @"b",
   *                             @"c": @"d" };
   *
   *   nsDeclaration('NSDictionary', 'params', {a: 'b', c: 'd'})
   *   // returns:
   *   NSDictionary *params = @{ @"a": @"b", @"c": @"d" };
   */
  nsDeclaration: function (nsClass, name, parameters, indent) {
    const opening = nsClass + ' *' + name + ' = '
    const literal = this.literalRepresentation(parameters, indent ? opening.length : undefined)
    return opening + literal + ';'
  },

  /**
   * Create a valid Objective-C string of a literal value according to its type.
   *
   * @param {*} value Any JavaScript literal
   * @return {string}
   */
  literalRepresentation: function (value, indentation) {
    const join = indentation === undefined ? ', ' : ',\n   ' + this.blankString(indentation)

    switch (Object.prototype.toString.call(value)) {
      case '[object Number]':
        return '@' + value

      case '[object Array]': {
        const valuesRepresentation = value.map(function (v) {
          return this.literalRepresentation(v)
        }.bind(this))
        return '@[ ' + valuesRepresentation.join(join) + ' ]'
      }

      case '[object Object]': {
        const keyValuePairs = []
        for (const k in value) {
          keyValuePairs.push(util.format('@"%s": %s', k, this.literalRepresentation(value[k])))
        }
        return '@{ ' + keyValuePairs.join(join) + ' }'
      }

      case '[object Boolean]':
        return value ? '@YES' : '@NO'

      default:
        if (value === null || value === undefined) {
          return ''
        }
        return '@"' + escape(value.toString(), { delimiter: '"' }) + '"'
    }
  }
}
