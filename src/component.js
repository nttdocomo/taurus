/* global define */
;(function (root, factory) {
  if (typeof define === 'function') {
    if (define.amd) {
      define(['./class', './util/renderable', 'underscore'], factory)
    }
    if (define.cmd) {
      define(function (require, exports, module) {
        return factory(require('./class'), require('./util/renderable'), require('underscore'))
      })
    }
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('../class'), require('./util/renderable'), require('underscore'))
  }
}(this, function (Class, Renderable, _) {
  return mix(Class).with(Renderable).extend({
    init: function(config){
      var me = this

      config = config || {}

      if (config.initialConfig) {
        // Being initialized from an Ext.Action instance...
        if (config.isAction) {
          me.baseAction = config
        }
        config = config.initialConfig
        // component cloning / action set up
      } else if (config.tagName || config.dom || _.isString(config)) {
        // element object
        config = {
          applyTo: config,
          id: config.id || config
        }
      }
      me.initialConfig = config

      me.$iid = _.uniqueId('view')
    }
  })
}))
