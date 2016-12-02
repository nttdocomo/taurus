;(function (root, factory) {
  if (typeof define === 'function') {
    // Now we're wrapping the factory and assigning the return
    // value to the root (window) and returning it as well to
    // the AMD loader.
    if (define.amd) {
      define(['./dataViewModel', '../classic/grid/column/column', 'underscore', 'taurus'], function (Backbone) {
        return (root.Class = factory(Backbone))
      })
    }
    if (define.cmd) {
      define(function (require, exports, module) {
        return (root.Class = factory(require('./dataViewModel'), require('../classic/grid/column/column'), require('underscore'), require('taurus')))
      })
    }
  } else if (typeof module === 'object' && module.exports) {
    // I've not encountered a need for this yet, since I haven't
    // run into a scenario where plain modules depend on CommonJS
    // *and* I happen to be loading in a CJS browser environment
    // but I'm including it for the sake of being thorough
    module.exports = (root.Class = factory(require('./dataViewModel'), require('../classic/grid/column/column'), require('underscore'), require('taurus')))
  } else {
    root.Class = factory()
  }
}(this, function (DataViewModel, Column, _, taurus) {
  return DataViewModel.extend({
    // Allow the GridView to update the UI by
    // adding/removing a CSS class from the row.
    onSelectChange: function(record, isSelected, suppressEvent, commitFn) {
      var me = this
      var views = me.views || [me.view]
      var viewsLn = views.length
      var eventName = isSelected ? 'select' : 'deselect'
      var view
      recordIndex = me.store.indexOf(record)
      console.log(arguments)
      if ((suppressEvent || me.trigger('before' + eventName, me, record, recordIndex)) !== false && commitFn() !== false){
        for (i = 0; i < viewsLn; i++) {
          view = views[i]
          if (view.indexOf(record) !== -1) {
            if (isSelected) {
              view.onRowSelect(recordIndex, suppressEvent);
            } else {
              view.onRowDeselect(recordIndex, suppressEvent);
            }
          }
        }
      }
      if (!suppressEvent) {
        me.trigger(eventName, me, record, recordIndex);
      }
    }
  })
}))
