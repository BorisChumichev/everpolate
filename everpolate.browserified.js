!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.everpolate=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict'

// Expose module API:

module.exports.polynomial = require('./polynomial.js')
module.exports.linear = require('./linear.js')
module.exports.linearRegression = require('./linearRegression.js')
module.exports.step = require('./step.js')

},{"./linear.js":3,"./linearRegression.js":4,"./polynomial.js":5,"./step.js":6}],2:[function(require,module,exports){
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

/**
 *
 * Utilizes bisection method to search an interval to which
 * point belongs to, then returns an index of left border
 * of the interval
 *
 * @param {Number} point
 * @param {Array} intervals
 * @returns {Number}
 */

module.exports.findIntervalLeftBorderIndex = function (point, intervals) {
  //If point is beyond given intervals
  if (point < intervals[0])
    return 0
  if (point > intervals[intervals.length - 1])
    return intervals.length - 1
  //If point is inside interval
  //Start searching on a full range of intervals
  var leftBorderIndex = 0
  var rightBorderIndex = intervals.length - 1
  //Reduce searching range till it find an interval point belongs to using binary search
  while (rightBorderIndex - leftBorderIndex !== 1) {
    var indexOfNumberToCompare = leftBorderIndex + Math.floor((rightBorderIndex - leftBorderIndex)/2)
    point >= intervals[indexOfNumberToCompare]
      ? leftBorderIndex = indexOfNumberToCompare
      : rightBorderIndex = indexOfNumberToCompare
  }
  return leftBorderIndex
}
},{}],3:[function(require,module,exports){
'use strict'

var help = require('./help')

module.exports = evaluateLinear

/**
 * Evaluates interpolating line/lines at the set of numbers
 * or at a single number for the function y=f(x)
 *
 * @param {Number|Array} pointsToEvaluate     number or set of numbers
 *                                            for which polynomial is calculated
 * @param {Array} functionValuesX             set of distinct x values
 * @param {Array} functionValuesY             set of distinct y=f(x) values
 * @returns {Array}
 */

function evaluateLinear (pointsToEvaluate, functionValuesX, functionValuesY) {
  var results = []
  pointsToEvaluate = help.makeItArrayIfItsNot(pointsToEvaluate)
  pointsToEvaluate.forEach(function (point) {
    var index = help.findIntervalLeftBorderIndex(point, functionValuesX)
    if (index == functionValuesX.length - 1)
      index--
    results.push(linearInterpolation(point, functionValuesX[index], functionValuesY[index]
      , functionValuesX[index + 1], functionValuesY[index + 1]))
  })
  return results
}

/**
 *
 * Evaluates y-value at given x point for line that passes
 * through the points (x0,y0) and (y1,y1)
 *
 * @param x
 * @param x0
 * @param y0
 * @param x1
 * @param y1
 * @returns {Number}
 */

function linearInterpolation (x, x0, y0, x1, y1) {
  var a = (y1 - y0) / (x1 - x0)
  var b = -a * x0 + y0
  return a * x + b
}

},{"./help":2}],4:[function(require,module,exports){
'use strict'

module.exports = linearRegression

var help = require('./help')

/**
 * Computes Linear Regression slope, intercept, r-squared and returns
 * a function which can be used for evaluating linear regression
 * at a particular x-value
 *
 * @param functionValuesX {Array}
 * @param functionValuesY {Array}
 * @returns {Object}
 */

function linearRegression(functionValuesX, functionValuesY){
  var regression = {}
    , x = functionValuesX
    , y = functionValuesY
    , n = y.length
    , sum_x = 0
    , sum_y = 0
    , sum_xy = 0
    , sum_xx = 0
    , sum_yy = 0

  for (var i = 0; i < y.length; i++) {
    sum_x += x[i]
    sum_y += y[i]
    sum_xy += (x[i]*y[i])
    sum_xx += (x[i]*x[i])
    sum_yy += (y[i]*y[i])
  }

  regression.slope = (n * sum_xy - sum_x * sum_y) / (n*sum_xx - sum_x * sum_x)
  regression.intercept = (sum_y - regression.slope * sum_x)/n
  regression.rSquared = Math.pow((n*sum_xy - sum_x*sum_y)/Math.sqrt((n*sum_xx-sum_x*sum_x)*(n*sum_yy-sum_y*sum_y)),2)
  regression.evaluate = function (pointsToEvaluate) {
    var x = help.makeItArrayIfItsNot(pointsToEvaluate)
      , result = []
      , that = this
    x.forEach(function (point) {
      result.push(that.slope*point + that.intercept)
    })
    return result
  }

  return regression
}

},{"./help":2}],5:[function(require,module,exports){
'use strict'

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

},{"./help":2}],6:[function(require,module,exports){
'use strict'

var help = require('./help')

module.exports = step

/**
 * Evaluates interpolating step function at the set of numbers
 * or at a single number
 *
 * @param {Number|Array} pointsToEvaluate     number or set of numbers
 *                                            for which step is calculated
 * @param {Array} functionValuesX             set of distinct x values
 * @param {Array} functionValuesY             set of distinct y=f(x) values
 * @returns {Array}
 */

function step (pointsToEvaluate, functionValuesX, functionValuesY) {
  var results = []
  pointsToEvaluate = help.makeItArrayIfItsNot(pointsToEvaluate)
  pointsToEvaluate.forEach(function (point) {
    results.push(functionValuesY[help.findIntervalLeftBorderIndex(point, functionValuesX)])
  })
  return results
}

},{"./help":2}]},{},[1])(1)
});