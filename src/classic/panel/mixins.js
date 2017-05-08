/**
 * @author nttdocomo
 */
/* global define */
(function (root, factory) {
  if (typeof define === 'function') {
    if (define.amd) {
      define(['../../taurus'], factory)
    }
    if (define.cmd) {
      define(function (require, exports, module) {
        return factory(require('../../taurus'))
      })
    }
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('../../taurus'))
  }
}(this, function (taurus) {
  var Panel = function () {}
  Panel.prototype = {
    addRowTpl: function (newTpl) {
      return this.insertTpl('rowTpl', newTpl)
    }
  }
  return Panel
}))
