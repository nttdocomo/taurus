/**
 * @author nttdocomo
 */
 (function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['../../classic/form/checkboxManager','underscore'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('../../classic/form/checkboxManager'),require('underscore'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('../../classic/form/checkboxManager'),require('underscore'));
	}
}(this, function(CheckboxManager,_) {
	var CheckBox = function(){};
	CheckBox.prototype = {
	    getFormId: function(){
	        var me = this,
	            form;

	        if (!me.formId) {
	            form = me.up('form');
	            if (form) {
	                me.formId = form.id;
	            }
	        }
	        return me.formId;
	    },

	    // inherit docs
	    getManager: function() {
	        return CheckboxManager;
	    },

		/**
		 * Returns the checked state of the checkbox.
		 * @return {Boolean} True if checked, else false
		 */
		getValue : function() {
			return this.checked;
		},

		/**
		 * Returns the submit value for the checkbox which can be used when submitting forms.
		 * @return {String} If checked the {@link #inputValue} is returned; otherwise the {@link #uncheckedValue}
		 * (or null if the latter is not configured).
		 */
		getSubmitValue : function() {
			var unchecked = this.uncheckedValue, uncheckedVal = !_.isUndefined(unchecked) ? unchecked : null;
			return this.checked ? this.inputValue : uncheckedVal;
		},

		isChecked : function(rawValue, inputValue) {
			return (rawValue === true || rawValue === 'true' || rawValue === '1' || rawValue === 1 || (((_.isString(rawValue) || _.isNumber(rawValue)) && inputValue) ? rawValue == inputValue : this.onRe.test(rawValue)));
		},

		/**
		 * @private
		 * Called when the checkbox's checked state changes. Invokes the {@link #handler} callback
		 * function if specified.
		 */
		onChange : function(newVal, oldVal) {
			var me = this, handler = me.handler;
			this.constructor.__super__.onChange.apply(this, arguments);
			if (handler) {
				handler.call(me, newVal);
			}
		},

		/**
		 * Sets the checked state of the checkbox.
		 *
		 * @param {Boolean/String/Number} value The following values will check the checkbox:
		 * `true, 'true', '1', 1, or 'on'`, as well as a String that matches the {@link #inputValue}.
		 * Any other value will uncheck the checkbox.
		 * @return {Boolean} the new checked state of the checkbox
		 */
		setRawValue : function(value) {
			var me = this, inputEl = me.inputEl, checked = me.isChecked(value, me.inputValue);
			if (this.shadowInputEl) {
				//this.inputEl.prop('checked', checked);
				//me.inputEl[checked ? 'addClass' : 'removeClass'](me.checkedCls);
				me.shadowInputEl.style({
					opacity:checked ? 1:0
				})
			}

			me.checked = me.rawValue = checked;
			return checked;
		},

		/**
		 * Sets the checked state of the checkbox, and invokes change detection.
		 * @param {Boolean/String} checked The following values will check the checkbox: `true, 'true', '1', or 'on'`, as
		 * well as a String that matches the {@link #inputValue}. Any other value will uncheck the checkbox.
		 * @return {Ext.form.field.Checkbox} this
		 */
		setValue : function(checked) {
			var me = this, boxes, i, len, box;

			// If an array of strings is passed, find all checkboxes in the group with the same name as this
			// one and check all those whose inputValue is in the array, unchecking all the others. This is to
			// facilitate setting values from Ext.form.Basic#setValues, but is not publicly documented as we
			// don't want users depending on this behavior.
			if (_.isArray(checked)) {
				boxes = me.getManager().getByName(me.name, me.getFormId()).items;
				len = boxes.length;

				for ( i = 0; i < len; ++i) {
					box = boxes[i];
					box.setValue(Ext.Array.contains(checked, box.inputValue));
					this.inputEl.attr('checked',Ext.Array.contains(checked, box.inputValue))
				}
			} else {
				this.constructor.__super__.setValue.apply(this, arguments);
				this.inputEl.attr('checked',checked)
			}

			return me;
		}
	}
	return CheckBox
}));