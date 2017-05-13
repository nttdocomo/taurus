;(function (root, factory) {
  if (typeof define === 'function') {
    if (define.amd) {
      define(['../class'], factory)
    }
    if (define.cmd) {
      define(function (require, exports, module) {
        return factory(require('../class'))
      })
    }
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('../class'))
  }
}(this, function (Class){

}))