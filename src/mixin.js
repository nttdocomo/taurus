/**
 * @author nttdocomo
 */
 /* global define */
(function (root, factory) {
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
  var mixin = function (protoProps, classProps) {
    return function (superclass) {
      return superclass.extend(protoProps, classProps)
    }
  }
  return mixin
}))
