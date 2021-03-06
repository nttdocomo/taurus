/**
 * @author nttdocomo
 */
 (function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['../../view/base'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('../../view/base'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('../../view/base'));
	}
}(this, function(Base){
	return Base.extend({
		baseCls:'tooltip',
	  anchor:'left',
		hidden: true,
		childEls:{
			'bodyEl' : '.tooltip-inner'
		},
		tpl:'<div class="tooltip-arrow"></div><div class="tooltip-inner"><%=text%></div>',
		initialize:function(){
	        var me = this;
	        /*me.floating = Ext.apply( {}, {
	            shadow: me.shadow,
	            constrain: me.constrainPosition
	        }, me.self.prototype.floating);*/
	        Base.prototype.initialize.apply(this,arguments);
	        if(this.anchor){
	        	this.$el.addClass(this.getCaretDirection());
	        }

	        // Or in the deprecated config. Floating.doConstrain only constrains if the constrain property is truthy.
	        me.constrain = me.constrain || me.constrainPosition;
		},
		getCaretDirection:function(){
			return this.anchor
		},

	    /**
	     * Shows this tip at the specified XY position.  Example usage:
	     *
	     *     // Show the tip at x:50 and y:100
	     *     tip.showAt([50,100]);
	     *
	     * @param {Number[]} xy An array containing the x and y coordinates
	     */
	    showAt : function(xy){
	    	console.log(xy)
	        var me = this;
	        Base.prototype.showAt.apply(this,arguments);
	        // Show may have been vetoed.
	        if (me.isVisible()) {
	            me.setPagePosition(xy[0], xy[1]);
	            if (me.constrainPosition || me.constrain) {
	                me.doConstrain();
	            }
	            me.toFront(true);
	        }
	    }
	})
}));