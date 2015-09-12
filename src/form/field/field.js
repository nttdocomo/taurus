define(function(require){
	var Field = function(){};
	Field.prototype = {
		isFormField : true,

	    /**
	     * Initializes the field's value based on the initial config.
	     */
	    initValue: function() {
	        var me = this;

	        // Set the initial value if we have one.
	        // Prevent validation on initial set.
	        if ('value' in me) {
	            me.suspendCheckChange++;
	            me.setValue(me.value);
	            me.suspendCheckChange--;
	        }
	        
	        /**
	         * @property {Object} originalValue
	         * The original value of the field as configured in the {@link #value} configuration, or as loaded by the last
	         * form load operation if the form's {@link Ext.form.Basic#trackResetOnLoad trackResetOnLoad} setting is `true`.
	         */
	        me.initialValue = me.originalValue = me.lastValue = me.getValue();
	    },
		checkChange : function() {
			var me = this, newVal, oldVal;
			if (!me.suspendCheckChange) {
				newVal = this.getValue();
				oldVal = this.lastValue;
				if (!_.isEqual(newVal, oldVal)) {
					this.lastValue = newVal;
					this.trigger('change', newVal, oldVal);
					this.onChange(newVal, oldVal);
				}
			}
		}
	}
	return Field;
})