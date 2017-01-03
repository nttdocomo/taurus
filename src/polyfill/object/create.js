/*global define*/
;(function (root, factory) {
  if (typeof define === 'function') {
    if (define.amd) {
      define(factory)
    }
    if (define.cmd) {
      define(function (require, exports, module) {
        return factory()
      })
    }
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory()
  }
}(this, function () {
  if (typeof Object.create !== 'function') {
    Object.create = (function () {
      var Temp = function () {}
      return function (prototype) {
        if (arguments.length > 1) {
          throw Error('Second argument not supported')
        }
        if (typeof prototype !== 'object') {
          throw TypeError('Argument must be an object')
        }
        Temp.prototype = prototype
        var result = new Temp()
        Temp.prototype = null
        return result
      }
    })()
  }
  return Object.create
}))
