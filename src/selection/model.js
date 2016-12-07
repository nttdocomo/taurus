;(function (root, factory) {
  if (typeof define === 'function') {
    // Now we're wrapping the factory and assigning the return
    // value to the root (window) and returning it as well to
    // the AMD loader.
    if (define.amd) {
      define(['class', '../util/storeHolder', 'backbone', 'underscore'], function (Class, StoreHolder, Backbone, _) {
        return (root.Class = factory(Class, StoreHolder, Backbone, _))
      })
    }
    if (define.cmd) {
      define(function (require, exports, module) {
        return (root.Class = factory(require('class'), require('../util/storeHolder'), require('backbone'), require('underscore')))
      })
    }
  } else if (typeof module === 'object' && module.exports) {
    // I've not encountered a need for this yet, since I haven't
    // run into a scenario where plain modules depend on CommonJS
    // *and* I happen to be loading in a CJS browser environment
    // but I'm including it for the sake of being thorough
    module.exports = (root.Class = factory(require('class'), require('../util/storeHolder'), require('backbone'), require('underscore')))
  } else {
    root.Class = factory()
  }
}(this, function (Class, StoreHolder, Backbone, _) {
  var Model = Class.extend({
    selected: [],
    config: {
      selected: []
    },
    init: function () {
      var me = this

      me.modes = {
        SINGLE: true,
        SIMPLE: true,
        MULTI: true
      }
      me.setSelectionMode(me.mode)
      me.selected = me.applySelected(me.selected)
      if (me.selectionMode !== 'SINGLE') {
        me.allowDeselect = true
      }
    },
    beforeViewRender: function (view) {
      if (!this.views) {
        this.views = []
      }
      this.views.push(view)
    },

    /**
     * A fast reset of the selections without firing events, updating the ui, etc.
     * For private usage only.
     * @private
     */
    clearSelections: function() {
        // Will be a Collection in this and DataView classes.
        // Will be an Ext.grid.selection.Selection instance for Spreadsheet.
        // API used in here, clear() is common.
        var selected = this.getSelected();

        // reset the entire selection to nothing
        if (selected) {
            selected.reset();
        }
        this.lastSelected = null;
    },
    doMultiSelect: function (records, keepExisting, suppressEvent) {
      var me = this
      var selected = me.selected
      var len, commit, record, change
      records = !_.isArray(records) ? [records] : records
      len = records.length
      commit = function () {
        if (!selected.length) {
          me.selectionStart = record
        }
        if (!suppressEvent) {
          selected.add(record)
        }
        change = true
      }
      for (var i = 0; i < len; i++) {
        record = records[i]
        if (me.isSelected(record)) {
          continue
        }

        me.onSelectChange(record, true, suppressEvent, commit)
        if (me.destroyed) {
          return
        }
      }
    },

    // records can be an index, a record or an array of records
    doDeselect: function (records, suppressEvent) {
      var me = this
      var selected = me.selected
      var attempted = 0
      var accepted = 0
      if (typeof records === 'number') {
        record = me.store.get(records)
        // No matching record, jump out
        if (!record) {
          return false
        }
        records = [record]
      } else if (!_.isArray(records)) {
        records = [records]
      }
      commit = function () {
        ++accepted
        if (!suppressEvent) {
          selected.remove(record)
        }
        if (record === me.selectionStart) {
          me.selectionStart = null
        }
      }
      var len = records.length
      for (var i = 0; i < len; i++) {
        record = records[i]
        if (me.isSelected(record)) {
          if (me.lastSelected === record) {
            me.lastSelected = selected.last()
          }
          ++attempted
          me.onSelectChange(record, false, suppressEvent, commit)
          if (me.destroyed) {
            return false
          }
        }
      }
    },

    doSelect: function (records, keepExisting, suppressEvent) {
      var me = this
      var record

      if (me.locked || records == null) {
        return
      }

      if (typeof records === 'number') {
        record = me.store.get(records)
        // No matching record, jump out.
        if (!record) {
          return
        }
        records = [record]
      }

      if (me.selectionMode === 'SINGLE') {
        if (records.isModel) {
          records = [records]
        }

        if (records.length) {
          me.doSingleSelect(records[0], suppressEvent)
        }
      } else {
        me.doMultiSelect(records, keepExisting, suppressEvent)
      }
    },

    /**
     * Deselects all records in the view.
     * @param {Boolean} [suppressEvent] True to suppress any deselect events
     */
    deselectAll: function (suppressEvent) {
      var me = this
      var selections = me.store.models
      me.doDeselect(selections, suppressEvent)
    },
    getSelected: function(){
      return this.selected
    },

    /**
     * Selects all records in the view.
     * @param {Boolean} suppressEvent True to suppress any select events
     */
    selectAll: function (suppressEvent) {
      var me = this
      var selections = me.store.models
      // var start = me.getSelection().length

      // me.suspendChanges()
      me.doSelect(selections, true, suppressEvent)
    // me.resumeChanges()
    // fire selection change only if the number of selections differs
    /*if (!suppressEvent && !me.destroyed) {
      me.maybeFireSelectionChange(me.getSelection().length !== start)
    }*/
    },

    getStoreListeners: function () {
      var me = this
      return {
        add: me.onStoreAdd,
        clear: me.onStoreClear,
        remove: me.onStoreRemove,
        update: me.onStoreUpdate,
        idchanged: me.onIdChanged,
        load: me.onStoreLoad,
        refresh: me.onStoreRefresh,

        // BufferedStore events
        pageadd: me.onPageAdd,
        pageremove: me.onPageRemove
      }
    },

    /**
     * Returns true if the specified row is selected.
     * @param {Ext.data.Model/Number} record The record or index of the record to check
     * @return {Boolean}
     */
    isSelected: function (record) {
      record = _.isNumber(record) ? this.store.get(record) : record
      return this.selected ? this.selected.contains(record) : false
    },
    onNavigate: function (e) {
      if (!e.record || this.vetoSelection(e.keyEvent)) {
        return;
      }
      console.log('onNavigate')
      var me = this
      var record = e.record
      var keyEvent = e.keyEvent
      switch (me.selectionMode) {
        case 'MULTI':
          me.selectWithEvent(record, keyEvent)
      }
    },
    refresh: function(){
      var me = this
      me.clearSelections()
    },

    /**
     * Sets the current selectionMode.
     * @param {String} selMode 'SINGLE', 'MULTI' or 'SIMPLE'.
     */
    setSelectionMode: function (selMode) {
      selMode = selMode ? selMode.toUpperCase() : 'SINGLE'
      // set to mode specified unless it doesnt exist, in that case
      // use single.
      this.selectionMode = this.modes[selMode] ? selMode : 'SINGLE'
    },
    selectWithEvent: function (record, e) {
      var me = this
      var isSelected = me.isSelected(record)
      switch (me.selectionMode) {
        case 'MULTI':
          me.selectWithEventMulti(record, e, isSelected)
          break
        case 'SIMPLE':
          me.selectWithEventSimple(record, e, isSelected)
          break
        case 'SINGLE':
          me.selectWithEventSingle(record, e, isSelected)
          break
      }
    },
    selectWithEventMulti: function (record, e, isSelected) {
      var me = this

      if (!e.shiftKey && !e.ctrlKey && e.getTarget(me.checkSelector)) {
        if (isSelected) {
          me.doDeselect(record)
        } else {
          me.doSelect(record, true)
        }
      } else {
        me.callParent([record, e, isSelected])
      }
    },
    vetoSelection: function(e){
      if (e.stopSelection) {
        return true;
      }
    },

    applySelected: function (selected) {
      if (!selected.isCollection) {
        selected = new Backbone.Collection(selected)
      }
      return selected
    }
  }).extend(Backbone.Events).extend(StoreHolder.prototype)
  return Model
}))
