;(function (root, factory) {
  if (typeof define === 'function') {
    if (define.amd) {
      // Now we're wrapping the factory and assigning the return
      // value to the root (window) and returning it as well to
      // the AMD loader.
      define(['class', 'backbone', 'underscore'], function (Base, StoreHolder, _) {
        return (root.Class = factory(Base, StoreHolder))
      })
    }
    if (define.cmd) {
      define(function (require, exports, module) {
        return (root.Class = factory(require('class'), require('backbone'), require('underscore')))
      })
    }
  } else if (typeof module === 'object' && module.exports) {
    // I've not encountered a need for this yet, since I haven't
    // run into a scenario where plain modules depend on CommonJS
    // *and* I happen to be loading in a CJS browser environment
    // but I'm including it for the sake of being thorough
    module.exports = (root.Class = factory(require('class'), require('backbone'), require('underscore')))
  } else {
    root.Class = factory()
  }
}(this, function (Class, Backbone, _) {
  return Class.extend({
    bindComponent: function (view) {
      if (this.view !== view) {
        this.view = view
        this.bindView(view)
      }
    },

    bindView: function (view) {
      var me = this
      var dataSource = view.collection
      var listeners

      /*me.initKeyNav(view)
      if (!dataSource.isEmptyStore) {
        me.setStore(dataSource)
      }*/
      listeners = me.getViewListeners()
      // listeners.destroyable = true
      me.viewListeners = me.viewListeners || []
      me.viewListeners.push(view.on(listeners, me))
    },

    fireNavigateEvent: function (keyEvent) {
      var me = this

      me.trigger('navigate', {
        navigationModel: me,
        keyEvent: keyEvent,
        previousRecordIndex: me.previousRecordIndex,
        previousRecord: me.previousRecord,
        previousItem: me.previousItem,
        recordIndex: me.recordIndex,
        record: me.record,
        item: me.item
      })
    },

    getViewListeners: function () {
      var me = this

      return {
        containermousedown: me.onContainerMouseDown,
        itemmousedown: me.onItemMouseDown,

        // We focus on click if the mousedown handler did not focus because it was a translated "touchstart" event.
        itemclick: me.onItemClick,
        itemcontextmenu: me.onItemMouseDown
      }
    },

    onItemClick: function (view, record, item, index, clickEvent) {
      // If the mousedown that initiated the click has navigated us to the correct spot, just fire the event
      if (this.record === record) {
        this.fireNavigateEvent(clickEvent)
      } else {
        this.setPosition(index, clickEvent)
      }
    }
  }).extend(Backbone.Events)
}))
