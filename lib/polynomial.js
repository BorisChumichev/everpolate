'use strict'

module.exports = function (x, X, Y) {
  var Q = [Y]
    for (var i = 1; i < X.length; i++) {
      Q.push([])
      for (var j = 1; j <= i; j++) {
        Q[j][i] = ((x-X[i-j])*Q[j-1][i] - (x-X[i])*Q[j-1][i-1])/( X[i] - X[i-j] )
      }
    }
  return Q[j-1][i-1]
}