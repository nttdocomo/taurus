/**
 * @author nttdocomo
 */
define(function(require) {
	var Base = require('../../view/base'),
	Column = require('../column/column'),
	ColumnManager = require('../columnManager');
	return Base.extend({
		className : 'grid-header-ct',
		defaultType : Column,
		initComponent : function() {
			var me = this;
	        me.headerCounter = 0;
	        me.plugins = me.plugins || [];
	        me.defaults = me.defaults || {};

	        if (!me.isGroupHeader) {
                me.isRootHeader = true;

	            me.columnManager = new ColumnManager(false, me);
	            me.visibleColumnManager = new ColumnManager(true, me);
	            if (me.grid) {
	                me.grid.columnManager = me.columnManager;
	                me.grid.visibleColumnManager = me.visibleColumnManager;
	            }
	            if(me.hiddenHeaders){
	            	me.$el.css('display','none');
	            }
            }
			Base.prototype.initComponent.apply(this, arguments);
		},

	    /**
	     * Returns an array of all columns which appear in the grid's View. This goes down to the leaf column header
	     * level, and does not return **grouped** headers which contain sub headers.
	     *
	     * It includes hidden headers even though they are not rendered. This is for collection of menu items for the column hide/show menu.
	     *
	     * Headers which have a hidden ancestor have a `hiddenAncestor: true` property injected so that descendants are known to be hidden without interrogating
	     * that header's ownerCt axis for a hidden ancestor.
	     * @returns {Array}
	     */
	    getGridColumns: function(/* private - used in recursion*/inResult, hiddenAncestor) {
	        if (!inResult && this.gridDataColumns) {
	            return this.gridDataColumns;
	        }

	        var me = this,
	            result = inResult || [],
	            items, i, len, item,
	            lastVisibleColumn;

	        hiddenAncestor = hiddenAncestor || me.hidden;
	        if (me.items) {
	            items = me.items.items;

	            // An ActionColumn (Columns extend HeaderContainer) may have an items *array* being the action items that it renders.
	            if (items) {
	                for (i = 0, len = items.length; i < len; i++) {
	                    item = items[i];
	                    if (item.isGroupHeader) {
	                        // Group headers will need a visibleIndex for if/when they're removed from their owner.
	                        // See Ext.layout.container.Container#moveItemBefore.
	                        item.visibleIndex = result.length;
	                        item.getGridColumns(result, hiddenAncestor);
	                    } else {
	                        item.hiddenAncestor = hiddenAncestor;
	                        result.push(item);
	                    }
	                }
	            }
	        }
	        if (!inResult) {
	            me.gridDataColumns = result;
	        }

	        // If top level, correct first and last visible column flags
	        if (!inResult && len) {
	            // Set firstVisible and lastVisible flags
	            for (i = 0, len = result.length; i < len; i++) {
	                item = result[i];

	                // The column index within all (visible AND hidden) leaf level columns.
	                // Used as the cellIndex in TableView's cell renderer call
	                item.fullColumnIndex = i;
	                item.isFirstVisible = item.isLastVisible = false;
	                if (!(item.hidden || item.hiddenAncestor)) {
	                    if (!lastVisibleColumn) {
	                        item.isFirstVisible = true;
	                    }
	                    lastVisibleColumn = item;
	                }
	            }
	            // If we haven't hidden all columns, tag the last visible one encountered
	            if (lastVisibleColumn) {
	                lastVisibleColumn.isLastVisible = true;
	            }
	        }

	        return result;
	    },

	    /**
	     * Returns an array of the **visible** columns in the grid. This goes down to the lowest column header
	     * level, and does not return **grouped** headers which contain sub headers.
	     * @returns {Array}
	     */
	    getVisibleGridColumns: function() {
	        var me = this,
	            allColumns, rootHeader,
	            result, len, i, column;

	        if (me.gridVisibleColumns) {
	            return me.gridVisibleColumns;
	        }

	        allColumns = me.getGridColumns();
	        rootHeader = me.getRootHeaderCt();
	        result = [];
	        len = allColumns.length;

	        // Use an inline check instead of ComponentQuery filtering for better performance for
	        // repeated grid row rendering - as in buffered rendering.
	        for (i = 0; i < len; i++) {
	            column = allColumns[i];

	            if (!column.hidden && !column.isColumnHidden(rootHeader)) {
	                result[result.length] = column;
	            }
	        }

	        me.gridVisibleColumns = result;

	        return result;
	    },
		setColumnsWidth:function(widths){
			var headers = this.$el.find('.column-header');
			headers.each(function(i,header){
				$(header).width(widths[i]);
			});
		},
		/*setSize:function(){
			var width = this.$el.width(), items = this.items, headers = this.$el.find('.column-header'), fullWidth = 0;
			for (var i = 0, len = items.length; i < len; i++) {
				var item = items[i], header = headers.eq(i);
				if (!item.flex) {
					fullWidth += item.width;
					header.width(item.width);
				}
			}
			flexWidth = width - fullWidth;
			var flexItems = _.filter(items, function(item) {
				return item.flex;
			});
			flexWidth = flexWidth / flexItems.length;
			for (var i = 0, len = items.length; i < len; i++) {
				var item = items[i], header = headers.eq(i);
				if (item.flex) {
					header.width(flexWidth);
				}
			}
		},*/
		getGridColumns:function(){
			var result = [];
			this.$el.find('.column-header').each(function(i,item){
				result.push($(this).data('component'));
			});
			return result;
		},

		// invoked internally by a header when not using triStateSorting
		clearOtherSortStates : function(activeHeader) {
			var headers = this.getGridColumns(), headersLn = headers.length, i = 0;

			for (; i < headersLn; i++) {
				if (headers[i] !== activeHeader && headers[i].sortable) {
					// unset the sortstate and dont recurse
					headers[i].setSortState(null, true);
				}
			}
		}
	});
});
