(function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['../../../class','underscore'], function(Base) {
				return factory(Base);
			});
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('../../../class'),require('underscore'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('../../../class'),require('underscore'));
	}
}(this, function(Base,_) {
	return Base.extend({
		layout:'auto',
		init:function(config){
			var me = this;
			//me.initConfig(config);
			_.extend(this, config);
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
		},

	    /**
	     * Returns an array of child components either for a render phase (Performed in the beforeLayout
	     * method of the layout's base class), or the layout phase (onLayout).
	     * @return {Ext.Component[]} of child components
	     */
	    getLayoutItems: function() {
	        var owner = this.owner,
	            items = owner && owner.items;

	        return (items && items.items) || [];
	    },

	    /**
	     * Returns the element into which rendering must take place. Defaults to the owner Container's
	     * target element.
	     *
	     * May be overridden in layout managers which implement an inner element.
	     *
	     * @return {Ext.dom.Element}
	     */
	    getRenderTarget: function() {
	        return this.owner.getTargetEl();
	    },
	    onAdd:function(item){
	    	var me = this;
	    	if (!item.rendered) {
	            me.configureItem(item);

	            //item.render(target, position);
	        }
	    },

	    /**
	     * Renders the given Component into the target Element.
	     * @param {Ext.Component} item The Component to render
	     * @param {Ext.dom.Element} target The target Element
	     * @param {Number} position The position within the target to render the item to
	     * @private
	     */
	    renderItem : function(item, target, position) {
	        var me = this;

	        if (!item.rendered) {
	            me.configureItem(item);

	            item.render(target/*, position*/);
	        }
	    }
	})
}));
