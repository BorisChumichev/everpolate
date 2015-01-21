'use strict';

var assert = require("chai").assert
  , polynomial = require("../lib/everpolate.js").polynomial

describe('Polynomial interpolation function', function() {

  it('Evaluates interpolating polynomial at the number \'x\'', function(){
    assert.deepEqual( polynomial(3, [0, 1, 2], [1, 3, 2]), [-2])
  })

  it('Evaluates interpolating polynomial at the set of numbers \'x1, x2,..., xn\'', function(){
    assert.deepEqual( polynomial([3, 0], [0, 1, 2], [1, 3, 2]), [-2, 1])
  })

})

