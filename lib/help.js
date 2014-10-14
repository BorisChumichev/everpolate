'use strict'

/**
 * Makes argument to be an array if it's not
 *
 * @param input
 * @returns {Array}
 */

module.exports.makeItArrayIfItsNot = function (input) {
  return Object.prototype.toString.call( input ) !== '[object Array]'
    ? [input]
    : input
}