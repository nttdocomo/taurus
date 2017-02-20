(function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['../../view/base'], function(Base) {
				return factory(Base);
			});
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('../../view/base'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('../../view/base'));
	}
}(this, function(Base) {
	return Base.extend({
		//layout:'auto',
		initialize:function(){
			var me = this;
			me._super.apply(me,arguments);
			me.$el.addClass(me.layout)
		},
		initComponent:function(){
			var me = this;
			me._super.apply(me,arguments);
			me.getLayout();
	    	if(this.layout){
	    		this.$el.addClass(this.layout.type)
	    	}
		},

    /**
     * Adds layout's itemCls and owning Container's itemCls
     * @protected
     */
		configureItem:function(item){
			var me = this
			var itemCls = me.itemCls
			var needsCopy, addClasses;
			if (itemCls) {
        // itemCls can be a single class or an array
        if (typeof itemCls === 'string') {
          addClasses = [itemCls];
        } else {
          addClasses = itemCls;
          needsCopy = !!addClasses;
        }
      }
			if (addClasses) {
        item.addClass(addClasses);
      }
		},

    /**
     * Returns the {@link Ext.layout.container.Container layout} instance currently associated with this Container.
     * If a layout has not been instantiated yet, that is done first
     * @return {Ext.layout.container.Container} The layout
     */
    getLayout: function() {
      var me = this
      var layout = me.layout;

      if (!layout || !layout.isLayout) {
        me.setLayout(layout);
      }

      return me.layout;
    },
		setLayout:function(layout){
			var me = this;
			if(layout){
				 layout = this.layout = new layout;
			}
			/*if (typeof layout === 'string') {
	            layout = {
	                type: layout
	            };
	        }
	        type = layout.type;*/
		}
	})
}));
