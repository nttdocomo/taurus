;(function (root, factory) {
  if (typeof define === 'function') {
    // Now we're wrapping the factory and assigning the return
    // value to the root (window) and returning it as well to
    // the AMD loader.
    if (define.amd) {
      define(['./model', '../classic/grid/column/column', 'underscore', 'taurus'], factory)
    }
    if (define.cmd) {
      define(function (require, exports, module) {
        return (root.Class = factory(require('./model'), require('../classic/grid/column/column'), require('underscore'), require('taurus')))
      })
    }
  } else if (typeof module === 'object' && module.exports) {
    // I've not encountered a need for this yet, since I haven't
    // run into a scenario where plain modules depend on CommonJS
    // *and* I happen to be loading in a CJS browser environment
    // but I'm including it for the sake of being thorough
    module.exports = (root.Class = factory(require('./model'), require('../classic/grid/column/column'), require('underscore'), require('taurus')))
  } else {
    root.Class = factory()
  }
}(this, function (Model, Column, _, taurus) {
  return Model.extend({
    bindComponent: function(view){
      console.log('asdadsasd')
      var me = this
      var viewListeners

      if (me.view !== view) {
        if (me.view) {
          me.navigationModel = null;
          Ext.destroy(me.viewListeners, me.navigationListeners);
        }
        me.view = view;
        if (view) {
          /*viewListeners = me.getViewListeners();
          viewListeners.scope = me;
          viewListeners.destroyable = true;*/
          me.navigationModel = view.getNavigationModel();
          //me.viewListeners = view.on(viewListeners);
          me.navigationListeners = me.navigationModel.on({
            navigate: _.bind(me.onNavigate, me)/*,
            scope: me,
            destroyable: true*/
          });
        }
      }
    },

    getViewListeners: function() {
      var me = this
      var eventListeners = {};

      eventListeners[me.view.triggerCtEvent] = me.onContainerClick;
      return eventListeners;
    }
  })
}))
