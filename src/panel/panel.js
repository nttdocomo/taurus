/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('../view/base');
	var Spinner = require('../spinner/wave');
	return taurus.view('taurus.panel.Base',Base.extend({
		autoHeight:false,
		header:true,
		referTo:$(window),
		tpl:'<%if(header){%><div class="panel-heading"><h4 class="panel-title"><%=title%></h4></div><%}%><div class="panel-body"><%=content%></div>',
		className:'panel panel-default',
		events:{
			'click .refresh' : 'refresh',
			'click .tool-collapse-top, .tool-expand-bottom' : 'toggleCollapse'
		},
		initialize:function(){
			Base.prototype.initialize.apply(this,arguments);
			if(this.title){
				this.$el.addClass('has-header');
			}
		},
		getTplData : function() {
			return {
				header:this.title,
				title:this.collapsible ? this.title + '<span class="tool-collapse-top"></span>' : this.title,
				content:this.loading ? (new Spinner({
					renderTo:this.$el
				})).html() : this.content,
				tool:this.refreshable ? '<a href="" class="pull-right halflings refresh" data-name="refresh" data-type="" data-prefix="halflings" data-utf="E031"></a>':''
			};
		},

	    /**
	     * Shortcut for performing an {@link #method-expand} or {@link #method-collapse} based on the current state of the panel.
	     * @return {Ext.panel.Panel} this
	     */
	    toggleCollapse: function(e) {
	        this.collapsed ? this.expand() : this.collapse();
	    	$(e.target).toggleClass('tool-collapse-top').toggleClass('tool-expand-bottom');
	    	this.$el.toggleClass('collapsed');
	    	return false;
	    },
	    expand:function(){
	    	this.collapsed = false;
	    },
	    collapse:function(){
	    	this.collapsed = true;
	    },
		refresh:function(){
			this.onRefresh && this.onRefresh();
			return false;
		},
		getItemContainer : function() {
			return Base.prototype.getItemContainer.apply(this,arguments).find('.panel-body');
		}
	}));
});
