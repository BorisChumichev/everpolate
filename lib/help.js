'use strict';

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
  var indexOfNumberToCompare 
    , leftBorderIndex = 0
    , rightBorderIndex = intervals.length - 1
  //Reduce searching range till it find an interval point belongs to using binary search
  while (rightBorderIndex - leftBorderIndex !== 1) {
    indexOfNumberToCompare = leftBorderIndex + Math.floor((rightBorderIndex - leftBorderIndex)/2)
    point >= intervals[indexOfNumberToCompare]
      ? leftBorderIndex = indexOfNumberToCompare
      : rightBorderIndex = indexOfNumberToCompare
  }
  return leftBorderIndex
}