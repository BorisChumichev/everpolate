![everpolate](https://raw.githubusercontent.com/BorisChumichev/everpolate/master/everpolate-logo.png)

#### Synopsis

*Everpolate* provides a set of common interpolation algorithms implementations. Implementations given for interpolation are also implementations for extrapolation. Since it's written in JavaScript, *everpolate* could be used for web browser, Node.js and so forth. 

#### Features:

* Polynomial Interpolation
* Linear Interpolation

#### Not implemented yet:

* Rational Function Interpolation 
* Cubic Spline Interpolation
* Multidimensional Interpolation
* Neural Network-based Interpolation

## Documatation
#### Polynomial Interpolation
#####`polynomial(pointsToEvaluate, functionValuesX, functionValuesY)`
Implements [Neville’s Iterated Interpolation algorithm](http://en.wikipedia.org/wiki/Neville's_algorithm). Evaluates the interpolating polynomial on the set of distinct numbers 'x0,..., xn' at the
number 'x' for the function 'f'.

**Parameters:**
* `pointsToEvaluate` - Array or Number
* `functionValuesX` - Array
* `functionValuesY` - Array

**Returns:** Array

```javascript
var polynomial = require('everpolate').polynomial
//interpolation
polynomial([0.021, 0.022], [0, 1.1, 2.4], [12, 431, 39])
// → [ 26.442248863636365, 27.123719230769233 ]
//for extrapolation use same syntax
polynomial([3], [0, 1, 2], [1, 3, 2]) 
// → [-2]
```

#### Linear Interpolation
#####`linear(pointsToEvaluate, functionValuesX, functionValuesY)`
Evaluates interpolating line (or lines) on the set of distinct numbers 'x0,..., xn' at the
number 'x' for the function 'f'.

**Parameters:**
* `pointsToEvaluate` - Array or Number
* `functionValuesX` - Array
* `functionValuesY` - Array

**Returns:** Array

```javascript
var polynomial = require('everpolate').polynomial
//interpolation
linear([2, 0, 8], [-2, 0, 6, 8], [4, 0, 3, -3])
// → [1, 0, -3]
//extrapolation works as well
linear(3, [0, 1, 2], [1, 3, 2]), 
// → [1]

