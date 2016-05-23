/**
 * @author nttdocomo
 */
 (function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['taurus'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('taurus'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('taurus'));
	}
}(this, function(taurus){
	var Panel = function(){};
	Panel.prototype = {
	    addRowTpl: function(newTpl) {
	        return this.insertTpl('rowTpl', newTpl);
	    },
		getView:function(cls){
			var me = this,
            scroll, scrollable, viewConfig;
            if (!me.view) {
            	viewConfig = me.viewConfig;
            	viewConfig = _.extend({
	                // TableView injects the view reference into this grid so that we have a reference as early as possible
	                // and Features need a reference to the grid.
	                // For these reasons, we configure a reference to this grid into the View
	                grid: me,
	                'class':me.viewType,
	                renderTo:me.bodyEl,
	                collection:me.collection,
	                ownerGrid: me.ownerGrid,
                	columnLines: me.columnLines,
	                headerCt: me.headerCt,
	                panel: me,
	                features: me.features,
	                emptyText: me.emptyText || ''
	            }, me.viewConfig);

				me.view = taurus.create(viewConfig);

				me.view.on({
	                uievent: me.processEvent,
	                scope: me
	            });
            }
            return me.view;
		}
	}
	return Panel;
}));
