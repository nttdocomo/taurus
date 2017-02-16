// This is a plugin, constructed from parts of Backbone.js and John Resig's inheritance script.
// (See http://backbonejs.org, http://ejohn.org/blog/simple-javascript-inheritance/)
// No credit goes to me as I did absolutely nothing except patch these two together.
/* global define */
(function (root, factory) {
  // Set up Backbone appropriately for the environment. Start with AMD.
  if (typeof define === 'function') {
    if (define.amd) {
      define(['underscore', 'backbone', './lang/object/chain', './mixin/addConfig', './mixin/initConfig'], function (_, Backbone) {
        // Export global even in AMD case in case this script is loaded with
        // others that may still expect a global Backbone.
        return factory(_, Backbone)
      })
    }
    if (define.cmd) {
      define(function (require, exports, module) {
        return factory(require('underscore'), require('backbone'), require('./lang/object/chain'), require('./mixin/addConfig'), require('./mixin/initConfig'))
      })
    }

  // Next for Node.js or CommonJS.
  } else if (typeof exports !== 'undefined' && typeof require === 'function') {
    factory(require('underscore'), require('backbone'), require('./lang/object/chain'), require('./mixin/addConfig'), require('./mixin/initConfig'))

  // Finally, as a browser global.
  } else {
    factory(root._, root.Backbone)
  }

}(this, function factory (_, Backbone, classify, addConfig, initConfig) {
  Backbone.Model.extend = Backbone.Collection.extend = Backbone.Router.extend = Backbone.View.extend = function (protoProps, classProps) {
    var child = inherits(this, protoProps, classProps)
    child.extend = this.extend
    return child
  }
  Backbone.Model.addConfig = Backbone.Collection.addConfig = Backbone.Router.addConfig = Backbone.View.addConfig = addConfig.addConfig
  Backbone.Model.addMembers = Backbone.Collection.addMembers = Backbone.Router.addMembers = Backbone.View.addMembers = addConfig.addMembers
  Backbone.Model.prototype.initConfig = Backbone.Collection.prototype.initConfig = Backbone.Router.prototype.initConfig = Backbone.View.prototype.initConfig = initConfig
  var unImplementedSuper = function (method) {
    throw 'Super does not implement this method: ' + method
  }

  var fnTest = /\b_super\b/

  var makeWrapper = function (parentProto, name, fn) {
    var wrapper = function () {
      var tmp = this._super

      // Add a new ._super() method that is the same method
      // but on the super-class
      this._super = parentProto[name] || unImplementedSuper(name)

      // The method only need to be bound temporarily, so we
      // remove it when we're done executing
      var ret
      try {
        ret = fn.apply(this, arguments)
      } finally {
        this._super = tmp
      }
      return ret
    }

    // we must move properties from old function to new
    for (var prop in fn) {
      wrapper[prop] = fn[prop]
      delete fn[prop]
    }

    return wrapper
  }

  var ctor = function () {}
  var inherits = function (parent, protoProps, staticProps) {
    var child
    var parentProto = parent.prototype

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && protoProps.hasOwnProperty('constructor')) {
      child = protoProps.constructor
    } else {
      child = function () {
        return parent.apply(this, arguments)
      }
    }

    // Inherit class (static) properties from parent.
    _.extend(child, parent, staticProps)

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    ctor.prototype = parentProto
    child.prototype = new ctor()
    if(child.prototype.config){
      child.prototype.config = child.prototype.defaultConfig = Object.chain(child.prototype.config)
    } else {
      child.prototype.configValues = {}
    }
    child.prototype.initConfigList = child.prototype.initConfigList ? child.prototype.initConfigList.slice() : []
    if(child.prototype.initConfigMap){
      child.prototype.initConfigMap = Object.chain(child.prototype.initConfigMap)
    }

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) {
      inherits.process(child, protoProps)
      _.extend(child.prototype, protoProps)

      // Copy the properties over onto the new prototype
      for (var name in protoProps) {
        // Check if we're overwriting an existing function
        if (typeof protoProps[name] === 'function' && fnTest.test(protoProps[name])) {
          child.prototype[name] = makeWrapper(parentProto, name, protoProps[name])
        }
      }
    }

    // Add static properties to the constructor function, if supplied.
    if (staticProps) _.extend(child, staticProps)

    // Correctly set child's `prototype.constructor`.
    child.prototype.constructor = child

    // Set a convenience property in case the parent's prototype is needed later.
    child.__super__ = parentProto

    return child
  }

  _.extend(inherits, {
    preprocessors: {},
    configNameCache: {},
    /**
     * @private
     * @static
     */
    onBeforeCreated: function(Class, data, hooks) {
      Class.addMembers(data)
    },
    process: function (Class, data) {
      var me = this
      var args = arguments
      var preprocessors = this.preprocessors
      _.each(preprocessors, function (preprocessor) {
        var process = preprocessor.fn
        process.apply(me, args)
      })
      me.onBeforeCreated.apply(me, arguments)
    },

    /**
     * @private
     * @static
     */
    generateInitGetter: function (nameMap) {
      var name = nameMap.name
      var setName = nameMap.set
      var getName = nameMap.get
      var initializingName = nameMap.initializing

      return function () {
        this[initializingName] = true
        delete this[getName]

        this[setName](this.config[name])
        delete this[initializingName]

        return this[getName].apply(this, arguments)
      }
    },

    /**
     * @private
     * @static
     */
    generateGetter: function (nameMap) {
      var internalName = nameMap.internal

      return function () {
        return this[internalName]
      }
    },

    /**
     * @private
     * @static
     */
    generateSetter: function (nameMap) {
      var internalName = nameMap.internal
      var getName = nameMap.get
      var applyName = nameMap.apply
      var updateName = nameMap.update
      var setter

      setter = function (value) {
        var oldValue = this[internalName]
        var applier = this[applyName]
        var updater = this[updateName]

        delete this[getName]

        if (applier) {
          value = applier.call(this, value, oldValue)
          if (typeof value === 'undefined') {
            return this
          }
        }

        this[internalName] = value

        if (updater && value !== oldValue) {
          updater.call(this, value, oldValue)
        }

        return this
      }

      setter.$isDefault = true

      return setter
    },
    /**
     * @private
     * @static
     */
    getConfigNameMap: function (name) {
      var cache = this.configNameCache
      var map = cache[name]
      var capitalizedName

      if (!map) {
        capitalizedName = name.charAt(0).toUpperCase() + name.substr(1)

        map = cache[name] = {
          name: name,
          internal: '_' + name,
          initializing: 'is' + capitalizedName + 'Initializing',
          apply: 'apply' + capitalizedName,
          update: 'update' + capitalizedName,
          set: 'set' + capitalizedName,
          get: 'get' + capitalizedName,
          initGet: 'initGet' + capitalizedName,
          doSet: 'doSet' + capitalizedName,
          changeEvent: name.toLowerCase() + 'change'
        }
      }

      return map
    },
    registerPreprocessor: function (name, fn) {
      this.preprocessors[name] = {
        name: name,
        fn: fn
      }

      return this
    }
  })
  inherits.registerPreprocessor('config', function (Class, data) {
    var config = data.config
    var prototype = Class.prototype
    var defaultConfig = prototype.config || {}
    var value, nameMap, setName, getName, initGetName, internalName
    delete data.config
    for (var name in config) {
      // Once per config item, per class hierarchy
      if (config.hasOwnProperty(name) && !(name in defaultConfig)) {
        value = config[name]
        nameMap = this.getConfigNameMap(name)
        setName = nameMap.set
        getName = nameMap.get
        initGetName = nameMap.initGet
        internalName = nameMap.internal

        data[initGetName] = this.generateInitGetter(nameMap)

        if (value === null && !data.hasOwnProperty(internalName)) {
          data[internalName] = null
        }

        if (!data.hasOwnProperty(getName)) {
          data[getName] = this.generateGetter(nameMap)
        }

        if (!data.hasOwnProperty(setName)) {
          data[setName] = this.generateSetter(nameMap)
        }
      }
    }
    Class.addConfig(config, true)
  })

  return inherits
}))
