;(function (root, factory) {
  if (typeof define === 'function') {
    if (define.amd) {
      // Now we're wrapping the factory and assigning the return
      // value to the root (window) and returning it as well to
      // the AMD loader.
      define(['../view/navigationModel', 'underscore'], factory)
    }
    if (define.cmd) {
      define(function (require, exports, module) {
        return (root.Class = factory(require('../view/navigationModel'), require('underscore')))
      })
    }
  } else if (typeof module === 'object' && module.exports) {
    // I've not encountered a need for this yet, since I haven't
    // run into a scenario where plain modules depend on CommonJS
    // *and* I happen to be loading in a CJS browser environment
    // but I'm including it for the sake of being thorough
    module.exports = (root.Class = factory(require('../view/navigationModel'), require('underscore')))
  } else {
    root.Class = factory()
  }
}(this, function (NavigationModel, _) {
  return NavigationModel.extend({
    getViewListeners: function() {
      var me = this;

      return {
        /*focusmove: {
          element: 'el',
          fn: me.onFocusMove
        },

        containermousedown: me.onContainerMouseDown,
        cellmousedown: me.onCellMouseDown,*/

        // We focus on click if the mousedown handler did not focus because it was a translated "touchstart" event.
        cellclick: _.bind(me.onCellClick, me)/*,
        itemmousedown: me.onItemMouseDown,

        // We focus on click if the mousedown handler did not focus because it was a translated "touchstart" event.
        itemclick: me.onItemClick,
        itemcontextmenu: me.onItemClick*/
      };
    },
    onCellClick: function(view, cell, cellIndex, record, row, recordIndex, clickEvent){
      console.log(record)
      var me = this
      me.trigger('navigate', {
        record: record,
        keyEvent: clickEvent
      }/*, {
          view: view,
          navigationModel: me,
          keyEvent: clickEvent,
          previousPosition: me.previousPosition,
          previousRecordIndex: me.previousRecordIndex,
          previousRecord: me.previousRecord,
          previousItem: me.previousItem,
          previousCell: me.previousCell,
          previousColumnIndex: me.previousColumnIndex,
          previousColumn: me.previousColumn,
          position: clickEvent.position,
          recordIndex: clickEvent.position.rowIdx,
          record: clickEvent.position.record,
          selectionStart: me.selectionStart,
          item: clickEvent.item,
          cell: clickEvent.position.cellElement,
          columnIndex: clickEvent.position.colIdx,
          column: clickEvent.position.column
      }*/);
      return {}
    }
  })
}))