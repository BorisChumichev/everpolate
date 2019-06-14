'use strict';

var assert = require("chai").assert
  , step = require("../lib/everpolate.js").step

describe('Step interpolation function', function () {

  it('Evaluates interpolating step function at the number \'x\'', function(){
    assert.deepEqual( step(0.5, [0, 1, 2], [1, 3, 2]), [1])
  })

  it('Evaluates interpolating step function at the set of numbers \'x1, x2,..., xn\'', function () {
    assert.deepEqual( step([-12, 3.3, 9], [-2, 0, 6, 8], [4, 0, 3, -3]), [4, 0, -3])
  })

  it('Evaluates interpolating step function at the number \'x\' when useRightBorder=true', function(){
    assert.deepEqual( step(0.5, [0, 1, 2], [1, 3, 2], true), [3])
  })

  it('Evaluates interpolating step function at the set of numbers \'x1, x2,..., xn\' when useRightBorder=true', function () {
    assert.deepEqual( step([-12, 3.3, 9], [-2, 0, 6, 8], [4, 0, 3, -3], true), [4, 3, -3])
  })

})
