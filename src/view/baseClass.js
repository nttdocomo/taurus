/**
 * @author nttdocomo
 */
/*global define*/
;(function (root, factory) {
  if (typeof define === 'function') {
    if (define.amd) {
      define(['backbone', '../mixin/initConfig', 'backbone-super', '../mixins'], factory)
    }
    if (define.cmd) {
      define(function (require, exports, module) {
        return factory(require('backbone'), require('../mixin/initConfig'), require('backbone-super'), require('../mixins'))
      })
    }
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('backbone'), require('../mixin/initConfig'), require('backbone-super'), require('../mixins'))
  }
}(this, function (Backbone, initConfig) {
  return Backbone.View.extend(initConfig)
}))
