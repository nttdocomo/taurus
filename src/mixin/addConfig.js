/**
 * @author nttdocomo
 */
/* global define */
;(function (root, factory) {
  if (typeof define === 'function') {
    if (define.amd) {
      define(['underscore', '../polyfill/object/merge', '../polyfill/object/classify'], factory)
    }
    if (define.cmd) {
      define(function (require, exports, module) {
        return factory(require('underscore'), require('../polyfill/object/merge'), require('../polyfill/object/classify'))
      })
    }
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('underscore'), require('../polyfill/object/merge'), require('../polyfill/object/classify'))
  }
}(this, function (_, merge) {
  return {
    /**
     * @private
     * @static
     * @inheritable
     */
    addConfig: function (config, fullMerge) {
      var prototype = this.prototype
      var initConfigList = prototype.initConfigList
      var initConfigMap = prototype.initConfigMap
      var defaultConfig = prototype.defaultConfig
      var hasInitConfigItem, name, value

      for (name in config) {
        if (config.hasOwnProperty(name) && (fullMerge || !(name in defaultConfig))) {
          value = config[name]
          hasInitConfigItem = initConfigMap[name]

          if (value !== null) {
            if (!hasInitConfigItem) {
              initConfigMap[name] = true
              initConfigList.push(name)
            }
          } else if (hasInitConfigItem) {
            initConfigMap[name] = false
            initConfigList = _.without(initConfigList, name)
          // Ext.Array.remove(initConfigList, name)
          }
        }
      }

      if (fullMerge) {
        merge(defaultConfig, config)
      } else {
        _.defaults(defaultConfig, config)
      }

      prototype.configClass = Object.classify(defaultConfig)/* _.omit(_.deepClone(defaultConfig), function (value, key, object) {
        return _.isUndefined(value)
      })*/
    },
    addMembers: function(members, isStatic){
      var me = this
      var target = isStatic ? me : me.prototype
      var defaultConfig = !isStatic && target.defaultConfig
      var configs
      for (name in members) {
        if (members.hasOwnProperty(name)) {
          member = members[name];
          if (defaultConfig && (name in defaultConfig) && !target.config.hasOwnProperty(name)) {
            // This is a config property so it must be added to the configs
            // collection not just smashed on the prototype...
            (configs || (configs = {}))[name] = member;
          }
        }
      }

      if (configs) {
          // Add any configs found in the normal members arena:
          me.addConfig(configs);
      }
    }
  }
}))
