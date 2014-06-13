/**
 * @author nttdocomo
 */
define(function(require) {
	var Base = require('../../view/base'), Column = require('../column/column');
	return Base.extend({
		className : 'grid-header-ct',
		defaultType : Column,
		initialize : function() {
			Base.prototype.initialize.apply(this, arguments);
		},
		setColumnsWidth:function(width){
			var headers = this.$el.find('.column-header');
			headers.each(function(i,header){
				$(header).width(width[i]);
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
