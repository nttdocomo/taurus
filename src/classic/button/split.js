/**
 * @author nttdocomo
 */
;(function (root, factory) {
  if (typeof define === 'function') {
    if (define.amd) {
      define(['./button', './manager', 'taurus', 'underscore'], factory)
    }
    if (define.cmd) {
      define(function (require, exports, module) {
        return factory(require('./button'), require('./manager'), require('taurus'), require('underscore'))
      })
    }
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('./button'), require('./manager'), require('taurus'), require('underscore'))
  }
}(this, function (Button, ButtonManager, taurus, _) {
  return Button.extend({
    isSplitButton: true,
    split: true
  })
}))
