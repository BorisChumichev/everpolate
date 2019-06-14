'use strict';

var assert = require("chai").assert
  , exponential = require("../lib/everpolate.js").exponential

describe('Exponential interpolation function', function () {

  it('Evaluates interpolating value at the number \'x\'', function(){
    assert.deepEqual( exponential(2, [1, 3, 7], [1, 5, 10]), [2.23606797749979])
  })

  it('Evaluates interpolating value on curves between the set of numbers \'x1, x2,..., xn\'', function () {
    assert.deepEqual( exponential([1, 2, 3, 4, 5, 6, 7], [1, 3, 7], [1, 5, 10]), [1, 2.23606797749979, 5, 5.946035575013605, 7.0710678118654755, 8.408964152537145, 10])
  })

})
