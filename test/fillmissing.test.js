'use strict';

var assert = require("chai").assert
  , value = require("../lib/everpolate.js").value

describe('Value interpolation function', function () {

  it('Evaluates value interpolation function at the number \'x\' where there is no existing value at \'x\'', function(){
    assert.deepEqual( value(0.5, [0, 1, 2], [1, 3, 2]), [undefined])
  })

  it('Evaluates value interpolation function at the number \'x\' where there is an existing value at \'x\'', function(){
    assert.deepEqual( value(0.5, [0, 0.5, 1, 2], [1, 1.7, 3, 2]), [1.7])
  })

  it('Evaluates value interpolation function at the set of numbers \'x1, x2,..., xn\'', function () {
    assert.deepEqual( value([-12, 3.3, 9], [-12, -2, 0, 3.3, 6, 8], [10, 4, 0, 1, 3, -3]), [10, 1, undefined])
  })

  it('Evaluates value interpolation function at the number \'x\' where there is no existing value at \'x\' and fillValue=12345', function(){
    assert.deepEqual( value(0.5, [0, 1, 2], [1, 3, 2], 12345), [12345])
  })

  it('Evaluates value interpolation function at the number \'x\' where there is an existing value at \'x\' and fillValue=12345', function(){
    assert.deepEqual( value(0.5, [0, 0.5, 1, 2], [1, 1.7, 3, 2], 12345), [1.7])
  })

  it('Evaluates value interpolation function at the set of numbers \'x1, x2,..., xn\' when fillValue=12345', function () {
    assert.deepEqual( value([-12, 3.3, 9], [-12, -2, 0, 3.3, 6, 8], [10, 4, 0, 1, 3, -3], 12345), [10, 1, 12345])
  })

})
