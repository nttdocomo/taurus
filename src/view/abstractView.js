;(function (root, factory) {
  if (typeof define === 'function') {
    if (define.amd) {
      // Now we're wrapping the factory and assigning the return
      // value to the root (window) and returning it as well to
      // the AMD loader.
      define(['./base', '../util/storeHolder', 'underscore'], function (Base, StoreHolder, _) {
        return (root.Class = factory(Base, StoreHolder))
      })
    }
    if (define.cmd) {
      define(function (require, exports, module) {
        return (root.Class = factory(require('./base'), require('../util/storeHolder'), require('underscore')))
      })
    }
  } else if (typeof module === 'object' && module.exports) {
    // I've not encountered a need for this yet, since I haven't
    // run into a scenario where plain modules depend on CommonJS
    // *and* I happen to be loading in a CJS browser environment
    // but I'm including it for the sake of being thorough
    module.exports = (root.Class = factory(require('./base'), require('../util/storeHolder'), require('underscore')))
  } else {
    root.Class = factory()
  }
}(this, function (Base, StoreHolder, _) {
  return Base.extend({
    initComponent: function () {
      var me = this
      if (!me.itemSelector) {
        me.itemSelector = '.' + me.itemCls
      }
      Base.prototype.initComponent.apply(this, arguments)
      me.bindStoreListeners(me.collection)
      me.getNavigationModel().bindComponent(this)
    },

    getStoreListeners: function () {
      var me = this
      return {
        refresh: me.onDataRefresh,
        replace: me.onReplace,
        /*add: me.onAdd,*/
        remove: _.debounce(me.onRemove, 200),
        change: me.onUpdate,
        update: me.onAdd,
        clear: me.onDataRefresh,
        beginupdate: me.onBeginUpdate,
        endupdate: me.onEndUpdate
      }
    },
    onUpdate: function (store, record, operation, modifiedFieldNames, details) {
      console.log(arguments)
    },
    onRemove: function () {
      console.log(arguments)
    },

    applyNavigationModel: function (navigationModel) {
      return Ext.Factory.viewNavigation(navigationModel)
    },
    getNavigationModel: function () {
      return this.navigationModel
    }
  }).mixins(StoreHolder)
}))
