/* global define */
;(function (root, factory) {
  if (typeof define === 'function') {
    if (define.amd) {
      define(['./class', './util/renderable'], factory)
    }
    if (define.cmd) {
      define(function (require, exports, module) {
        return factory(require('./class'), require('./util/renderable'))
      })
    }
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('../class'), require('./util/renderable'))
  }
}(this, function (Class, Renderable) {

}))
