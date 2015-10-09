/**
 * @author nttdocomo
 */
 (function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['./column'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('./column'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('./column'));
	}
}(this, function(Column){
	return Column.extend({
		width:23,
		text:'&#160;',
		initialize:function(config){
			var me = this;

	        // Copy the prototype's default width setting into an instance property to provide
	        // a default width which will not be overridden by Container.applyDefaults use of Ext.applyIf
	        me.width = me.width;

	        Column.prototype.initialize.apply(this,arguments)

	        // Override any setting from the HeaderContainer's defaults
	        me.sortable = false;

	        me.scope = me;
		},
		/**
	     * @private
	     */
	    defaultRenderer: function(value, metaData, record, rowIdx, colIdx, dataSource, view) {
	        var rowspan = this.rowspan,
	            page = dataSource.state.currentPage,
	            result = view.collection.indexOf(record);

	        if (metaData && rowspan) {
	            metaData.tdAttr = 'rowspan="' + rowspan + '"';
	        }

	        if (page > 1) {
	            result += (page - 1) * dataSource.state.pageSize;
	        }
	        return result + 1;
	    }
	})
}));