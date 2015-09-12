define(function(require){
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

	    onChildFieldAdd: function(field) {
	        var me = this;
	        field.on('errorchange', me.handleFieldErrorChange, me);
	        //field.on('validitychange', me.handleFieldValidityChange, me);
	    }
	}
	return FieldAncestor;
})