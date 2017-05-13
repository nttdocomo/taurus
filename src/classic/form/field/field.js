/**
 * @author nttdocomo
 */
 (function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory();
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory();
	}
}(this, function(){
	var Field = function(superclass) {
    return superclass.extend({
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
			},

	    /**
	     * A utility for grouping a set of modifications which may trigger value changes into a single transaction, to
	     * prevent excessive firing of {@link #change} events. This is useful for instance if the field has sub-fields which
	     * are being updated as a group; you don't want the container field to check its own changed state for each subfield
	     * change.
	     * @param {Function} fn The function to call with change checks suspended.
	     */
	    batchChanges: function(fn) {
        try {
            this.suspendCheckChange++;
            fn();
        }
        catch (pseudo) {  //required with IE when using 'try'
            throw pseudo;
        }
        finally {
            this.suspendCheckChange--;
        }
        this.checkChange();
	    },
		  onChange: function (newVal, oldVal) {
		    if (this.validateOnChange) {
		      this.validate()
		    }
		  // this.checkDirty()
		  },
      /**
       * Sets a data value into the field and runs the change detection and validation.
       * @param {Object} value The value to set
       * @return {Ext.form.field.Field} this
       */
			setValue : function(value) {
				var me = this;
				me.value = value;
				me.checkChange();
				return this;
			}
    })
  }
	return Field;
}));
