'use strict';

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
 * @param {Boolean} useRightBorder
 * @returns {Array}
 */

function step (pointsToEvaluate, functionValuesX, functionValuesY, useRightBorder) {
  return help.makeItArrayIfItsNot(pointsToEvaluate).map(function (point) {
    return functionValuesY[help.findIntervalBorderIndex(point, functionValuesX, useRightBorder)]
  })
}
