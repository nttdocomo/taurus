/**
 * @author nttdocomo
 */
define(function(require) {
	var Base = require('../../view/base');
	return Base.extend({
		className : 'column-header',
		possibleSortStates : ['ASC', 'DESC'],
		ascSortCls : 'column-header-sort-ASC',
		descSortCls : 'column-header-sort-DESC',
		tpl : '<div id="<%=id%>-titleEl" class="column-header-inner"><span id="<%=id%>-textEl" class="column-header-text"><%=text%></span><%if(sortable){%> <span class="caret"></span><%}%></div>',
		initialize : function() {
			Base.prototype.initialize.apply(this, arguments);
		},
		delegateEvents : function(events) {
			var events = $.extend(events || {}, this.events, {
				'click' : 'onTitleElClick'
			});
			Base.prototype.delegateEvents.call(this, events);
		},

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
		onTitleElClick : function() {
			this.toggleSortState();
		},

		toggleSortState : function() {
			var me = this, idx, nextIdx;

			if (me.sortable) {
				idx = _.indexOf(me.possibleSortStates, me.sortState);

				nextIdx = (idx + 1) % me.possibleSortStates.length;
				me.setSortState(me.possibleSortStates[nextIdx]);
			}
		},

		setSortState : function(state, skipClear, initial) {
			var me = this, ascCls = me.ascSortCls, descCls = me.descSortCls, ownerHeaderCt = me.getOwnerHeaderCt(), oldSortState = me.sortState;

			state = state || null;

			if (!me.sorting && oldSortState !== state && (me.getSortParam() != null)) {
				// don't trigger a sort on the first time, we just want to update the UI
				if (state && !initial) {
					// when sorting, it will call setSortState on the header again once
					// refresh is called
					me.sorting = true;
					me.doSort(state);
					me.sorting = false;
				}
				switch (state) {
					case 'DESC':
						me.$el.addClass(descCls);
						me.$el.removeClass(ascCls);
						break;
					case 'ASC':
						me.$el.addClass(ascCls);
						me.$el.removeClass(descCls);
						break;
					default:
						me.$el.removeClass([ascCls, descCls].join(" "));
				}
				if (ownerHeaderCt && !me.triStateSort && !skipClear) {
					ownerHeaderCt.clearOtherSortStates(me);
				}
				me.sortState = state;
				// we only want to fire the event if we have a null state when using triStateSort
				/*if (me.triStateSort || state != null) {
				 ownerHeaderCt.fireEvent('sortchange', ownerHeaderCt, me, state);
				 }*/
			}
		}
	});
});
