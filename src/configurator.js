/* global define */
;(function (root, factory) {
  if (typeof define === 'function') {
    // Now we're wrapping the factory and assigning the return
    // value to the root (window) and returning it as well to
    // the AMD loader.
    if (define.amd) {
      define(['./polyfill/object/create'], function (inherits) {
        return (root.Class = factory(inherits))
      })
    }
    if (define.cmd) {
      define(function (require, exports, module) {
        return (root.Class = factory(require('./polyfill/object/create')))
      })
    }
  } else if (typeof module === 'object' && module.exports) {
    // I've not encountered a need for this yet, since I haven't
    // run into a scenario where plain modules depend on CommonJS
    // *and* I happen to be loading in a CJS browser environment
    // but I'm including it for the sake of being thorough
    module.exports = (root.Class = factory(require('./polyfill/object/create')))
  } else {
    root.Class = factory()
  }
}(this, function (create) {
  var Configurator = function (cls) {
    var me = this
    var prototype = cls.prototype
    var superCfg = cls.__super__ ? cls.__super__.constructor.$config : null
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
      me.configs = Object.create(superCfg.configs)
      /**
       * This object holds a bool value for each cachedConfig property keyed by name.
       * 
       * This map is maintained as each property is added via the `add` method.
       * 
       * @property {Object} cachedConfigs
       * @private
       * @readonly
       */
      me.cachedConfigs = Object.create(superCfg.cachedConfigs)
      /**
       * This object holds a `Number` for each config property keyed by name. This object has
       * as its prototype object the `initMap` of its super class. The value of each property
       * has the following meaning:
       * 
       *   * `0` - initial value is `null` and requires no processing.
       *   * `1` - initial value must be set on each instance.
       *   * `2` - initial value can be cached on the prototype by the first instance.
       *
       * Any `null` values will either never be added to this map or (if added by a base
       * class and set to `null` by a derived class) will cause the entry to be 0.
       * 
       * This map is maintained as each property is added via the `add` method.
       * 
       * @property {Object} initMap
       * @private
       * @readonly
       */
      me.initMap = Object.create(superCfg.initMap)
      /**
       * This object holds the default value for each config property keyed by name. This
       * object has as its prototype object the `values` of its super class.
       * 
       * This map is maintained as each property is added via the `add` method.
       * 
       * @property {Object} values
       * @private
       * @readonly
       */
      me.values = Object.create(superCfg.values)
      me.needsFork = superCfg.needsFork;
      // The reason this feature is debug only is that we would have to create this
      // map for all classes because deprecations could be added to bases after the
      // derived class had created its Configurator.
      me.deprecations = Object.create(superCfg.deprecations)
    } else {
      me.configs = {}
      me.cachedConfigs = {}
      me.initMap = {}
      me.values = {}
      me.deprecations = {}
    }
    prototype.config = prototype.defaultConfig = me.values
    cls.$config = me
  }
  Configurator.prototype = {
    configure: function (instance, instanceConfig) {

    }
  }
  return Configurator
}))