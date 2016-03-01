/**
 * @author nttdocomo
 */
 (function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['./view','./tableHeader','./tableBody','backbone','underscore'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('./view'),require('./tableHeader'),require('./tableBody'),require('backbone'),require('underscore'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('./view'),require('./tableHeader'),require('./tableBody'),require('backbone'),require('underscore'));
	}
}(this, function(Base,Thead,TableBody,Backbone,_){
	return Base.extend({
		header:true,
		tpl:'<div class="grid-item-container"><table><%=rows%></table></div>',
		rowTpl:['<tr class="<%=itemClasses.join(" ")%>" data-item-id="<%=record.cid%>">',
            '<%=cell%>',
        '</tr>'].join(''),
        cellTpl: [
	        '<td class="<%=tdCls%>" <%=tdAttr%> style="<%if(tdStyle){%><%=tdStyle%><%}%>" tabindex="-1" data-column-id="<%=column.cid%>">',
	            '<div class="grid-cell-inner" ',
	                'style="<%if(style){%><%=style%><%}%>"><%=value%></div>',
	        '</td>'].join(''),
		className:'grid-view',
		itemCls: 'grid-item',
		cellSelector: 'td.' + taurus.baseCSSPrefix + 'grid-cell',
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
	            me.$el.addClass(me.grid.colLinesCls);
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
	        //me.collection.on('sync reset update change',_.debounce(_.bind(me.reset,me),500));
	        /*me.collection.on('reset',_.bind(me.reset,me));
	        me.collection.on('update',_.debounce(_.bind(me.reset,me)));
	        me.collection.on('change',_.bind(me.reset,me));*/
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
		convertWidthsToFlexes:function(){
			var me = this,
			totalWidth = 0,
			cells = this.$el.find('tr:eq(0) > td');
			_.each(cells,function(cell){
				totalWidth += $(cell).outerWidth();
			})
			return totalWidth !== me.$el.width();
		},
		getCellsWidth:function(){
			var me = this,
			cells = this.$el.find('tr:eq(0) > td'),
			columns = me.columns;
			if(me.forceFit){
				if(me.convertWidthsToFlexes(ownerContext)){

				}
			}
			return _.map(cells,function(cell){
				return $(cell).outerWidth();
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
				rows:this.renderRows(this.collection)
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
	    getCellSelector: function(header) {
	        return header ? header.getCellSelector() : this.cellSelector;
	    },

	    getHeaderByCell: function(cell) {
	        if (cell) {
	            return this.ownerCt.getVisibleColumnManager().getHeaderById(cell.attr('data-column-id'));
	        }
	        return false;
	    },
		processItemEvent:function(record, item, rowIndex, e){
	        var me = this,
	            self = me.self,
	            //map = self.EventMap,
	            type = e.type,
	            //features = me.features,
	            //len = features.length,
	            i, cellIndex, result, feature, column,
	            eventPosition = e.position = me.eventPosition || {},//(me.eventPosition = new Ext.grid.CellContext()),
	            row, cell/*,
	            navModel = me.getNavigationModel()*/;
	        if (me.indexInStore(item) !== -1) {
	        	row = item;
		        cell = e.getTarget(me.getCellSelector(), row);
		        if(cell){
		        	column = me.getHeaderByCell(cell);
		        	cellIndex = me.ownerCt.getColumnManager().getHeaderIndex(column);
		        }
		        eventPosition.column = column;
	        }
			var result = me.trigger('uievent', type, me, cell, rowIndex, cellIndex, e, record, row);
		},

	    processSpecialEvent: function(e) {
	        var me = this,
	            features = me.features,
	            ln = features.length,
	            type = e.type,
	            i, feature, prefix, featureTarget,
	            beforeArgs, args,
	            panel = me.ownerCt;

	        Base.prototype.processSpecialEvent.apply(this,arguments);

	        if (type === 'mouseover' || type === 'mouseout') {
	            return;
	        }

	        type = me.constructor.TouchEventMap[type] || type;
	        for (i = 0; i < ln; i++) {
	            feature = features[i];
	            if (feature.hasFeatureEvent) {
	                featureTarget = e.getTarget(feature.eventSelector, me.getTargetEl());
	                if (featureTarget) {
	                    prefix = feature.eventPrefix;
	                    // allows features to implement getFireEventArgs to change the
	                    // fireEvent signature
	                    beforeArgs = feature.getFireEventArgs('before' + prefix + type, me, featureTarget, e);
	                    args = feature.getFireEventArgs(prefix + type, me, featureTarget, e);

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
	                        return false;
	                    }
	                }
	            }
	        }
	        return true;
	    },

	    indexInStore: function(node) {
	        // We cannot use the stamped in data-recordindex because that is the index in the original configured store
	        // NOT the index in the dataSource that is being used - that may be a GroupStore.
	        return node ? this.collection.indexOf(this.getRecord(node)) : -1;
	    },
	    getRecord:function(node){
	    	if(node instanceof Backbone.Model){
	    		return node;
	    	} else {
	    		return Base.prototype.getRecord.call(this,node)
	    	}
	    },
	    getRowId:function(record){
	    	return this.id + '-record-' + record.id;
	    },
		renderRows:function(rows, viewStartIndex){
	        var me = this,
	        	rowValues = this.rowValues,
	            rowCount = rows.length,
	            html = '',
	            i;

	        rowValues.view = this;
	        viewStartIndex = viewStartIndex || 0;
	        //rowValues.columns = columns;
	        for (i = 0; i < rowCount; i++, viewStartIndex++) {
	            rowValues.itemClasses.length = rowValues.rowClasses.length = 0;
	            html += this.renderRow(rows.at(i), i, viewStartIndex);
	        }

	        // Dereference objects since rowValues is a persistent on our prototype
	        rowValues.view = rowValues.columns = rowValues.record = null;
	        return html;
		},
		renderRow:function(record, recordIndex, rowIndex){
			var me = this,
			columns,
	        itemCls = me.itemCls,
			rowValues = me.rowValues,
	        itemClasses = rowValues.itemClasses;
			rowValues.record = record;
	        rowValues.rowId = me.getRowId(record);
	        rowValues.itemCls = rowValues.rowCls = '';
			if (!rowValues.columns) {
	            columns = rowValues.columns = me.ownerCt.getVisibleColumnManager().getColumns();
	        } else {
	        	columns = rowValues.columns;
	        }
	        itemClasses[0] = itemCls;
			return _.template(this.rowTpl)(_.extend(rowValues,{
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
			clsInsertPoint,
			fieldValue = record.get(column.dataIndex);
			cellValues.align = column.align;
			cellValues.column = column;
			cellValues.innerCls = column.innerCls;
			cellValues.tdCls = cellValues.tdStyle = cellValues.tdAttr = cellValues.style = "";
			column.cellWidth = column.width || column.minWidth
			if(column.cellWidth){
				cellValues.tdStyle = 'width:'+column.cellWidth+'px;';
			}
			if(cellValues.align){
				cellValues.style += 'text-align:'+cellValues.align;
			}
			clsInsertPoint = 2;
			if (column.renderer && column.renderer.call) {
	            fullIndex = me.ownerCt.columnManager.getHeaderIndex(column);
	            value = column.renderer.call(column.usingDefaultRenderer ? column : column || me.ownerCt, fieldValue, cellValues, record, recordIndex, fullIndex, me.collection, me);
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
	        classes.length = clsInsertPoint;
	        cellValues.tdCls = classes.join(' ');
			cellValues.value = (value == null || value === '') ? column.emptyCellText : value;
			return _.template(this.cellTpl)(_.extend(cellValues));
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
			this.renderHtml();
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
}));