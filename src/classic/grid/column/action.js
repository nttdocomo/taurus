/**
 * @author nttdocomo
 */
/* global define*/
;(function (root, factory) {
  if (typeof define === 'function') {
    if (define.amd) {
      define(['./column', 'underscore', '../../../taurus'], factory)
    }
    if (define.cmd) {
      define(function (require, exports, module) {
        return factory(require('./column'), require('underscore'), require('../../../taurus'))
      })
    }
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('./column'), require('underscore'), require('../../../taurus'))
  }
}(this, function (Column, _, taurus) {
  return Column.extend({
    actionIconCls: taurus.baseCSSPrefix + 'action-col-icon',
    stopSelection:true,
    actionIdRe: new RegExp(taurus.baseCSSPrefix + 'action-col-(\\d+)'),
    initialize: function (config) {
      var me = this
      var cfg = _.extend({}, config)
      // Items may be defined on the prototype
      var items = cfg.items || me.items || [me]
      var hasGetClass, i, len

      me.origRenderer = cfg.renderer || me.renderer
      me.origScope = cfg.scope || me.scope

      me.renderer = me.scope = cfg.renderer = cfg.scope = null

      // This is a Container. Delete the items config to be reinstated after construction.
      // cfg.items = null
      Column.prototype.initialize.apply(this, [cfg])

      // Items is an array property of ActionColumns
      // me.items = items

      for (i = 0, len = items.length; i < len; ++i) {
        if (items[i].getClass) {
          hasGetClass = true
          break
        }
      }

      // Also need to check for getClass, since it changes how the cell renders
      if (me.origRenderer || hasGetClass) {
        me.hasCustomRenderer = true
      }
    },
    render: function () {
      var me = this
      var items = me.items
      me.items = null
      Column.prototype.render.apply(this, arguments)
      me.items = items
    },

    initComponent: function () {
      var me = this
      Column.prototype.initComponent.apply(this, arguments)
      if (me.sortable && !me.dataIndex) {
        me.sortable = false
      }
    },
    // add:function(){},

    // Renderer closure iterates through items creating an <img> element for each and tagging with an identifying
    // class name x-action-col-{n}
    defaultRenderer: function (v, cellValues, record, rowIdx, colIdx, store, view) {
      var me = this
      var scope = me.origScope || me
      var items = me.items
      var len = items.length
      var i, item, text, ret, disabled, tooltip, altText, icon

      // Allow a configured renderer to create initial value (And set the other values in the "metadata" argument!)
      // Assign a new variable here, since if we modify "v" it will also modify the arguments collection, meaning
      // we will pass an incorrect value to getClass/getTip
      ret = _.isFunction(me.origRenderer) ? me.origRenderer.apply(scope, arguments) || '' : ''

      cellValues.tdCls += ' ' + taurus.baseCSSPrefix + 'action-col-cell'
      for (i = 0; i < len; i++) {
        item = items[i]
        icon = item.icon
        text = item.text || ''

        disabled = item.disabled || (item.isDisabled ? item.isDisabled.call(item.scope || scope, view, rowIdx, colIdx, item, record) : false)
        tooltip = disabled ? null : (item.tooltip || (item.getTip ? item.getTip.apply(item.scope || scope, arguments) : null))
        altText = item.getAltText ? item.getAltText.apply(item.scope || scope, arguments) : item.altText || me.altText

        // Only process the item action setup once.
        if (!item.hasActionConfiguration) {
          // Apply our documented default to all items
          item.stopSelection = me.stopSelection
          item.disable = _.bind(me.disableAction, me, [i], 0)
          // item.enable = _.bind(me.enableAction, me, [i], 0)
          item.hasActionConfiguration = true
        }

        ret += '<' + (icon ? 'img' : 'div') + ' tabIndex="0" role="button"' + (icon ? (' alt="' + altText + '" src="' + item.icon + '"') : '') +
        ' class="' + me.actionIconCls + ' ' + taurus.baseCSSPrefix + 'action-col-' + String(i) + ' ' +
        (disabled ? me.disabledCls + ' ' : ' ') +
        (_.isFunction(item.getClass) ? item.getClass.apply(item.scope || scope, arguments) : (item.iconCls || me.iconCls || '')) + '"' +
        (tooltip ? ' data-qtip="' + tooltip + '"' : '') + (icon ? '/>' : '>' + text + '</div>')
      }
      return ret
    },

    /**
     * Disables this ActionColumn's action at the specified index.
     * @param {Number/Ext.grid.column.Action} index
     * @param {Boolean} [silent=false]
     */
    disableAction: function (index, silent) {
      var me = this

      if (!index) {
        index = 0
      } else if (!_.isNumber(index)) {
        index = _.indexOf(me.items, index)
      }
      me.items[index].disabled = true
      me.up('tablepanel').el.select('.' + taurus.baseCSSPrefix + 'action-col-' + index).addClass(me.disabledCls)
      if (!silent) {
        me.fireEvent('disable', me)
      }
    },
    processEvent: function (type, view, cell, recordIndex, cellIndex, e, record, row) {
      console.log('action column processEvent')
      var me = this,
        target = e.target,
        item
      if (target && (match = target.className.match(me.actionIdRe))) {
        item = me.items[parseInt(match[1], 10)]
        item.handler.apply(this, [view, recordIndex, cellIndex, item, e, record, row])
      }
      return me._super.apply(me, arguments)
    }
  })
}))
