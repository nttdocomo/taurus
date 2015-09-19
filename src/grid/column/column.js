/**
 * @author nttdocomo
 */
define(function(require) {
	var Base = require('../../view/base'),
	HeaderResizer = require('../plugin/headerResizer');
	return Base.extend({
		className : 'column-header',
		possibleSortStates : ['ASC', 'DESC'],
		ascSortCls : 'column-header-sort-ASC',
		descSortCls : 'column-header-sort-DESC',
		sortable:false,
		rendererNames: {
	        column: 'renderer',
	        edit: 'editRenderer',
	        summary: 'summaryRenderer'
	    },
		tpl : '<div id="<%=id%>-titleEl" class="column-header-inner"><span id="<%=id%>-textEl" class="column-header-text"><%=text%></span><%if(sortable){%> <span class="caret"></span><%}%></div>',
		initialize : function() {
			Base.prototype.initialize.apply(this, arguments);
		},
		initComponent:function(){
			var me = this;
			me.setupRenderer();
			if (me.flex) {
                me.minWidth = me.minWidth || HeaderResizer.prototype.minColWidth;
            }
			Base.prototype.initComponent.apply(this, arguments);
		},
		/*delegateEvents : function(events) {
			var events = $.extend(events || {}, this.events, {
				'click' : 'onTitleElClick'
			});
			Base.prototype.delegateEvents.call(this, events);
		},*/
		doSort : function(state) {
			var me = this, collection = this.$el.parents('.grid').data('component').collection;
			collection.setSort(me.getSortParam(), state.toLowerCase());
			/*collection.comparator = function(chapterA, chapterB) {
				if (chapterA.get(me.getSortParam()) > chapterB.get(me.getSortParam())) {
					return state == 'ASC' ? -1 : 1;
				}
				if (chapterA.get(me.getSortParam()) < chapterB.get(me.getSortParam())) {
					return state == 'ASC' ? 1 : -1;
					;
				}
				return 0;
				// equal
			};
			collection.sort();*/
		},

		/**
		 * Returns the parameter to sort upon when sorting this header. By default this returns the dataIndex and will not
		 * need to be overriden in most cases.
		 * @return {String}
		 */
		getSortParam : function() {
			return this.dataIndex;
		},
		getTplData : function() {
			return $.extend(Base.prototype.getTplData.apply(this, arguments), {
				sortable : this.sortable,
				text : this.text
			});
		},

		// Find the topmost HeaderContainer
		getOwnerHeaderCt : function() {
			var me = this;
			return me.$el.parents('.grid-header-ct').data('component');
		},

	    isSortable: function() {
	        var sortable = this.sortable;
	        return sortable;
	    },

	    isColumnHidden: function(rootHeader) {
	        var owner = this.getRefOwner();
	        while (owner && owner !== rootHeader) {
	            if (owner.$el.is(':hidden')) {
	                return true;
	            }
	            owner = owner.getRefOwner();
	        }
	        return false;
	    },
		onTitleElClick : function() {
			this.toggleSortState();
		},

	    /**
	     * @private
	     * Process UI events from the view. The owning TablePanel calls this method, relaying events from the TableView
	     * @param {String} type Event type, eg 'click'
	     * @param {Ext.view.Table} view TableView Component
	     * @param {HTMLElement} cell Cell HTMLElement the event took place within
	     * @param {Number} recordIndex Index of the associated Store Model (-1 if none)
	     * @param {Number} cellIndex Cell index within the row
	     * @param {Ext.event.Event} e Original event
	     */
	    processEvent: function(type, view, cell, recordIndex, cellIndex, e) {
	        /*return this.trigger.apply(this, arguments);*/
	    },
	    setupRenderer:function(type){
	        type = type || 'column';

	        var me = this,
	            //format   = me[me.formatterNames[type]],
	            renderer = me[me.rendererNames[type]],
	            isColumnRenderer = type === 'column',
	            scoped;

	        if (isColumnRenderer && me.defaultRenderer) {
                me.renderer = me.defaultRenderer;
                me.usingDefaultRenderer = true;
            }
	    },
	    sort: function(direction) {
	        var me = this,
	            grid = me.ownerCt.grid,
	            oldDirection = me.direction || -1,
	            collection = grid.collection;

	        // Maintain backward compatibility.
	        // If the grid is NOT configured with multi column sorting, then specify "replace".
	        // Only if we are doing multi column sorting do we insert it as one of a multi set.
	        // Suspend layouts in case multiple views depend upon this grid's store (eg lockable assemblies)
	        //Ext.suspendLayouts();
	        me.sorting = true;
	        collection.setSorting(me.getSortParam(), direction ? direction : oldDirection*-1, {side: "client"});
	        collection.fullCollection.sort();
	        //store.sort(me.getSortParam(), direction, grid.multiColumnSort ? 'multi' : 'replace');
	        delete me.sorting;
	        me.setSortState()
	        //Ext.resumeLayouts(true);
	    },

		toggleSortState : function() {
	        if (this.isSortable()) {
	            this.sort();
	        }
		},

		setSortState : function(state, skipClear, initial) {
			var me = this, ascCls = me.ascSortCls, descCls = me.descSortCls, ownerHeaderCt = me.getOwnerHeaderCt(), oldSortState = me.sortState,oldDirection = me.direction,
	            grid = me.ownerCt.grid,
			collection = grid.collection,direction = collection.state.sortKey == me.dataIndex ? collection.state.order : null;

			switch (direction) {
				case -1:
					me.$el.addClass(descCls);
					me.$el.removeClass(ascCls);
					break;
				case 1:
					me.$el.addClass(ascCls);
					me.$el.removeClass(descCls);
					break;
				default:
					me.$el.removeClass([ascCls, descCls].join(" "));
			}
			me.direction = direction;
			/*state = state || null;

			if (!me.sorting && oldDirection !== direction && (me.getSortParam() != null)) {
				// don't trigger a sort on the first time, we just want to update the UI
				if (state && !initial) {
					// when sorting, it will call setSortState on the header again once
					// refresh is called
					me.sorting = true;
					me.doSort(state);
					me.sorting = false;
				}
				switch (direction) {
					case -1:
						me.$el.addClass(descCls);
						me.$el.removeClass(ascCls);
						break;
					case 1:
						me.$el.addClass(ascCls);
						me.$el.removeClass(descCls);
						break;
					default:
						me.$el.removeClass([ascCls, descCls].join(" "));
				}
				me.direction = direction;
				if (ownerHeaderCt && !me.triStateSort && !skipClear) {
					ownerHeaderCt.clearOtherSortStates(me);
				}
				me.sortState = state;
				// we only want to fire the event if we have a null state when using triStateSort
				if (me.triStateSort || state != null) {
				 ownerHeaderCt.fireEvent('sortchange', ownerHeaderCt, me, state);
				 }
			}*/
		}
	});
});
