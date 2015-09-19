/**
 * @author nttdocomo
 */
define(function(require) {
	var Base = require('./base'),
	_ = require('underscore'),
	CheckboxManager = require('../checkboxManager'),
	Svg = require('../../svg');
	return Base.extend({
		fieldSubTpl : '<div class="<%=type%>"><%if(boxLabel){%><label id="<%=cmpId%>-boxLabelEl" for="<%=id%>"><%}%><input id="<%=id%>" type="<%=type%>"<%if(checked){%> checked="<%=checked%>"<%}%> name="<%=name%>" value="<%=value%>"/><%if(boxLabel){%><%=boxLabel%></label><%}%></div>',
		inputType : 'checkbox',
		checked : false,
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
	        var me = this,
	            value = me.value;
	            
	        if (value !== undefined) {
	            me.checked = me.isChecked(value, me.inputValue);
	        }
	        
	        Base.prototype.initComponent.apply(this,arguments);
	        me.getManager().add(me);
	    },
		
		afterRender:function(){
			Base.prototype.afterRender.apply(this,arguments);
			this.initShadowInputEl();
		},
		initShadowInputEl:function(){
			var checked = this.checked;
			this.checkbox = SVG(this.boxLabelEl.parent().get(0)).size(0, 0);
			this.shadowInputEl = SVG(this.boxLabelEl.parent().get(0)).size(0, 0);
			this.checkbox.viewbox(0, 0, 15, 15)
			this.shadowInputEl.viewbox(0, 0, 15, 15)
			this.checkbox.path('M13.33,1.67v11.67H1.67V1.67H13.33 M13.33,0H1.67C0.75,0,0,0.75,0,1.67v11.67c0,0.92,0.75,1.67,1.67,1.67h11.67c0.92,0,1.67-0.75,1.67-1.67V1.67C15,0.75,14.25,0,13.33,0z')
			this.shadowInputEl.path('M5.83,11.67l-4.167-4.167l1.167-1.167 l3,3l6.33-6.33L13.33,4.167L5.83,11.667z')
			this.shadowInputEl.style({
				opacity:checked ? 1:0
			})
		},
		applyChildEls : function(childEls) {
			var childEls = $.extend(this.childEls, childEls);
			childEls['boxLabelEl'] = '#' + this.cid + '-boxLabelEl';
			Base.prototype.applyChildEls.call(this,childEls);
		},

		delegateEvents:function(events){
			var events = events || {};
			events['change input:'+this.inputType] = 'onBoxClick';
			Base.prototype.delegateEvents.call(this,events);
		},

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
		getSubTplData : function() {
			return $.extend(Base.prototype.getSubTplData.apply(this, arguments), {
				boxLabel : this.boxLabel || false,
				checked:this.checked
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
			var me = this,draw = this.draw;
			if (!me.disabled && !me.readOnly) {
				this.setValue(!this.checked);
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
				Base.prototype.setValue.apply(this, arguments);
				this.inputEl.attr('checked',checked)
			}

			return me;
		}
	})
})
