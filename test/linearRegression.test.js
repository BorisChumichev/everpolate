'use strict';

var assert = require("chai").assert
  , linearRegression = require("../lib/everpolate.js").linearRegression

describe('Linear regression function', function () {

  var xValues = [0, 1, 2, 3, 4, 5]
    , yValues = [2, 3, 4, 5, 6, 7]
    , regression = linearRegression(xValues, yValues)

  it('Returns an object with slope, intercept and rSquared properties', function(){
    assert.strictEqual(regression.slope, 1)
    assert.strictEqual(regression.intercept, 2)
    assert.strictEqual(regression.rSquared, 1)
  })

  it('Returns a function which computes regression at a given x-value', function () {
    assert.deepEqual(regression.evaluate(2), [4])
  })

  it('Returns a function which computes regression at a set of x-values', function () {
    assert.deepEqual(regression.evaluate([2, 3.5]), [4, 5.5])
  })

})
