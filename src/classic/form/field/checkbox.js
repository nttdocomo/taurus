/**
 * @author nttdocomo
 */
 (function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['../../../define', './base','../checkboxManager','underscore'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('../../../define'),require('./base'),require('../checkboxManager'),require('underscore'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('../../../define'),require('./base'),require('../checkboxManager'),require('underscore'));
	}
}(this, function(define, Base,CheckboxManager,_) {
	return define(Base, {
		fieldSubTpl : '<div class="<%=type%>"><%if(boxLabel){%><label id="<%=cmpId%>-boxLabelEl" for="<%=id%>" class="<%=boxLabelCls%>"><%}%><input id="<%=id%>" type="<%=type%>"<%if(checked){%> checked="<%=checked%>"<%}%> name="<%=name%>" value="<%=value%>"/><%if(boxLabel){%><%=boxLabel%></label><%}%></div>',
		inputType : 'checkbox',
		checked : false,
		/**
     * @cfg {String} [boxLabelCls='x-form-cb-label']
     * The CSS class to be applied to the {@link #boxLabel} element
     */
    boxLabelCls: taurus.baseCSSPrefix + 'form-cb-label',
		checkedCls : taurus.baseCSSPrefix + 'form-cb-checked',
		onRe : /^on$/i,

		/**
		 * @cfg {String} inputValue
		 * The value that should go into the generated input element's value attribute and should be used as the parameter
		 * value when submitting as part of a form.
		 */
		inputValue : 'on',
		childEls: {
			'inputEl' : ':checkbox'
		},

		initComponent: function() {
      var me = this
      var value = me.value

      if (value !== undefined) {
      	me.checked = me.isChecked(value, me.inputValue);
      }

      me._super.apply(this,arguments);
      me.getManager().add(me);
    },

		delegateEvents:function(events){
			var me = this
			var events = events || {}
			events['change input:'+this.inputType] = 'onBoxClick';
			me._super.call(me,events);
		},
		getElConfig: function() {
			var me = this;

      // Add the checked class if this begins checked
      if (me.isChecked(me.rawValue, me.inputValue)) {
          me.addClass(me.checkedCls);
      }
      
      /*if (!me.fieldLabel) {
          me.skipLabelForAttribute = true;
      }*/

      return me._super();
		},

    getFormId: function(){
      var me = this
      var form;

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
     * Returns the checked state of the checkbox.
     * @return {Boolean} True if checked, else false
     */
    getRawValue: function() {
      var inputEl = this.inputEl && this.inputEl.get(0);
      
      return inputEl ? inputEl.checked : this.checked;
    },
		getSubTplData : function() {
			return $.extend(Base.prototype.getSubTplData.apply(this, arguments), {
				boxLabel : this.boxLabel || false,
				checked:this.checked,
				boxLabelCls:this.boxLabelCls,
				value:this.inputValue
			})
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
		initValue : function() {
			var me = this, checked = !!me.checked;

			/**
			 * @property {Object} originalValue
			 * The original value of the field as configured in the {@link #checked} configuration, or as loaded by the last
			 * form load operation if the form's {@link Ext.form.Basic#trackResetOnLoad trackResetOnLoad} setting is `true`.
			 */
			me.originalValue = me.lastValue = checked;

			// Set the initial checked state
			me.setValue(checked);
		},

		isChecked : function(rawValue, inputValue) {
			return (rawValue === true || rawValue === 'true' || rawValue === '1' || rawValue === 1 || (((_.isString(rawValue) || _.isNumber(rawValue)) && inputValue) ? rawValue == inputValue : this.onRe.test(rawValue)));
		},

		/**
		 * @private Handle click on the checkbox button
		 */
		onBoxClick : function(e) {
			var me = this;
			if (!me.disabled && !me.readOnly) {
				me.setValue(!me.checked);
			}
		},

		/**
		 * @private
		 * Called when the checkbox's checked state changes. Invokes the {@link #handler} callback
		 * function if specified.
		 */
		onChange : function(newVal, oldVal) {
			var me = this, handler = me.handler;
			Base.prototype.onChange.apply(this, arguments);
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
			if (me.inputEl) {
				this.inputEl.prop('checked', checked);
				me[checked ? 'addClass' : 'removeClass'](me.checkedCls);
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
					this.inputEl.attr('checked',_.contains(checked, box.inputValue))
				}
			} else {
				me._super.apply(this, arguments);
			}

			return me;
		}
	})
}));
