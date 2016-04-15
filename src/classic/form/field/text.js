/**
 * @author nttdocomo
 */
 (function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['./base','../../taurus','underscore','modernizr'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('./base'),require('../../taurus'),require('underscore'),require('modernizr'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('./base'),require('../../taurus'),require('underscore'),require('modernizr'));
	}
}(this, function(Base,taurus,_,Modernizr) {
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

			if (value.length < this.minLength) {
				errors.push(_.template(this.minLengthText)({
					len : this.minLength
				}));
			}

			if (value.length > this.maxLength) {
				errors.push(_.template(this.maxLengthText)({
					len : this.maxLength
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
			var me = this, value = me.getRawValue(), isEmpty = me.emptyText && value.length < 1, placeholder,
			maxLength = me.maxLength;

			if (isEmpty) {
				if (Modernizr.input.placeholder) {
					placeholder = me.emptyText;
				} else {
					value = me.emptyText;
				}
			}
			if (me.enforceMaxLength && Modernizr.input.max) {
	            if (maxLength === Number.MAX_VALUE) {
	                maxLength = undefined;
	            }
	        } else {
	            maxLength = undefined;
	        }

			return $.extend(Base.prototype.getSubTplData.apply(this, arguments), {
				placeholder : placeholder,
				maxLength:maxLength
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
}));