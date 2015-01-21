'use strict';

var assert = require("chai").assert
  , linear = require("../lib/everpolate.js").linear

describe('Linear interpolation function', function () {

  it('Evaluates interpolating line at the number \'x\'', function(){
    assert.deepEqual( linear(3, [0, 1, 2], [1, 3, 2]), [1])
  })

  it('Evaluates interpolating line at the set of numbers \'x1, x2,..., xn\'', function () {
    assert.deepEqual( linear([2, 0, 8], [-2, 0, 6, 8], [4, 0, 3, -3]), [1, 0, -3])
  })

})
