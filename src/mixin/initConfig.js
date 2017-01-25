/**
 * @author nttdocomo
 */
/* global define */
;(function (root, factory) {
  if (typeof define === 'function') {
    if (define.amd) {
      define(['../define', '../taurus'], factory)
    }
    if (define.cmd) {
      define(function (require, exports, module) {
        return factory(require('../define'), require('../taurus'))
      })
    }
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('../define'), require('../taurus'))
  }
}(this, function (define, Tau) {
  return {
    configClass: Tau.emptyFn,
    initConfigMap: {},
    initConfigList: [],
    defaultConfig: {},
    beforeInitConfig: function () {},
    initConfig: function (instanceConfig) {
      var me = this
      var configNameCache = define.configNameCache
      // var prototype = me.constructor.prototype
      var initConfigList = me.initConfigList
      var initConfigMap = this.initConfigMap
      var ConfigClass = me.configClass
      var config = new ConfigClass()
      var defaultConfig = me.defaultConfig
      var nameMap, getName
      me.initConfig = function () {}
      me.config = config
      if (instanceConfig) {
        initConfigList = initConfigList.slice()
        for (var name in instanceConfig) {
          value = instanceConfig[name];
          cfg = config[name];
          if(!cfg){
            me[name] = value;
          } else {
            if (name in defaultConfig && !initConfigMap[name]) {
              initConfigList.push(name)
            }
          }
        }
      }
      if (instanceConfig) {
        _.extend(config, instanceConfig)
      }
      // Point all getters to the initGetters
      for (var i = 0, ln = initConfigList.length; i < ln; i++) {
        name = initConfigList[i]
        nameMap = configNameCache[name]
        me[nameMap.get] = me[nameMap.initGet]
      }
      me.beforeInitConfig(config)
      for (i = 0, ln = initConfigList.length; i < ln; i++) {
        name = initConfigList[i]
        nameMap = configNameCache[name]
        getName = nameMap.get

        if (me.hasOwnProperty(getName)) {
          me[nameMap.set](config[name])
          delete me[getName]
        }
      }
    }
  }
}))
