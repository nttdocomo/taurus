/**
 * @author nttdocomo
 */
/* global define */
;(function (root, factory) {
  if (typeof define === 'function') {
    if (define.amd) {
      define(['../lang/object/chain'], factory)
    }
    if (define.cmd) {
      define(function (require, exports, module) {
        return factory(require('../lang/object/chain'))
      })
    }
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('../lang/object/chain'))
  }
}(this, function (chain) {
  var Configurator = function (cls) {
    var me = this
    var prototype = cls.prototype
    var superCfg = cls.constructor.__super__ ? cls.constructor.__super__.$config : null
    /**
     * @property {Ext.Class} cls The class to which this instance is associated.
     * @private
     * @readonly
     */
    me.cls = cls

    /**
     * The super class `Configurator` instance or `null` if there is no super class.
     *
     * @property {Ext.Configurator} superCfg
     * @private
     * @readonly
     */
    me.superCfg = superCfg
    if (superCfg) {
      /**
       * This object holds an `Ext.Config` value for each config property keyed by name.
       * This object has as its prototype object the `configs` of its super class.
       *
       * This map is maintained as each property is added via the `add` method.
       *
       * @property {Object} configs
       * @private
       * @readonly
       */
      me.configs = chain(superCfg.configs)
    } else {
      me.configs = {}
    }
  }
  Configurator.prototype = {
    /**
     * This method configures the given `instance` using the specified `instanceConfig`.
     * The given `instance` should have been created by this object's `cls`.
     *
     * @param {Object} instance The instance to configure.
     * @param {Object} instanceConfig The configuration properties to apply to `instance`.
     * @private
     */
    configure: function (instance, instanceConfig) {}
  }
  return Configurator
}))
