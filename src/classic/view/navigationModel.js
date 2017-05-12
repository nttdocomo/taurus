;(function (root, factory) {
  if (typeof define === 'function') {
    if (define.amd) {
      // Now we're wrapping the factory and assigning the return
      // value to the root (window) and returning it as well to
      // the AMD loader.
      define(['class', 'backbone', 'underscore','../../taurus'], factory)
    }
    if (define.cmd) {
      define(function (require, exports, module) {
        return (root.Class = factory(require('class'), require('backbone'), require('underscore'), require('../../taurus')))
      })
    }
  } else if (typeof module === 'object' && module.exports) {
    // I've not encountered a need for this yet, since I haven't
    // run into a scenario where plain modules depend on CommonJS
    // *and* I happen to be loading in a CJS browser environment
    // but I'm including it for the sake of being thorough
    module.exports = (root.Class = factory(require('class'), require('backbone'), require('underscore'), require('../../taurus')))
  } else {
    root.Class = factory()
  }
}(this, function (Class, Backbone, _, taurus) {
  return Class.extend({
    focusCls: taurus.baseCSSPrefix + 'view-item-focused',
    bindComponent: function(view) {
      if (this.view !== view) {
        this.view = view;
        this.bindView(view);
      }
    },

    bindView: function(view) {
      var me = this
      var dataSource = view.collection
      var listeners


      /*me.initKeyNav(view);
      if (!dataSource.isEmptyStore) {
        me.setStore(dataSource);
      }*/
      listeners = me.getViewListeners();
      //listeners.destroyable = true;
      me.viewListeners = me.viewListeners || [];
      me.viewListeners.push(view.on(listeners, me));
    },

    getViewListeners: function() {
      var me = this;

      return {
        containermousedown: me.onContainerMouseDown,
        itemmousedown: me.onItemMouseDown,

        // We focus on click if the mousedown handler did not focus because it was a translated "touchstart" event.
        itemclick: me.onItemClick,
        itemcontextmenu: me.onItemMouseDown
      };
    },

    onItemClick: function(view, record, item, index, clickEvent) {
      // If the mousedown that initiated the click has navigated us to the correct spot, just fire the event
      if (this.record === record) {
        this.fireNavigateEvent(clickEvent);
      } else {
        this.setPosition(index, clickEvent);
      }
    },
    setPosition: function(recordIndex, keyEvent, suppressEvent, preventNavigation, preventFocus){
      var me = this
      var view = me.view
      var collection = view.collection
      var newRecordIndex, newRecord
      if (recordIndex == null || !view.$el.children().length) {
        me.record = me.recordIndex = null;
      } else {
        if (typeof recordIndex === 'number') {
          newRecordIndex = Math.max(Math.min(recordIndex, collection.length - 1), 0);
          newRecord = collection.at(recordIndex);
        } else if (recordIndex instanceof Backbone.Model) {
          newRecord = collection.get(recordIndex.id || recordIndex.cid);
          newRecordIndex = collection.indexOf(newRecord);

          // Previous record is no longer present; revert to first.
          if (newRecordIndex === -1) {
            newRecord = collection.at(0);
            newRecordIndex = 0;
          }
        }
        // row is a view item
        else if (recordIndex.tagName) {
          newRecord = view.getRecord(recordIndex);
          newRecordIndex = collection.indexOf(newRecord);
        }
        else {
          newRecord = newRecordIndex = null;
        }
      }
      if (newRecord === me.record) {
        me.recordIndex = newRecordIndex;
        return me.focusPosition(newRecordIndex);
      }
      if (me.item) {
        me.item.removeCls(me.focusCls)
      }
      // Track the last position.
      // Used by SelectionModels as the navigation "from" position.
      me.previousRecordIndex = me.recordIndex;
      me.previousRecord = me.record;
      me.previousItem = me.item;

      // Update our position
      me.recordIndex = newRecordIndex;
      me.record      = newRecord;

      // Prevent navigation if focus has not moved
      preventNavigation = preventNavigation || me.record === me.lastFocused;

      // Maintain lastFocused, so that on non-specific focus of the View, we can focus the correct descendant.
      if (newRecord) {
        me.focusPosition(me.recordIndex);
      } else if (!preventFocus) {
        me.item = null;
      }
    },

    /**
     * @private
     * Focuses the currently active position.
     * This is used on view refresh and on replace.
     */
    focusPosition: function(recordIndex) {
      var me = this;

      if (recordIndex != null && recordIndex !== -1) {
        if (recordIndex instanceof Backbone.Model) {
          recordIndex = me.view.collection.indexOf(recordIndex);
        }
        me.item = me.view.all.eq(recordIndex);
        if (me.item) {
          me.lastFocused = me.record;
          me.lastFocusedIndex = me.recordIndex;
          me.focusItem(me.item);
        } else {
          me.record = null;
        }
      } else {
        me.item = null;
      }
    },

    /**
     * @template
     * @protected
     * Called to focus an item in the client {@link Ext.view.View DataView}.
     * The default implementation adds the {@link #focusCls} to the passed item focuses it.
     * Subclasses may choose to keep focus in another target.
     *
     * For example {@link Ext.view.BoundListKeyNav} maintains focus in the input field.
     * @param {Ext.dom.Element} item
     * @return {undefined}
     */
    focusItem: function(item) {
      item.addClass(this.focusCls);
      item.get(0).focus();
    }
  }).extend(Backbone.Events)
}))