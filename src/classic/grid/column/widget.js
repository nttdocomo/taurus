/**
 * @author nttdocomo
 */
/* global define*/
;(function (root, factory) {
  if (typeof define === 'function') {
    if (define.amd) {
      define(['./column', 'underscore', 'taurus'], factory)
    }
    if (define.cmd) {
      define(function (require, exports, module) {
        return factory(require('./column'), require('underscore'), require('taurus'))
      })
    }
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('./column'), require('underscore'), require('taurus'))
  }
}(this, function (Column, _, taurus) {
  return Column.extend({
    config: {
      /**
       * @cfg defaultWidgetUI
       * A map of xtype to {@link Ext.Component#ui} names to use when using Components in this column.
       *
       * Currently {@link Ext.Button Button} and all subclasses of {@link Ext.form.field.Text TextField} default
       * to using `ui: "default"` when in a WidgetColumn except for in the "classic" theme, when they use ui "grid-cell".
       */
      defaultWidgetUI: {}
    },
    initComponent: function () {
      var me = this
      var widget

      me._super.apply(this, arguments)

      widget = me.widget
      // <debug>
      /*if (!widget || widget.isComponent) {
          Ext.raise('column.Widget requires a widget configuration.')
      }*/
      // </debug>
      me.widget = widget = _.extend({}, widget)

      // Apply the default UI for the xtype which is going to feature in this column.
      /*if (!widget.ui) {
          widget.ui = me.getDefaultWidgetUI()[widget.xtype] || 'default'
      }*/
      me.isFixedSize = _.isNumber(widget.width)
    },
    beforeRender: function () {
      console.log('asdasdads')
      var me = this
      me.liveWidgets = {}
      me.freeWidgetStack = [widget = me.getFreeWidget()]
      me.setupViewListeners(me.getView())
    },
    getDefaultWidgetUI: function () {
      return this.defaultWidgetUI
    },
    getFreeWidget: function () {
      var me = this
      var result = me.freeWidgetStack ? me.freeWidgetStack.pop() : null
      var klass = me.widget['class']
      var config = _.omit(me.widget, 'class')
      if (!result) {
        result = new klass(config)

      /*result.resolveListenerScope = me.listenerScopeFn
      result.getWidgetRecord = me.widgetRecordDecorator
      result.getWidgetColumn = me.widgetColumnDecorator
      result.dataIndex = me.dataIndex
      result.measurer = me
      result.ownerCmp = me.getView()
      // The ownerCmp of the widget is the encapsulating view, which means it will be considered
      // as a layout child, but it isn't really, we always need the layout on the
      // component to run if asked.
      result.isLayoutChild = me.returnFalse;*/
      }
      return result
    },

    onViewRefresh: function (view, records) {
      console.log(arguments)
      var me = this
      var rows = view.all
      var oldWidgetMap = me.liveWidgets
      var isFixedSize = me.isFixedSize
      records.each(function (record, i) {
        var itemIndex = i
        var recordId = record.cid
        var cell = rows.get(itemIndex).cells[me.getVisibleIndex()].firstChild
        console.log(cell)
        var widget = me.liveWidgets[recordId] = oldWidgetMap[recordId] || me.getFreeWidget()
        widget.$widgetRecord = record
        widget.$widgetColumn = me
        var el = widget.el
        var rendered = widget.rendered
        if (el && rendered) {
          dom = el
          if (dom.parentNode !== cell) {
            $(cell).empty()
            cell.appendChild(el)
          }
          if (!isFixedSize) {
            //widget.setWidth(width)
          }
          //widget.reattachToBody()
        } else {
          if (!isFixedSize) {
            //widget.width = width
          }
          $(cell).empty()
          widget.render(cell)
        }
      })
    },

    setupViewListeners: function (view) {
      var me = this

      me.viewListeners = view.on({
        refresh: me.onViewRefresh,
        itemupdate: me.onItemUpdate,
        itemadd: me.onItemAdd,
        itemremove: me.onItemRemove
      }, me)

    /*if (Ext.isIE8) {
      view.on('beforerefresh', me.onBeforeRefresh, me)
    }*/
    }
  })
}))
