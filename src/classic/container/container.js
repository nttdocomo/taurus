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
		layout:'auto',
		initialize:function(){
			var me = this;
			me._super.apply(me,arguments);
			me.$el.addClass(me.layout)
		},

	    /**
	     * Adds layout's itemCls and owning Container's itemCls
	     * @protected
	     */
		configureItem:function(item){
			var me = this,
	            itemCls = me.itemCls,
				needsCopy,
	            addClasses;
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
		}
	})
}));
