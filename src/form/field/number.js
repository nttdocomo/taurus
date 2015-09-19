/**
 * @author nttdocomo
 */
define(function(require) {
	var Trigger = require("./trigger");
	require("../../lang/number");
	require("../../lang/string");
	return Trigger.extend({
		baseChars : '0123456789',
		allowDecimals : true,
		decimalSeparator : '.',
		minValue : Number.NEGATIVE_INFINITY,
		maxValue : Number.MAX_VALUE,
		autoStripChars : false,
		decimalPrecision : 2,
		step: 1,

	    //<locale>
	    /**
	     * @cfg {String} minText
	     * Error text to display if the minimum value validation fails.
	     */
	    minText : 'The minimum value for this field is <%=num%>',
	    //</locale>

	    //<locale>
	    /**
	     * @cfg {String} maxText
	     * Error text to display if the maximum value validation fails.
	     */
	    maxText : 'The maximum value for this field is {0}',
		nanText : '<%=num%> is not a valid number',
	    //</locale>

	    //<locale>
	    /**
	     * @cfg {String} negativeText
	     * Error text to display if the value is negative and {@link #minValue} is set to 0. This is used instead of the
	     * {@link #minText} in that circumstance only.
	     */
	    negativeText : 'The value cannot be negative',
		triggerTpl : '<div class="input-group-btn"><button class="btn btn-default spinner"><span class="caret"></span><span class="caret"></span></button></div>',
		initialize : function() {
			Trigger.prototype.initialize.apply(this, arguments);
			if (this.disableKeyFilter !== true) {
				allowed = this.baseChars + '';
				if (this.allowDecimals) {
					allowed += this.decimalSeparator;
				}
				if (this.minValue < 0) {
					allowed += '-';
				}
				allowed = taurus.String.escapeRegex(allowed);
				this.maskRe = new RegExp('[' + allowed + ']');
				if (this.autoStripChars) {
					this.stripCharsRe = new RegExp('[^' + allowed + ']', 'gi');
				}
			}
		},
		delegateEvents : function(events) {
			var events = $.extend(events || {}, this.events, {
				'click .spinner' : 'onTriggerClick'
			});
			Trigger.prototype.delegateEvents.call(this, events);
		},
		/**
		 * @private
		 */
		fixPrecision : function(value) {
			var me = this, nan = isNaN(value), precision = me.decimalPrecision;

			if (nan || !value) {
				return nan ? '' : value;
			} else if (!me.allowDecimals || precision <= 0) {
				precision = 0;
			}
			return parseFloat(taurus.Number.toFixed(parseFloat(value), precision));
		},

	    /**
	     * Runs all of Number's validations and returns an array of any errors. Note that this first runs Text's
	     * validations, so the returned array is an amalgamation of all field errors. The additional validations run test
	     * that the value is a number, and that it is within the configured min and max values.
	     * @param {Object} [value] The value to get errors for (defaults to the current field value)
	     * @return {String[]} All validation errors for this field
	     */
	    getErrors: function(value) {
	        value = arguments.length > 0 ? value : this.processRawValue(this.getRawValue());

	        var me = this,
	            errors = Trigger.prototype.getErrors.apply(this,[value]),
	            //format = Ext.String.format,
	            num;

	        if (value.length < 1) { // if it's blank and textfield didn't flag it then it's valid
	             return errors;
	        }

	        value = String(value).replace(me.decimalSeparator, '.');

	        if(_.isNaN(value)){
	            errors.push(_.template(me.nanText)({
	            	num:value
	            }));
	        }

	        num = me.parseValue(value);

	        if (me.minValue === 0 && num < 0) {
	            errors.push(this.negativeText);
	        }
	        else if (num < me.minValue) {
	            errors.push(_.template(me.minText)({
	            	num:me.minValue
	            }));
	        }

	        if (num > me.maxValue) {
	            errors.push(_.template(me.maxText)({
	            	num:me.minValue
	            }));
	        }


	        return errors;
	    },
		onTriggerClick : function(e) {
			$(e.currentTarget).children().index($(e.target).closest('.caret')) ? this.spinDown() : this.spinUp();
			return false;
		},
		// private
		parseValue : function(value) {
			value = parseFloat(String(value).replace(this.decimalSeparator, '.'));
			return _.isNaN(value) ? null : value;
		},
		rawToValue : function(rawValue) {
			var value = this.fixPrecision(this.parseValue(rawValue));
			if (value === null) {
				value = rawValue || null;
			}
			return value;
		},
		spinUp : function() {
			this.setValue(taurus.Number.constrain(this.getValue() + this.step, this.minValue, this.maxValue));
		},
		spinDown : function() {
			this.setValue(taurus.Number.constrain(this.getValue() - this.step, this.minValue, this.maxValue));
		}
	});
});