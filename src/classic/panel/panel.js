/**
 * @author nttdocomo
 */
/* global define */
;(function (root, factory) {
  if (typeof define === 'function') {
    if (define.amd) {
      define(['../../view/base', '../spinner/wave'], factory)
    }
    if (define.cmd) {
      define(function (require, exports, module) {
        return factory(require('../../view/base'), require('../spinner/wave'))
      })
    }
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('../../view/base'), require('../spinner/wave'))
  }
}(this, function (Base, Spinner) {
  /**
   * Panel is a container that has specific functionality and structural components that make it the perfect building
 	 * block for application-oriented user interfaces.
   *
   * @constructor Panel
   */
  return Base.extend({
    autoHeight: false,
		/**
     * Pass as `false` to prevent a Header from being created and shown.
		 * @name Panel#header
     * @type {bool/object}
     */
    header: false,
		hideHeaders:false,
    frame: false,
		referTo:$(window),
		baseCls: 'panel',
		/**
     * When a `title` is specified, the {@link panel.Header} will 
     * automatically be created and displayed unless {@link Panel#header} is set to `false`.
		 * @name Panel#title
     * @type {string/Object}
     */
		tpl:'<%if(header){%><div class="panel-heading clearfix"><h4 class="panel-title"><%=title%></h4></div><%}%><div class="panel-body"><%=content%></div>',
		className:'panel panel-default',
		events:{
			'click .refresh' : 'refresh',
			'click .tool-collapse-top, .tool-expand-bottom' : 'toggleCollapse'
		},
    config:{
    	childEls: {
				'headEl' : '.panel-heading',
				'bodyEl' : '.panel-body',
				'header':'.panel-title',
				'frameBody' : '.panel-body'
	    }
	  },
		initialize:function(){
            var me = this;
			me._super.apply(me,arguments);
            if (me.frame) {
                me.setUI(me.ui + '-framed');
            }
			if(me.header){
				me.$el.addClass('has-header');
			}
		},
		afterRender:function(){
			var me = this,headEl = me.headEl,headElHeight;
    		me._super.apply(this,arguments);
			me.setHeaderStyle();
		},
		getTplData : function() {
            var me = this;
			return {
				header:me.header,
				title:me.collapsible ? me.title + '<span class="tool-collapse-top"></span>' : me.title,
				content: me.content,
				tool:me.refreshable ? '<a href="" class="pull-right halflings refresh" data-name="refresh" data-type="" data-prefix="halflings" data-utf="E031"></a>':''
			};
		},

	    /**
	     * Shortcut for performing an {@link #method-expand} or {@link #method-collapse} based on the current state of the panel.
	     * @return {Ext.panel.Panel} this
	     */
	    toggleCollapse: function(e) {
            var me = this;
	        me.collapsed ? me.expand() : me.collapse();
	    	$(e.target).toggleClass('tool-collapse-top').toggleClass('tool-expand-bottom');
	    	me.$el.toggleClass('collapsed');
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
			return this._super.apply(this,arguments).find('.panel-body');
		},
		/**
         * This is used to determine where to insert the 'html', 'contentEl' and 'items' in this component.
         * @private
         */
        getTargetEl: function() {
            return this.frameBody || this.$el.find('>.panel-body');
        },
		setHeaderStyle:function(){
			var me = this,headEl = me.headEl,headElHeight;
			if(headEl.length){
				headElHeight = me.headEl.outerHeight();
				me.$el.css('padding-top',headElHeight+'px');
				me.headEl.css('margin-top','-' + headElHeight+'px')
			}
			if (me.hideHeaders) {
                me.bodyEl.css('padding-top',0)
            }
		},
		setTitle:function(title){
	        var me = this,
	            oldTitle = me.title,
	            header = me.header

	        if (title !== oldTitle) {
	            me.title = title;

	            header.text(title);

	            me.trigger('titlechange', me, title, oldTitle);
	            me.setHeaderStyle();
	        }
		},

        /**
         * @inheritdoc
         */
        setUI: function(ui) {
            var me = this;

            me._super.apply(me,arguments);

            if (me.header && me.header.rendered) {
                me.header.setUI(ui);
            }
        }
	});
}));
