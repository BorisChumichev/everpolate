'use strict';

var help = require('./help')

module.exports = value

/**
 * Evaluates interpolating using a constant value where values are missing
 *
 * @param {Number|Array} pointsToEvaluate     number or set of numbers
 *                                            for which step is calculated
 * @param {Array} functionValuesX             set of distinct x values
 * @param {Array} functionValuesY             set of distinct y=f(x) values
 * @param {Number} fillValue
 * @returns {Array}
 */

function value (pointsToEvaluate, functionValuesX, functionValuesY, fillValue) {
  return help.makeItArrayIfItsNot(pointsToEvaluate).map(function (point) {
    const intervalBorderLeft = help.findIntervalBorderIndex(point, functionValuesX);
    return functionValuesX[intervalBorderLeft] === point ? functionValuesY[intervalBorderLeft] : fillValue;
  })
}
