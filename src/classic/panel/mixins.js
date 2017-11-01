/**
 * @author nttdocomo
 */
/* global define */
(function (root, factory) {
  if (typeof define === 'function') {
    if (define.amd) {
      define(['../../mixin/mixin'], factory)
    }
    if (define.cmd) {
      define(function (require, exports, module) {
        return factory(require('../../mixin/mixin'))
      })
    }
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('../../mixin/mixin'))
  }
}(this, function (mixin) {
  return mixin({
    addRowTpl: function (newTpl) {
      return this.insertTpl('rowTpl', newTpl)
    }
  })
}))
