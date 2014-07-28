/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('./base');
	var Thead = require('./tableHeader');
	var TableBody = require('./tableBody');
	return taurus.view('taurus.views.Table',Base.extend({
		header:true,
		tpl:'',
		tagName:'table',
		className:'table',
		initialize:function(){
			Base.prototype.initialize.apply(this,arguments);
			var me = this, headerCtCfg = this.columns;
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
			this.table = new TableBody($.extend({
				collection:this.collection,
				columns:this.columns,
				sortable:this.sortable,
				renderTo:this.$el
			}));
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
	}))
})
