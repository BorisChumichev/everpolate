'use strict';

var help = require('./help')

module.exports = evaluatePolynomial

/**
 * Evaluates interpolating polynomial at the set of numbers
 * or at a single number for the function y=f(x)
 *
 * @param {Number|Array} pointsToEvaluate     number or set of numbers
 *                                            for which polynomial is calculated
 * @param {Array} functionValuesX             set of distinct x values
 * @param {Array} functionValuesY             set of distinct y=f(x) values
 * @returns {Array}                           interpolating polynomial
 */

 function evaluatePolynomial (pointsToEvaluate, functionValuesX, functionValuesY) {
  var results = []
  pointsToEvaluate = help.makeItArrayIfItsNot(pointsToEvaluate)
  // evaluate the interpolating polynomial for each point
  pointsToEvaluate.forEach(function (point) {
    results.push(nevillesIteratedInterpolation(point, functionValuesX, functionValuesY))
  })
  return results
}

/**
 * Neville's Iterated Interpolation algorithm implementation
 * http://en.wikipedia.org/wiki/Neville's_algorithm <- for reference
 *
 * @param {Number} x                           number for which polynomial is calculated
 * @param {Array} X                            set of distinct x values
 * @param {Array} Y                            set of distinct y=f(x) values
 * @returns {number}                           interpolating polynomial
 */

function nevillesIteratedInterpolation (x, X, Y) {
  var Q = [Y]
  for (var i = 1; i < X.length; i++) {
    Q.push([])
    for (var j = 1; j <= i; j++) {
      Q[j][i] = ((x-X[i-j])*Q[j-1][i] - (x-X[i])*Q[j-1][i-1])/( X[i] - X[i-j] )
    }
  }
  return Q[j-1][i-1]
}
