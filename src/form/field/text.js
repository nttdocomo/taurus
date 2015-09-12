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
	var Base = require("./base"),
	Modernizr = require('modernizr'),
	taurus = require('../../taurus'),
	_ = require('underscore');
	return Base.extend({
		allowBlank : true,
		blankText : 'This field is required',
		minLengthText : 'The minimum length for this field is <%=len%>',
		maxLengthText:'The maximum length for this field is <%=len%>',
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

			if (this.getStrLen(value) < this.minLength) {
				errors.push(_.template(this.minLengthText)({
					len : this.minLength
				}));
			}

			if (this.getStrLen(value) > this.maxLength) {
				errors.push(_.template(this.maxLengthText)({
					len : this.maxLength
				}));
			}
			if (value && regex && !regex.test(value)) {
				errors.push(this.regexText || this.invalidText);
			}
			return errors;
		},
		getStrLen:function(str){
			var len = 0;  
		    var i;  
		    var c;  
		    for (var i=0;i<str.length;i++){  
		        c = str.charCodeAt(i);  
		        if (taurus.isDbcCase(c)) { //半角  
		            len = len + 1;  
		        } else { //全角  
		            len = len + 2;  
		        }  
		    }  
		    return len;  
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

	    onKeyDown: function(e) {
	        this.trigger('keydown', e);
	    },

	    onKeyUp: function(e) {
	        this.trigger('keyup', e);
	    },

	    onKeyPress: function(e) {
	        this.trigger('keypress', e);
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
		},
		delegateEvents : function(events) {
			if (this.enableKeyEvents) {
	            $.extend(events,{
	                'keyup': 'onKeyUp',
	                'keydown': 'onKeyDown',
	                'keypress': 'onKeyPress'
	            });
	        }
			Base.prototype.delegateEvents.call(this, events);
		}
	});
});
