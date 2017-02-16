/**
 * @author nttdocomo
 */
/* global define */
;(function (root, factory) {
  if (typeof define === 'function') {
    if (define.amd) {
      define(['../taurus', '../lang/object/chain'], factory)
    }
    if (define.cmd) {
      define(function (require, exports, module) {
        return factory(require('../taurus'), require('../lang/object/chain'))
      })
    }
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('../taurus'), require('../lang/object/chain'))
  }
}(this, function (Tau, inherits) {
  var fork = function(obj){
    var ret, key, value;

    if (obj && obj.constructor === Object) {
      ret = Object.chain(obj);

      for (key in obj) {
        value = obj[key];

        if (value) {
          if (value.constructor === Object) {
            ret[key] = fork(value);
          } else if (value instanceof Array) {
            ret[key] = _.clone(value);
          } else {
            ret[key] = value;
          }
        }
      }
    } else {
      ret = obj;
    }

    return ret;
  }
  return {
    configClass: Tau.emptyFn,
    initConfigMap: {},
    initConfigList: [],
    defaultConfig: {},
    beforeInitConfig: function () {},
    initConfig: function (instanceConfig) {
      var me = this
      var configNameCache = inherits.configNameCache
      // var prototype = me.constructor.prototype
      var initConfigList = me.initConfigList
      var initConfigMap = this.initConfigMap
      var config = me.config
      var values = fork(config)
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
      /*if (instanceConfig) {
        _.extend(config, instanceConfig)
      }*/
      // Point all getters to the initGetters
      for (var i = 0, ln = initConfigList.length; i < ln; i++) {
        var name = initConfigList[i]
        nameMap = configNameCache[name]
        me[nameMap.get] = me[nameMap.initGet]
      }
      me.beforeInitConfig(config)
      for (i = 0, ln = initConfigList.length; i < ln; i++) {
        name = initConfigList[i]
        nameMap = configNameCache[name]
        getName = nameMap.get

        if (me.hasOwnProperty(getName)) {
          me[nameMap.set](values[name])
          delete me[getName]
        }
      }
    }
  }
}))
