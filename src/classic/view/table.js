/**
 * @author nttdocomo
 */
;(function (root, factory) {
  if (typeof define === 'function') {
    if (define.amd) {
      define(['./view', '../grid/cellContext', '../../selection/rowModel', 'backbone', 'underscore', 'taurus'], factory)
    }
    if (define.cmd) {
      define(function (require, exports, module) {
        return factory(require('./view'), require('../grid/cellContext'), require('../../selection/rowModel'), require('backbone'), require('underscore'), require('taurus'))
      })
    }
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('./view'), require('../grid/cellContext'), require('../../selection/rowModel'), require('backbone'), require('underscore'), require('taurus'))
  }
}(this, function (Base, CellContext, RowModel, Backbone, _, taurus) {
  return Base.extend({
    header: true,
    tpl: '<div class="grid-item-container"><table><%=rows%></table></div>',
    rowTpl: ['<tr class="<%=itemClasses.join(" ")%>" data-item-id="<%=record.cid%>" id="<%=id%>">',
      '<%=cell%>',
      '</tr>'].join(''),
    cellTpl: [
      '<td class="<%=tdCls%>" <%=tdAttr%> style="<%if(tdStyle){%><%=tdStyle%><%}%>" tabindex="-1" data-column-id="<%=column.cid%>">',
      '<div class="grid-cell-inner" ',
      'style="<%if(style){%><%=style%><%}%>"><%=value%></div>',
      '</td>'].join(''),
    className: 'grid-view',
    itemCls: 'grid-item',
    cellSelector: 'td.' + taurus.baseCSSPrefix + 'grid-cell',
    childEls: {
      'all':'table tr',
      'gridBody': '.grid-body',
      'gridTable': '.grid-table',
      'gridHeader': '.grid-header',
      'gridTableCell': '.grid-table tr:eq(0) td',
      'gridTableHeader': '.grid-table tr:eq(0) th',
      'gridTableHeaderCell': '.grid-header tr th',
      'gridResizeMarker': '.grid-resize-marker'
    },
    // Private properties used during the row and cell render process.
    // They are allocated here on the prototype, and cleared/re-used to avoid GC churn during repeated rendering.
    rowValues: {
      itemClasses: [],
      rowClasses: []
    },
    config: {
      selectionModel: {
        type: RowModel
      }
    },
    selectionModel: {
      type: RowModel
    },
    cellValues: {
      classes: [
        taurus.baseCSSPrefix + 'grid-cell ' + taurus.baseCSSPrefix + 'grid-td' // for styles shared between cell and rowwrap
      ]
    },
    constructor: function (config) {
      Base.call(this, config)
    },
    initialize: function (config) {
      // Adjust our base class if we are inside a TreePanel
      if (config.grid.isTree) {
        config.baseCls = taurus.baseCSSPrefix + 'tree-view'
      }
      Base.prototype.initialize.apply(this, arguments)
    },
    initComponent: function () {
      var me = this
      if (me.columnLines) {
        me.$el.addClass(me.grid.colLinesCls)
      }
      if (me.rowLines) {
        me.addCls(me.grid.rowLinesCls)
      }

      /**
       * @private
       * @property {Ext.dom.Fly} body
       * A flyweight Ext.Element which encapsulates a reference to the view's main row containing element.
       * *Note that the `dom` reference will not be present until the first data refresh*
       */
      // me.body = new Ext.dom.Fly()
      // me.body.id = me.id + 'gridBody'

      // If trackOver has been turned off, null out the overCls because documented behaviour
      // in AbstractView is to turn trackOver on if overItemCls is set.
      if (!me.trackOver) {
        me.overItemCls = null
      }

      me.headerCt.view = me

      // Features need a reference to the grid.
      // Grid needs an immediate reference to its view so that the view can reliably be got from the grid during initialization
      me.grid.view = me
      me.initFeatures(me.grid)

      // me.itemSelector = me.getItemSelector()
      // me.all = new Ext.view.NodeCache(me)

      Base.prototype.initComponent.apply(this, arguments)
      // me.collection.on('sync reset update change',_.debounce(_.bind(me.reset,me),500))
      /*me.collection.on('reset',_.bind(me.reset,me))
      me.collection.on('update',_.debounce(_.bind(me.reset,me)))
      me.collection.on('change',_.bind(me.reset,me));*/
      $(window).on('resize', function () {
        me.headerCt.setColumnsWidth(me.getCellsWidth())
      })
    /*var me = this, headerCtCfg = this.columns
    if(this.header){
    	if (_.isArray(headerCtCfg)) {
	                headerCtCfg = {
	                    items: headerCtCfg
	                }
	            }
	            new Thead($.extend(headerCtCfg,{
	            	renderTo:this.$el
	            }))
    }
    me.collection.on('reset',_.bind(this.reset,this));*/
    /*this.table = new TableBody($.extend({
    	collection:this.collection,
    	columns:this.columns,
    	rowTemplate:this.rowTemplate,
    	sortable:this.sortable,
    	renderTo:this.$el
    }));*/
    },
    afterRender: function () {
      Base.prototype.afterRender.apply(this, arguments)
      this.headerCt.setColumnsWidth(this.getCellsWidth())
    },
    convertWidthsToFlexes: function () {
      var me = this,
        totalWidth = 0,
        cells = this.$el.find('tr:eq(0) > td')
      _.each(cells, function (cell) {
        totalWidth += $(cell).outerWidth()
      })
      return totalWidth !== me.$el.width()
    },
    getCellsWidth: function () {
      var me = this,
        cells = this.$el.find('tr:eq(0) > td'),
        columns = me.columns
      if (me.forceFit) {
        if (me.convertWidthsToFlexes(ownerContext)) {
        }
      }
      return _.map(cells, function (cell) {
        var clientRect = cell.getBoundingClientRect()
        // http://stackoverflow.com/questions/20087491/setting-font-family-to-sans-serif-causes-jquery-to-calculate-incorrect-outerwidt
        return clientRect.width || (clientRect.right - clientRect.left); // original version $(cell).innerWidth()
      })
    },

    getNodeByRecord: function(record) {
        return this.retrieveNode(this.getRowId(record), false);
    },

    getRowId: function(record){
        return this.id + '-record-' + record.cid;
    },

    indexOf: function(node) {
      node = this.getNode(node);
      if (!node && node !== 0) {
        return -1;
      }
      return this.$el.find('tr').index(node);
    },
    initFeatures: function (grid) {
      /*var me = this,
          i,
          features,
          feature,
          len

      // Row container element emitted by tpl
      me.tpl             = Ext.XTemplate.getTpl(this, 'tpl')

      // The rowTpl emits a <div>
      me.rowTpl          = Ext.XTemplate.getTpl(this, 'rowTpl')
      me.addRowTpl(Ext.XTemplate.getTpl(this, 'outerRowTpl'))

      // Each cell is emitted by the cellTpl
      me.cellTpl        = Ext.XTemplate.getTpl(this, 'cellTpl')

      me.featuresMC = new Ext.util.MixedCollection()
      features = me.features = me.constructFeatures()
      len = features ? features.length : 0
      for (i = 0; i < len; i++) {
          feature = features[i]

          // inject a reference to view and grid - Features need both
          feature.view = me
          feature.grid = grid
          me.featuresMC.add(feature)
          feature.init(grid)
      }*/
    },
    getTplData: function () {
      return {
        // THead:this.renderTHead(),
        rows: this.renderRows(this.collection)
      }
    },

    /**
     * Returns a CSS selector which selects a particular column if the desired header is passed,
     * or a general cell selector is no parameter is passed.
     *
     * @param {Ext.grid.column.Column} [header] The column for which to return the selector. If
     * omitted, the general cell selector which matches **ant cell** will be returned.
     *
     */
    getCellSelector: function (header) {
      return header ? header.getCellSelector() : this.cellSelector
    },

    getHeaderByCell: function (cell) {
      if (cell) {
        return this.ownerCt.getVisibleColumnManager().getHeaderById(cell.attr('data-column-id'))
      }
      return false
    },

    /**
     * Returns the table row given the passed Record, or index or node.
     * @param {HTMLElement/String/Number/Ext.data.Model} nodeInfo The node or record, or row index.
     * to return the top level row.
     * @return {HTMLElement} The node or null if it wasn't found
     */
    getRow: function(nodeInfo) {
      if (_.isNumber(nodeInfo)) {
          fly = this.$el.find('tr').eq(nodeInfo);
          return fly;
      }
    },

    getVisibleColumnManager: function () {
      return this.ownerCt.getVisibleColumnManager()
    },

    // after adding a row stripe rows from then on
    onAdd: function (store, options) {
      var me = this,
        collection = me.collection,
        bufferedRenderer = me.bufferedRenderer
      me.reset()
      me.refresh(store, options)
      /*if (collection.length) {
      	me.reset()
      }*/

    /*if (me.rendered && bufferedRenderer) {
    	me.refresh(store, index, [], records)
         //bufferedRenderer.onReplace(store, index, [], records)
    } else {
        Base.prototype.onAdd.apply(me,arguments)
    }
    me.setPendingStripe(index);*/
    },
    onCellClick: taurus.emptyFn,
    onCellMouseDown: taurus.emptyFn,

    // GridSelectionModel invokes onRowSelect as selection changes
    onRowSelect: function(rowIdx) {
      var me = this,
          rowNode;

      //me.addItemCls(rowIdx, me.selectedItemCls);
      
      rowNode = me.getRow(rowIdx)
      rowNode.addClass(me.selectedItemCls)
      
      if (rowNode) {
        rowNode.attr('aria-selected', true);
      }

      //<feature legacyBrowser>
      /*if (Ext.isIE8) {
        me.repaintBorder(rowIdx + 1);
      }*/
      //</feature>
    },

    // GridSelectionModel invokes onRowDeselect as selection changes
    onRowDeselect: function(rowIdx) {
      var me = this,
          rowNode;

      //me.removeItemCls(rowIdx, me.selectedItemCls);
      
      rowNode = me.getRow(rowIdx)
      rowNode.removeClass(me.selectedItemCls)
      
      if (rowNode) {
        rowNode.removeAttr('aria-selected');
      }

      //<feature legacyBrowser>
      /*if (Ext.isIE8) {
          me.repaintBorder(rowIdx + 1);
      }*/
      //</feature>
    },
    processItemEvent: function (record, item, rowIndex, e) {
      var me = this,
        self = me.self,
        map = me.EventMap,
        type = e.type,
        // features = me.features,
        // len = features.length,
        i, cellIndex, result, feature, column,
        eventPosition = e.position = me.eventPosition || (me.eventPosition = new CellContext()),
        row, cell /*,
	            navModel = me.getNavigationModel()*/
      if (me.indexInStore(item) !== -1) {
        row = item
        cell = e.getTarget(me.getCellSelector(), row)
        if (cell) {
          column = me.getHeaderByCell(cell)
          cellIndex = me.ownerCt.getColumnManager().getHeaderIndex(column)
        }
        eventPosition.setAll(
          me,
          rowIndex,
          column ? me.getVisibleColumnManager().getHeaderIndex(column) : -1,
          record,
          column
        )
        eventPosition.cellElement = cell
        me.trigger('uievent', type, me, cell, rowIndex, cellIndex, e, record, row)
        // if the element whose event is being processed is not an actual cell (for example if using a rowbody
        // feature and the rowbody element's event is being processed) then do not fire any "cell" events
        // Don't handle cellmouseenter and cellmouseleave events for now
        if (cell && type !== 'mouseover' && type !== 'mouseout') {
          result = !((me['onCell' + map[type]](cell, cellIndex, record, row, rowIndex, e) === false) || (me.trigger('cell' + type, me, cell, cellIndex, record, row, rowIndex, e) === false))
        }
        eventPosition.column = column
      }
      if (result !== false) {
        result = me.trigger('row' + type, me, record, row, rowIndex, e)
      }
      return false
    },

    processSpecialEvent: function (e) {
      var me = this,
        features = me.features,
        ln = features.length,
        type = e.type,
        i, feature, prefix, featureTarget,
        beforeArgs, args,
        panel = me.ownerCt

      Base.prototype.processSpecialEvent.apply(this, arguments)

      if (type === 'mouseover' || type === 'mouseout') {
        return
      }

      type = me.constructor.TouchEventMap[type] || type
      for (i = 0; i < ln; i++) {
        feature = features[i]
        if (feature.hasFeatureEvent) {
          featureTarget = e.getTarget(feature.eventSelector, me.getTargetEl())
          if (featureTarget) {
            prefix = feature.eventPrefix
            // allows features to implement getFireEventArgs to change the
            // fireEvent signature
            beforeArgs = feature.getFireEventArgs('before' + prefix + type, me, featureTarget, e)
            args = feature.getFireEventArgs(prefix + type, me, featureTarget, e)

            if (
              // before view event
              (me.fireEvent.apply(me, beforeArgs) === false) ||
              // panel grid event
              (panel.fireEvent.apply(panel, beforeArgs) === false) ||
              // view event
              (me.fireEvent.apply(me, args) === false) ||
              // panel event
              (panel.fireEvent.apply(panel, args) === false)
            ) {
              return false
            }
          }
        }
      }
      return true
    },

    indexInStore: function (node) {
      // We cannot use the stamped in data-recordindex because that is the index in the original configured store
      // NOT the index in the dataSource that is being used - that may be a GroupStore.
      return node ? this.collection.indexOf(this.getRecord(node)) : -1
    },
    getRecord: function (node) {
      if (node instanceof Backbone.Model) {
        return node
      } else {
        return Base.prototype.getRecord.call(this, node)
      }
    },
    getRowId: function (record) {
      return this.id + '-record-' + record.cid
    },

    retrieveNode: function(id, dataRow){
      var result = this.$el.find('#' + id);

      /*if (dataRow && result) {
          return Ext.fly(result).down(this.rowSelector, true);
      }*/
      return result;
    },
    beforeRender: function () {
      this.getSelectionModel().beforeViewRender(this)
    },
    getSelectionModel: function(){
      return this.selectionModel
    },
    renderRows: function (rows, viewStartIndex) {
      var me = this,
        rowValues = this.rowValues,
        rowCount = rows.length,
        html = '',
        i

      rowValues.view = this
      viewStartIndex = viewStartIndex || 0
      // rowValues.columns = columns
      for (i = 0; i < rowCount; i++, viewStartIndex++) {
        rowValues.itemClasses.length = rowValues.rowClasses.length = 0
        html += this.renderRow(rows.at(i), i, viewStartIndex)
      }

      // Dereference objects since rowValues is a persistent on our prototype
      rowValues.view = rowValues.columns = rowValues.record = null
      return html
    },
    renderRow: function (record, recordIndex, rowIndex) {
      var me = this,
        columns,
        itemCls = me.itemCls,
        selModel = me.selectionModel,
        rowValues = me.rowValues,
        itemClasses = rowValues.itemClasses
      rowValues.record = record
      rowValues.rowId = me.getRowId(record)
      rowValues.itemCls = rowValues.rowCls = ''
      if (!rowValues.columns) {
        columns = rowValues.columns = me.ownerCt.getVisibleColumnManager().getColumns()
      } else {
        columns = rowValues.columns
      }
      itemClasses.push(itemCls)
      return _.template(this.rowTpl)(_.extend(rowValues, {
        cell: me.renderCells(columns, record, recordIndex, rowIndex),
        id:me.getRowId(record)
      }, me.tableValues))
    },
    renderCells: function (columns, record, recordIndex, rowIndex) {
      var me = this
      return _.map(columns, function (column, i) {
        return me.renderCell(column, record, recordIndex, rowIndex, i)
      }).join('')
    },
    renderCell: function (column, record, recordIndex, rowIndex, columnIndex) {
      var me = this,
        value,
        cellValues = me.cellValues,
        classes = cellValues.classes,
        clsInsertPoint,
        fieldValue = record.get(column.dataIndex)
      cellValues.align = column.align
      cellValues.column = column
      cellValues.innerCls = column.innerCls
      cellValues.tdCls = cellValues.tdStyle = cellValues.tdAttr = cellValues.style = ''
      column.cellWidth = column.width || column.minWidth
      if (column.cellWidth) {
        cellValues.tdStyle = 'width:' + column.cellWidth + 'px;'
      }
      if (cellValues.align) {
        cellValues.style += 'text-align:' + cellValues.align
      }
      clsInsertPoint = 2
      if (column.renderer && column.renderer.call) {
        fullIndex = me.ownerCt.columnManager.getHeaderIndex(column)
        value = column.renderer.call(column.usingDefaultRenderer ? column : column || me.ownerCt, fieldValue, cellValues, record, recordIndex, fullIndex, me.collection, me)
        if (cellValues.css) {
          // This warning attribute is used by the compat layer
          // TODO: remove when compat layer becomes deprecated
          record.cssWarning = true
          cellValues.tdCls += ' ' + cellValues.css
          cellValues.css = null
        }

        // Add any tdCls which was added to the cellValues by the renderer.
        if (cellValues.tdCls) {
          classes[clsInsertPoint++] = cellValues.tdCls
        }
      } else {
        value = fieldValue
      }
      classes.length = clsInsertPoint
      cellValues.tdCls = classes.join(' ')
      cellValues.value = (value == null || value === '') ? column.emptyCellText : value
      return _.template(this.cellTpl)(_.extend(cellValues))
    },
    renderTHead: function () {
      var headers = this.headerFns,
        len, i

      if (headers) {
        for (i = 0, len = headers.length; i < len; ++i) {
          headers[i].call(this, values, out, parent)
        }
      }
    },
    refresh: function (store, options) {
      var me = this
      me._super.apply(me, arguments)
    },
    onReset: function () {
      var me = this
      me.renderHtml()
      me._super.apply(me, arguments)
    },
    reset: function () {
      this.renderHtml()
    },
    /**
     * @private
     * Create a config object for this view's selection model based upon the passed grid's configurations.
     */
    applySelectionModel: function(selModel, oldSelModel) {
      var me = this,
          grid = me.grid,
          defaultType = selModel.type;

      // If this is the initial configuration, pull overriding configs in from the owning TablePanel.
      if (!oldSelModel) {
          // Favour a passed instance
          if (!(selModel && selModel.isSelectionModel)) {
              selModel = grid.selModel || selModel;
          }
      }

      if (selModel) {
          if (selModel.isSelectionModel) {
              selModel.allowDeselect = grid.allowDeselect || selModel.selectionMode !== 'SINGLE';
              selModel.locked = grid.disableSelection;
          } else {
              if (typeof selModel === 'string') {
                  selModel = {
                      type: selModel
                  };
              }
              // Copy obsolete selType property to type property now that selection models are Factoryable
              // TODO: Remove selType config after deprecation period
              else {
                  selModel.type = grid.selType || selModel.selType || selModel.type || defaultType;
              }
              if (!selModel.mode) {
                  if (grid.simpleSelect) {
                      selModel.mode = 'SIMPLE';
                  } else if (grid.multiSelect) {
                      selModel.mode = 'MULTI';
                  }
              }
              var SelModel = selModel.type
              selModel = new SelModel({
                  allowDeselect: grid.allowDeselect,
                  locked: grid.disableSelection
              })
              /*selModel = Ext.Factory.selection(Ext.apply({
                  allowDeselect: grid.allowDeselect,
                  locked: grid.disableSelection
              }, selModel));*/
          }
      }
      return selModel;
    }
  })
}))
