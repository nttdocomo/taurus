/**
 * @author nttdocomo
 */
define(function(require) {
	require("./trigger");
	require("../../lang/number");
	require("../../lang/string");
	return taurus.view("taurus.form.field.Number", taurus.form.field.Trigger.extend({
		baseChars : '0123456789',
		allowDecimals : true,
		decimalSeparator : '.',
		minValue : Number.NEGATIVE_INFINITY,
		maxValue : Number.MAX_VALUE,
		autoStripChars : false,
		decimalPrecision : 2,
		step: 1,
		triggerTpl : '<div class="input-group-btn"><button class="btn btn-default spinner"><span class="caret"></span><span class="caret"></span></button></div>',
		initialize : function() {
			taurus.form.field.Trigger.prototype.initialize.apply(this, arguments);
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
			taurus.form.field.Text.prototype.delegateEvents.call(this, events);
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
		onTriggerClick : function(e) {
			$(e.currentTarget).children().index($(e.target).closest('.caret')) ? this.spinDown() : this.spinUp();
			return false;
		},
		// private
		parseValue : function(value) {
			value = parseFloat(String(value).replace(this.decimalSeparator, '.'));
			return isNaN(value) ? null : value;
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
	}));
});