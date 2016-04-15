/**
 * @author nttdocomo
 */
 (function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['../taurus'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('../taurus'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('../taurus'));
	}
}(this, function(taurus){
	var FieldAncestor = function(){};
	FieldAncestor.prototype = {
		/**
	     * @private Handle bubbled errorchange events from descendants; invoke the aggregated event and method
	     */
	    handleFieldErrorChange: function(labelable, activeError) {
	        var me = this;
	        if (labelable !== me) {
	            me.trigger('fielderrorchange', me, labelable, activeError);
	            me.onFieldErrorChange(labelable, activeError);
	        }
	    },

	    /**
	     * Fired when the validity of any field within the container changes.
	     * @param {Ext.form.field.Field} field The sub-field whose validity changed
	     * @param {Boolean} valid The new validity state
	     * @protected
	     */
	    onFieldValidityChange: taurus.emptyFn,

	    /**
	     * @private Handle bubbled validitychange events from descendants; invoke the aggregated event and method
	     */
	    handleFieldValidityChange: function(field, isValid) {
	        var me = this;
	        if (field !== me) {
	            me.trigger('fieldvaliditychange', me, field, isValid);
	            me.onFieldValidityChange(field, isValid);
	        }
	    },
	    onChildFieldAdd: function(field) {
	        var me = this;
	        field.on('errorchange', me.handleFieldErrorChange, me);
	        field.on('validitychange', me.handleFieldValidityChange, me);
	    }
	}
	return FieldAncestor;
}));