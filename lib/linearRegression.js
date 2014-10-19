'use strict'

module.exports = linearRegression

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
  regression.evaluate = function (x) {
    return this.slope*x + this.intercept
  }

  return regression
}
