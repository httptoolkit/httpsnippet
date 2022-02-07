'use strict'

const formatString = require('./format')

/**
 * Helper object to format and aggragate lines of code.
 * Lines are aggregated in a `code` array, and need to be joined to obtain a proper code snippet.
 *
 * @class
 *
 * @param {string} indentation Desired indentation character for aggregated lines of code
 * @param {string} join Desired character to join each line of code
 */
class CodeBuilder {
  constructor (indentation, join) {
    this.code = []
    this.indentation = indentation
    this.lineJoin = join || '\n'
    this.indentLevel = 0
  }

  /**
   * Increase indentation level
   * @returns {this}
   */
  indent () {
    this.indentLevel++
    return this
  }

  /**
   * Decrease indentation level
   * @returns {this}
   */
  unindent () {
    this.indentLevel--
    return this
  }

  /**
   * Reset indentation level
   * @returns {this}
   */
  reindent () {
    this.indentLevel = 0
    return this
  }

  /**
   * Add given indentation level to given string and format the string (variadic)
   * @param {number} [indentationLevel=0] - Desired level of indentation for this line
   * @param {string} line - Line of code. Can contain formatting placeholders
   * @param {...anyobject} - Parameter to bind to `line`'s formatting placeholders
   * @return {string}
   *
   * @example
   *   var builder = CodeBuilder('\t')
   *
   *   builder.buildLine('console.log("hello world")')
   *   // returns: 'console.log("hello world")'
   *
   *   builder.buildLine(2, 'console.log("hello world")')
   *   // returns: 'console.log("\t\thello world")'
   *
   *   builder.buildLine(2, 'console.log("%q %q")', 'hello', 'world')
   *   // returns: 'console.log("\t\thello world")'
   */
  buildLine (indentationLevel, line, ...format) {
    let lineIndentation = ''
    if (typeof indentationLevel !== 'number') {
      return this.buildLine(0, ...arguments)
    }

    if (!line) return

    indentationLevel += this.indentLevel
    while (indentationLevel > 0) {
      lineIndentation += this.indentation
      indentationLevel--
    }

    // custom format option: escape %q
    line = lineIndentation + line

    return formatString(line, ...format)
  }

  /**
   * Invoke buildLine() and add the line at the top of current lines
   * @param {number} [indentationLevel=0] Desired level of indentation for this line
   * @param {string} line Line of code
   * @return {this}
   */
  unshift () {
    this.code.unshift(this.buildLine.apply(this, arguments))

    return this
  }

  /**
   * Invoke buildLine() and add the line at the bottom of current lines
   * @param {number} [indentationLevel=0] Desired level of indentation for this line
   * @param {string} line Line of code
   * @return {this}
   */
  push () {
    this.code.push(this.buildLine.apply(this, arguments))

    return this
  }

  /**
   * Add an empty line at the end of current lines
   * @return {this}
   */
  blank () {
    this.code.push(null)

    return this
  }

  /**
   * Concatenate all current lines using the given lineJoin
   * @return {string}
   */
  join () {
    return this.code.join(this.lineJoin)
  }
}

module.exports = CodeBuilder
