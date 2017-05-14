/* global define */
;(function (root, factory) {
  if (typeof define === 'function') {
    if (define.amd) {
      define(['../mixin'], factory)
    }
    if (define.cmd) {
      define(function (require, exports, module) {
        return factory(require('../mixin'))
      })
    }
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory()
  }
}(this, function (mixin) {
  var Renderable = mixin({
    render: function (container, position) {}
  })
  return Renderable
}))
