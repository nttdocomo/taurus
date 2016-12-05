;(function (root, factory) {
  if (typeof define === 'function') {
    // Now we're wrapping the factory and assigning the return
    // value to the root (window) and returning it as well to
    // the AMD loader.
    if (define.amd) {
      define(['./rowModel', '../classic/grid/column/column', 'underscore', 'taurus'], function (RowModel, Column, _, taurus) {
        return (root.Class = factory(RowModel, Column, _, taurus))
      })
    }
    if (define.cmd) {
      define(function (require, exports, module) {
        return (root.Class = factory(require('./rowModel'), require('../classic/grid/column/column'), require('underscore'), require('taurus')))
      })
    }
  } else if (typeof module === 'object' && module.exports) {
    // I've not encountered a need for this yet, since I haven't
    // run into a scenario where plain modules depend on CommonJS
    // *and* I happen to be loading in a CJS browser environment
    // but I'm including it for the sake of being thorough
    module.exports = (root.Class = factory(require('./rowModel'), require('../classic/grid/column/column'), require('underscore'), require('taurus')))
  } else {
    root.Class = factory()
  }
}(this, function (RowModel, Column, _, taurus) {
  var CheckboxModel = RowModel.extend({
    injectCheckbox: 0,
    headerWidth: 32,
    /**
     * @cfg {"SINGLE"/"SIMPLE"/"MULTI"} mode
     * Modes of selection.
     * Valid values are `"SINGLE"`, `"SIMPLE"`, and `"MULTI"`.
     */
    mode: 'MULTI',
    /**
     * @cfg {String} [checkSelector="x-grid-row-checker"]
     * The selector for determining whether the checkbox element is clicked. This may be changed to
     * allow for a wider area to be clicked, for example, the whole cell for the selector.
     */
    checkSelector: '.' + taurus.baseCSSPrefix + 'grid-row-checker',
    checkerOnCls: taurus.baseCSSPrefix + 'grid-hd-checker-on',
    init: function () {
      var me = this
      this._super.apply(me, arguments)

      // If mode is single and showHeaderCheck isn't explicity set to
      // true, hide it.
      if (me.mode === 'SINGLE' && me.showHeaderCheckbox !== true) {
        me.showHeaderCheckbox = false
      }
    },

    /**
     * Add the header checkbox to the header row
     * @private
     * @param {Boolean} initial True if we're binding for the first time.
     */
    addCheckbox: function (view, initial) {
      var me = this,
        checkbox = me.injectCheckbox,
        headerCt = view.headerCt

      // Preserve behaviour of false, but not clear why that would ever be done.
      if (checkbox !== false) {
        if (checkbox === 'first') {
          checkbox = 0
        } else if (checkbox === 'last') {
          checkbox = headerCt.getColumnCount()
        }
        // Ext.suspendLayouts()
        /*if (view.getStore().isBufferedStore) {
          me.showHeaderCheckbox = false
        }*/
        me.column = headerCt.add(checkbox, me.getHeaderConfig())
      // Ext.resumeLayouts()
      }

      if (initial !== true) {
        view.refresh()
      }
    },
    beforeViewRender: function (view) {
      var me = this
      var owner

      me._super.apply(me, arguments)

      // if we have a locked header, only hook up to the first
      if (!me.hasLockedHeader() || view.headerCt.lockedCt) {
        me.addCheckbox(view, true)
        owner = view.ownerCt
        // Listen to the outermost reconfigure event
        if (view.headerCt.lockedCt) {
          owner = owner.ownerCt
        }
      // me.mon(owner, 'reconfigure', me.onReconfigure, me)
      }
    },

    /**
     * Retrieve a configuration to be used in a HeaderContainer.
     * This should be used when injectCheckbox is set to false.
     */
    getHeaderConfig: function () {
      var me = this
      var showCheck = me.showHeaderCheckbox !== false

      return {
        'class': Column,
        ignoreExport: true,
        isCheckerHd: showCheck,
        text: '&#160;',
        clickTargetName: 'el',
        width: me.headerWidth,
        sortable: false,
        draggable: false,
        resizable: false,
        hideable: false,
        menuDisabled: true,
        dataIndex: '',
        tdCls: me.tdCls,
        cls: showCheck ? taurus.baseCSSPrefix + 'column-header-checkbox ' : '',
        defaultRenderer: _.bind(me.renderer, me)/*,
        editRenderer: me.editRenderer || me.renderEmpty,
        locked: me.hasLockedHeader(),
        processEvent: me.processColumnEvent*/
      }
    },

    hasLockedHeader: function () {
      var views = this.views
      var vLen = views.length
      var v

      for (v = 0; v < vLen; v++) {
        if (views[v].headerCt.lockedCt) {
          return true
        }
      }
      return false
    },

    /**
     * Toggle between selecting all and deselecting all when clicking on
     * a checkbox header.
     */
    onHeaderClick: function(headerCt, header, e) {
      if (header === this.column) {
        e.stopEvent();
        var me = this
        var isChecked = header.$el.hasClass(taurus.baseCSSPrefix + 'grid-hd-checker-on');

        if (isChecked) {
          me.deselectAll();
        } else {
          me.selectAll();
        }
      }
    },

    /**
     * Synchronize header checker value as selection changes.
     * @private
     */
    onSelectChange: function() {
      this._super.apply(this, arguments)
      if (!this.suspendChange) {
        this.updateHeaderState()
      }
    },

    /**
     * @private
     */
    updateHeaderState: function() {
      // check to see if all records are selected
      var me = this,
          store = me.store,
          storeCount = store.length,
          views = me.views,
          hdSelectStatus = false,
          selectedCount = 0,
          selected, len, i;

      if (!store.isBufferedStore && storeCount > 0) {
          selected = me.selected;
          hdSelectStatus = true;
          for (i = 0, len = selected.length; i < len; ++i) {
              if (store.indexOf(selected.at(i)) > -1) {
                  ++selectedCount;
              }
          }
          hdSelectStatus = storeCount === selectedCount;
      }

      if (views && views.length) {
          me.toggleUiHeader(hdSelectStatus);
      }
    },

    /**
     * Generates the HTML to be rendered in the injected checkbox column for each row.
     * Creates the standard checkbox markup by default; can be overridden to provide custom rendering.
     * See {@link Ext.grid.column.Column#renderer} for description of allowed parameters.
     */
    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
      return '<div class="' + taurus.baseCSSPrefix + 'grid-row-checker" role="presentation">&#160;</div>';
    },

    /**
     * Toggle the ui header between checked and unchecked state.
     * @param {Boolean} isChecked
     * @private
     */
    toggleUiHeader: function(isChecked) {
      var view     = this.views[0],
          headerCt = view.headerCt,
          checkHd  = headerCt.$el.find('> .column-header-checkbox')//child('gridcolumn[isCheckerHd]'),
          cls = this.checkerOnCls;

      if (checkHd) {
          if (isChecked) {
              checkHd.addClass(cls);
          } else {
              checkHd.removeClass(cls);
          }
      }
    }
  })
  return CheckboxModel
}))
