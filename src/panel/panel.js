/**
 * @author nttdocomo
 */
 (function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['../view/base','../spinner/wave'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('../view/base'),require('../spinner/wave'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('../view/base'),require('../spinner/wave'));
	}
}(this, function(Base,Spinner){
	return Base.extend({
		autoHeight:false,
		header:true,
		referTo:$(window),
		tpl:'<%if(header){%><div class="panel-heading clearfix"><h4 class="panel-title"><%=title%></h4></div><%}%><div class="panel-body"><%=content%></div>',
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
				})).renderHtml() : this.content,
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
	    	this.setHeight(this.height)
	    },
	    collapse:function(){
	    	this.collapsed = true;
	    	this.setHeight('')
	    },
		refresh:function(){
			this.onRefresh && this.onRefresh();
			return false;
		},
		getItemContainer : function() {
			return Base.prototype.getItemContainer.apply(this,arguments).find('.panel-body');
		},
		/**
         * This is used to determine where to insert the 'html', 'contentEl' and 'items' in this component.
         * @private
         */
        getTargetEl: function() {
            return this.frameBody || this.$el.find('>.panel-body');
        }
	});
}));