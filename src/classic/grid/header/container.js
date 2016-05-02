/**
 * @author nttdocomo
 */
 (function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['../../../view/base','../column/column','../columnManager'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('../../../view/base'),require('../column/column'),require('../columnManager'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('../../../view/base'),require('../column/column'),require('../columnManager'));
	}
}(this, function(Base,Column,ColumnManager) {
	return taurus.view('taurus.grid.header.Container',Base.extend({
		className : 'grid-header-ct',
		defaultType : Column,
		events:{
			'click .column-header':'onHeaderCtEvent'
		},
		initComponent : function() {
			var me = this;
	        me.headerCounter = 0;
	        me.plugins = me.plugins || [];
	        me.defaults = me.defaults || {};
	        me.defaults.columnLines = me.columnLines;
	        if (!me.isGroupHeader) {
                me.isRootHeader = true;

	            me.columnManager = new ColumnManager(false, me);
	            me.visibleColumnManager = new ColumnManager(true, me);
	            if (me.grid) {
	                me.grid.columnManager = me.columnManager;
	                me.grid.visibleColumnManager = me.visibleColumnManager;
	            }
	            /*if(me.hiddenHeaders){
	            	me.$el.css('display','none');
	            }*/
            }
			Base.prototype.initComponent.apply(this, arguments);
		},
		applyColumnsState:function(columns){

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

	    // Find the topmost HeaderContainer
	    getRootHeaderCt: function() {
	        var me = this;
	        return me.isRootHeader ? me : undefined;
	    },

	    getHeaderElByEvent: function(e) {
	        return $(e.currentTarget);
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
	    }/*,

	    isColumnHidden: function(rootHeader) {
	        var owner = this.getRefOwner();
	        while (owner && owner !== rootHeader) {
	            if (owner.$el.is(':hidden')) {
	                return true;
	            }
	            owner = owner.getRefOwner();
	        }
	        return false;
	    }*/,

	    onHeaderCtEvent: function(e, t) {
	        var me = this,
	            headerEl = me.getHeaderElByEvent(e),
	            header,
	            targetEl,
	            allColumns = me.getGridColumns(),
	            len = allColumns.length,
	            activeHeader;

	        if (me.longPressFired) {
	            // if we just showed the menu as a result of a longpress, do not process
	            // the click event and sort the column.
	            me.longPressFired = false;
	            return;
	        }

	        if (headerEl/* && !me.ddLock*/) {
	            header = headerEl.data('component');
	            if (header) {
	            	activeHeader = header.onTitleElClick(e, targetEl, me.sortOnClick);
	                /*targetEl = header[header.clickTargetName];
	                // If there's no possibility that the mouseEvent was on child header items,
	                // or it was definitely in our titleEl, then process it
	                if ((!header.isGroupHeader && !header.isContainer) || e.within(targetEl)) {
	                    if (e.type === 'click' || e.type === 'tap') {
	                        // The header decides which header to activate on click
	                        // on Touch, anywhere in the splitter zone activates
	                        // the left header.
	                        activeHeader = header.onTitleElClick(e, targetEl, me.sortOnClick);
	                        if (activeHeader) {
	                            me.onHeaderTriggerClick(activeHeader, e, Ext.supports.Touch ? activeHeader.el : activeHeader.triggerEl);
	                        } else {
	                            me.onHeaderClick(header, e, t);
	                        }
	                    }
	                    else if (e.type === 'contextmenu') {
	                        me.onHeaderContextMenu(header, e, t);
	                    } else if (e.type === 'dblclick' && header.resizable) {
	                        header.onTitleElDblClick(e, targetEl.dom);
	                    }
	                }*/
	            }
	        };
	        for (i = 0; i < len; i++) {
	            column = allColumns[i];

	            column.setSortState();
	        }
	    },
		setColumnsWidth:function(widths){
			var me = this,items = me.items,headers = this.$el.find('.column-header');
			headers.each(function(i,header){
				$(header).width(widths[i] || items[i].width);
			});
			me.updateLayout()
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
		},
		updateLayout:function(){
			Base.prototype.updateLayout.apply(this,arguments);
			var me = this,paging,height;
			me.$el.css({
				'margin-top':-1*me.$el.outerHeight()
			})
			me.$el.parent().css({
				'padding-top':me.$el.outerHeight()
			})
			me.ownerCt.updateLayout()
		}
	}));
}));
