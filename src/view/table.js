/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('./base');
	var Thead = require('./tableHeader');
	var TableBody = require('./tableBody');
	return Base.extend({
		header:true,
		tpl:'<div class="grid-item-container"><table><%=rows%></table></div>',
		rowTpl:['<tr>',
            '<%=cell%>',
        '</tr>'].join(''),
        cellTpl: [
	        '<td class="<%=tdCls%>" <%=tdAttr%> style="<%if(tdStyle){%><%=tdStyle%><%}%>" tabindex="-1">',
	            '<div class="grid-cell-inner" ',
	                'style="text-align:<%=align%>;<%if(style){%><%=style%><%}%>"><%=value%></div>',
	        '</td>'].join(''),
		className:'grid-view',

	    // Private properties used during the row and cell render process.
	    // They are allocated here on the prototype, and cleared/re-used to avoid GC churn during repeated rendering.
	    rowValues: {
	        itemClasses: [],
	        rowClasses: []
	    },
	    cellValues: {
	        classes: [
	            taurus.baseCSSPrefix + 'grid-cell ' + taurus.baseCSSPrefix + 'grid-td' // for styles shared between cell and rowwrap
	        ]
	    },
		initialize:function(config){
	        // Adjust our base class if we are inside a TreePanel
	        if (config.grid.isTree) {
	            config.baseCls = taurus.baseCSSPrefix + 'tree-view';
	        }
			Base.prototype.initialize.apply(this,arguments);
		},
		initComponent:function(){
	        var me = this;

	        if (me.columnLines) {
	            me.addCls(me.grid.colLinesCls);
	        }
	        if (me.rowLines) {
	            me.addCls(me.grid.rowLinesCls);
	        }

	        /**
	         * @private
	         * @property {Ext.dom.Fly} body
	         * A flyweight Ext.Element which encapsulates a reference to the view's main row containing element.
	         * *Note that the `dom` reference will not be present until the first data refresh*
	         */
	        //me.body = new Ext.dom.Fly();
	        //me.body.id = me.id + 'gridBody';

	        // If trackOver has been turned off, null out the overCls because documented behaviour
	        // in AbstractView is to turn trackOver on if overItemCls is set.
	        if (!me.trackOver) {
	            me.overItemCls = null;
	        }

	        me.headerCt.view = me;

	        // Features need a reference to the grid.
	        // Grid needs an immediate reference to its view so that the view can reliably be got from the grid during initialization
	        me.grid.view = me;
	        me.initFeatures(me.grid);

	        //me.itemSelector = me.getItemSelector();
	        //me.all = new Ext.view.NodeCache(me);

	        Base.prototype.initComponent.apply(this,arguments);
	        me.collection.on('sync',_.bind(me.reset,me));
	        me.collection.on('reset',_.bind(me.reset,me));
	        $(window).on('resize',function(){
	        	me.headerCt.setColumnsWidth(me.getCellsWidth())
	        });
			/*var me = this, headerCtCfg = this.columns;
			if(this.header){
				if (_.isArray(headerCtCfg)) {
	                headerCtCfg = {
	                    items: headerCtCfg
	                };
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
		afterRender:function(){
			Base.prototype.afterRender.apply(this,arguments);
			this.headerCt.setColumnsWidth(this.getCellsWidth())
		},
		getCellsWidth:function(){
			var cells = this.$el.find('tr:eq(0) > td');
			return _.map(cells,function(cell){
				return $(cell).innerWidth();
			})
		},
		initFeatures:function(grid){
	        /*var me = this,
	            i,
	            features,
	            feature,
	            len;

	        // Row container element emitted by tpl
	        me.tpl             = Ext.XTemplate.getTpl(this, 'tpl');

	        // The rowTpl emits a <div>
	        me.rowTpl          = Ext.XTemplate.getTpl(this, 'rowTpl');
	        me.addRowTpl(Ext.XTemplate.getTpl(this, 'outerRowTpl'));

	        // Each cell is emitted by the cellTpl
	        me.cellTpl        = Ext.XTemplate.getTpl(this, 'cellTpl');

	        me.featuresMC = new Ext.util.MixedCollection();
	        features = me.features = me.constructFeatures();
	        len = features ? features.length : 0;
	        for (i = 0; i < len; i++) {
	            feature = features[i];

	            // inject a reference to view and grid - Features need both
	            feature.view = me;
	            feature.grid = grid;
	            me.featuresMC.add(feature);
	            feature.init(grid);
	        }*/
		},
		getTplData:function(){
			return {
				//THead:this.renderTHead(),
				rows:this.renderRows(this.collection.toJSON())
			}
		},
		renderRows:function(rows, viewStartIndex){
	        var rowValues = this.rowValues,
	            rowCount = rows.length,
	            html = '',
	            i;

	        rowValues.view = this;
	        viewStartIndex = viewStartIndex || 0;
	        //rowValues.columns = columns;
	        for (i = 0; i < rowCount; i++, viewStartIndex++) {
	            rowValues.itemClasses.length = rowValues.rowClasses.length = 0;
	            html += this.renderRow(rows[i], i, viewStartIndex);
	        }

	        // Dereference objects since rowValues is a persistent on our prototype
	        rowValues.view = rowValues.columns = rowValues.record = null;
	        return html;
		},
		renderRow:function(record, recordIndex, rowIndex){
			var me = this,
			columns,
			rowValues = me.rowValues;
			rowValues.record = record
			if (!rowValues.columns) {
	            columns = rowValues.columns = me.ownerCt.getVisibleColumnManager()//.getColumns();
	        } else {
	        	columns = rowValues.columns;
	        }
			return _.template(this.rowTpl,_.extend(rowValues,{
				cell:me.renderCells(columns, record, recordIndex, rowIndex)
			},me.tableValues));
		},
		renderCells:function(columns,record,recordIndex,rowIndex){
			var me = this;
			return _.map(columns,function(column,i){
				return me.renderCell(column, record, recordIndex,rowIndex,i)
			}).join('')
		},
		renderCell:function(column, record, recordIndex, rowIndex, columnIndex){
			var me = this,
			cellValues = me.cellValues,
			classes = cellValues.classes,
			fieldValue = record[column.dataIndex];
			cellValues.align = column.align;
			cellValues.column = column;
			cellValues.tdCls = cellValues.tdStyle = cellValues.tdAttr = cellValues.style = "";
			if (column.renderer && column.renderer.call) {
	            fullIndex = me.ownerCt.columnManager.getHeaderIndex(column);
	            value = column.renderer.call(column.usingDefaultRenderer ? column : column.scope || me.ownerCt, fieldValue, cellValues, record, recordIndex, fullIndex, me.dataSource, me);
	            if (cellValues.css) {
	                // This warning attribute is used by the compat layer
	                // TODO: remove when compat layer becomes deprecated
	                record.cssWarning = true;
	                cellValues.tdCls += ' ' + cellValues.css;
	                cellValues.css = null;
	            }

	            // Add any tdCls which was added to the cellValues by the renderer.
	            if (cellValues.tdCls) {
	                classes[clsInsertPoint++] = cellValues.tdCls;
	            }
	        } else {
	            value = fieldValue;
	        }
	        cellValues.tdCls = classes.join(' ');
			cellValues.value = (value == null || value === '') ? column.emptyCellText : value;
			return _.template(this.cellTpl,_.extend(cellValues));
		},
		renderTHead:function(){
	        var headers = this.headerFns,
	            len, i;

	        if (headers) {
	            for (i = 0, len = headers.length; i < len; ++i) {
	                headers[i].call(this, values, out, parent);
	            }
	        }
		},
		reset:function(){
			console.log(this)
			this.html();
		},
		childEls:{
			'gridBody':'.grid-body',
			'gridTable':'.grid-table',
			'gridHeader':'.grid-header',
			'gridTableCell':'.grid-table tr:eq(0) td',
			'gridTableHeader':'.grid-table tr:eq(0) th',
			'gridTableHeaderCell':'.grid-header tr th',
			'gridResizeMarker':'.grid-resize-marker'
		}
	})
})
