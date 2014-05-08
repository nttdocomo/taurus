/**
 * @author nttdocomo
 */
/* # Example usage
 *
 * 		@example
 *		new taurus.form.field.Text({
 * 			name: 'name',
 * 			fieldLabel: 'Name',
 * 			inputType: 'password'
 * 		})
 */
define(function(require) {
	var Base = require("./base");
	return taurus.view("taurus.form.field.Text", Base.extend({
		allowBlank : true,
		blankText : 'This field is required',
		minLengthText : 'The minimum length for this field is <%=len%>',
		getErrors : function(value) {
			var errors = Base.prototype.getErrors.apply(this, arguments), regex = this.regex, validator = this.validator;
			if (value.length < 1 || value === this.emptyText) {
				if (!this.allowBlank) {
					errors.push(this.blankText);
				}
				//if value is blank, there cannot be any additional errors
			}
			if (_.isFunction(validator)) {
	            msg = validator.call(this, value);
	            if (msg !== true) {
	                errors.push(msg);
	            }
	        }

			if (value.length < this.minLength) {
				errors.push(_.template(this.minLengthText, {
					len : this.minLength
				}));
			}
			if (value && regex && !regex.test(value)) {
				errors.push(this.regexText || this.invalidText);
			}
			return errors;
		},
		getRawValue : function() {
			var v = Base.prototype.getRawValue.apply(this, arguments);
			if (v === this.emptyText) {
				v = '';
			}
			return v;
		},
		getSubTplData : function() {
			var me = this, value = me.getRawValue(), isEmpty = me.emptyText && value.length < 1, placeholder;

			if (isEmpty) {
				if (Modernizr.input.placeholder) {
					placeholder = me.emptyText;
				} else {
					value = me.emptyText;
				}
			}

			return $.extend(Base.prototype.getSubTplData.apply(this, arguments), {
				placeholder : placeholder
			});
		},
		processRawValue : function(value) {
			var me = this, stripRe = me.stripCharsRe, newValue;
			if (stripRe) {
				newValue = value.replace(stripRe, '');
				if (newValue !== value) {
					me.setRawValue(newValue);
					value = newValue;
				}
			}
			return value;
		}
	}));
});
