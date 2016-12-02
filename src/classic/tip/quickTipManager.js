/**
 * @author nttdocomo
 */
 (function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['../class','underscore'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('../class'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('../class'));
	}
}(this, function(Class){
	return Class.extend({
		/**
	     * Initializes the global QuickTips instance and prepare any quick tips.
	     * @param {Boolean} [autoRender=true] True to render the QuickTips container
	     * immediately to preload images.
	     * @param {Object} [config] config object for the created QuickTip. By
	     * default, the {@link Ext.tip.QuickTip QuickTip} class is instantiated, but this can
	     * be changed by supplying an xtype property or a className property in this object.
	     * All other properties on this object are configuration for the created component.
	     */
	    init : function (autoRender, config) {
	        var me = this;

	        if (!me.tip) {
	            var tipConfig = Ext.apply({
	                //<debug>
	                // tell the spec runner to ignore this element when checking if the dom is clean 
	                sticky: true,
	                //</debug>
	                disabled: me.disabled,
	                id: 'ext-quicktips-tip'
	            }, config),
	                className = tipConfig.className,
	                xtype = tipConfig.xtype;

	            if (className) {
	                delete tipConfig.className;
	            } else if (xtype) {
	                className = 'widget.' + xtype;
	                delete tipConfig.xtype;
	            }

	            if (autoRender !== false) {
	                tipConfig.renderTo = document.body;

	                //<debug>
	                if (tipConfig.renderTo.tagName.toUpperCase() !== 'BODY') { // e.g., == 'FRAMESET'
	                    Ext.raise({
	                        sourceClass: 'Ext.tip.QuickTipManager',
	                        sourceMethod: 'init',
	                        msg: 'Cannot init QuickTipManager: no document body'
	                    });
	                }
	                //</debug>
	            }

	            me.tip = Ext.create(className || 'Ext.tip.QuickTip', tipConfig);

	            // private.
	            // Need a globally accessible way of testing whether QuickTipsManager is 
	            // both loaded AND initialized.
	            Ext.quickTipsActive = true;
	        }
	    }
	});
}));
