/**
 * @author nttdocomo
 */
(function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['./fieldContainer','./field/field','underscore','./field/checkbox','../../../taurus'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('./fieldContainer'),require('./field/field'),require('underscore'),require('./field/checkbox'), require('../../../taurus'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('./fieldContainer'),require('./field/field'),require('underscore'),require('./field/checkbox'), require('../../../taurus'));
	}
}(this, function(Base,Field,_,Checkbox, taurus) {
	return Base.extend({
		events : {
			'change input' : 'checkChange'
		},
		//isFormField:false,
		defaultType:Checkbox,
		blankText : "You must select at least one item in this group",
		//fieldSubTpl : '<%_.each(fields,function(field){%><%if(vertical){%><div><%}%><%if(field.boxLabel){%><label id="<%=field.cmpId%>-boxLabelEl" class="checkbox-inline"><%}%><input id="<%=field.id%>" type="<%=field.type%>" /><%if(field.boxLabel){%><%=field.boxLabel%></label><%}%><%if(vertical){%></div><%}%><%})%>',
		fieldSubTpl : '',
		vertical : false,
		groupCls : taurus.baseCSSPrefix + 'form-check-group',
		getSubTplData : function() {
			var me = this;
			return {
				fields : _.map(this.fields, function(field) {
					var cmpId = _.uniqueId('radiofield-');
					if (me.value == field.inputValue) {
						field.checked = true;
					}
					return $.extend({
						id : cmpId + '-inputEl',
						cmpId : cmpId,
						type : 'checkbox'
					}, field);
				}),
				vertical : this.vertical
			};
		},
		/**
		 * @private Returns all checkbox components within the container
		 * @param {String} [query] An additional query to add to the selector.
		 */
		getBoxes : function(query) {
			var me = this,boxes = this.items;/*$el.find(':radio' + (query || ''))*/;
			if(query){
				return _.filter(boxes,function(item,i){
					return item.inputEl.is(query)
				})
			}
			return boxes;
			//return this.$el.find(':checkbox' + (query || '')).data('component');
		},

		/**
		 * Returns an Array of all checkboxes in the container which are currently checked
		 * @return {Ext.form.field.Checkbox[]} Array of Ext.form.field.Checkbox components
		 */
		getChecked : function() {
			return $.makeArray(this.getBoxes(':checked'));
		},

		/**
		 * Runs CheckboxGroup's validations and returns an array of any errors. The only error by default is if allowBlank
		 * is set to true and no items are checked.
		 * @return {String[]} Array of all validation errors
		 */
		getErrors : function() {
			var errors = [];
			if (!this.allowBlank && _.isEmpty(this.getChecked())) {
				errors.push(this.blankText);
			}
			return errors;
		},
		/**
		 * Returns an object containing the values of all checked checkboxes within the group. Each key-value pair in the
		 * object corresponds to a checkbox {@link Ext.form.field.Checkbox#name name}. If there is only one checked checkbox
		 * with a particular name, the value of that pair will be the String {@link Ext.form.field.Checkbox#inputValue
		 * inputValue} of that checkbox. If there are multiple checked checkboxes with that name, the value of that pair
		 * will be an Array of the selected inputValues.
		 *
		 * The object format returned from this method can also be passed directly to the {@link #setValue} method.
		 *
		 * NOTE: In Ext 3, this method returned an array of Checkbox components; this was changed to make it more consistent
		 * with other field components and with the {@link #setValue} argument signature. If you need the old behavior in
		 * Ext 4+, use the {@link #getChecked} method instead.
		 */
		getValue : function() {
			var values = {}, boxes = this.getBoxes(':checked'), b, bLen = boxes.length, box, name, inputValue, bucket;
			_.each(boxes,function(box,i) {
				box = box.inputEl;
				name = box.attr('name');
				values[name] = box.val();
			});
			return values;
		},

	    /**
	     * When a checkbox is added to the group, monitor it for changes
	     * @param {Object} field The field being added
	     * @protected
	     */
	    onAdd: function(field) {
	        var me = this,
	            items,
	            len, i;

	        if (field.isCheckbox) {
	            field.on('change', me.checkChange, me);
	        } else if (field.isContainer) {
	            items = field.items.items;
	            for (i = 0, len = items.length; i < len; i++) {
	                me.onAdd(items[i]);
	            }
	        }
	        Base.prototype.onAdd.apply(this,arguments);
	    },
	    /**
	     * Resets the checked state of all {@link Ext.form.field.Checkbox checkboxes} in the group to their originally
	     * loaded values and clears any validation messages.
	     * See {@link Ext.form.Basic}.{@link Ext.form.Basic#trackResetOnLoad trackResetOnLoad}
	     */
	    reset: function() {
	        var me = this/*,
	            hadError = me.hasActiveError(),
	            preventMark = me.preventMark*/;
	        //me.preventMark = true;
	        /*me.batchChanges(function() {
	            var boxes = me.getBoxes(),
	                b,
	                bLen  = boxes.length;

	            for (b = 0; b < bLen; b++) {
	                boxes[b].reset();
	            }
	        });*/
	        //me.preventMark = preventMark;
	        var boxes = me.getBoxes(),
                b,
                bLen  = boxes.length;

            for (b = 0; b < bLen; b++) {
            	boxes[b].reset();
	        }

	        me.unsetActiveError();
	        /*if (hadError) {
	            me.updateLayout();
	        }*/
	    },

		/**
		 * Sets the value(s) of all checkboxes in the group. The expected format is an Object of name-value pairs
		 * corresponding to the names of the checkboxes in the group. Each pair can have either a single or multiple values:
		 *
		 *   - A single Boolean or String value will be passed to the `setValue` method of the checkbox with that name.
		 *     See the rules in {@link Ext.form.field.Checkbox#setValue} for accepted values.
		 *   - An Array of String values will be matched against the {@link Ext.form.field.Checkbox#inputValue inputValue}
		 *     of checkboxes in the group with that name; those checkboxes whose inputValue exists in the array will be
		 *     checked and others will be unchecked.
		 *
		 * If a checkbox's name is not in the mapping at all, it will be unchecked.
		 *
		 * An example:
		 *
		 *     var myCheckboxGroup = new Ext.form.CheckboxGroup({
		 *         columns: 3,
		 *         items: [{
		 *             name: 'cb1',
		 *             boxLabel: 'Single 1'
		 *         }, {
		 *             name: 'cb2',
		 *             boxLabel: 'Single 2'
		 *         }, {
		 *             name: 'cb3',
		 *             boxLabel: 'Single 3'
		 *         }, {
		 *             name: 'cbGroup',
		 *             boxLabel: 'Grouped 1'
		 *             inputValue: 'value1'
		 *         }, {
		 *             name: 'cbGroup',
		 *             boxLabel: 'Grouped 2'
		 *             inputValue: 'value2'
		 *         }, {
		 *             name: 'cbGroup',
		 *             boxLabel: 'Grouped 3'
		 *             inputValue: 'value3'
		 *         }]
		 *     });
		 *
		 *     myCheckboxGroup.setValue({
		 *         cb1: true,
		 *         cb3: false,
		 *         cbGroup: ['value1', 'value3']
		 *     });
		 *
		 * The above code will cause the checkbox named 'cb1' to be checked, as well as the first and third checkboxes named
		 * 'cbGroup'. The other three checkboxes will be unchecked.
		 *
		 * @param {Object} value The mapping of checkbox names to values.
		 * @return {Ext.form.CheckboxGroup} this
		 */
		setValue : function(value) {
			var me = this, boxes = me.getBoxes(), b, bLen = boxes.length, box, name, cbValue;


			for ( b = 0; b < bLen; b++) {
				box = boxes[b];
				box = $(box);
				name = box.attr('name');
				cbValue = false;

				if (value && value.hasOwnProperty(name)) {
					if (_.isArray(value[name])) {
						cbValue = taurus.Array.contains(value[name], this.fields[b].inputValue);
					} else {
						// single value, let the checkbox's own setValue handle conversion
						cbValue = value[name];
					}
				}

				//box.setValue(cbValue);
			}
			return me;
		},

		validate : function() {
			var me = this, errors, isValid, wasValid;

			if (me.disabled) {
				isValid = true;
			} else {
				errors = me.getErrors();
				isValid = _.isEmpty(errors);
				wasValid = !me.hasActiveError();
				if (isValid) {
					me.unsetActiveError();
				} else {
					me.setActiveErrors(errors);
				}
			}
			if (isValid !== wasValid) {
				me.trigger('validitychange', me, isValid);
			}

			return isValid;
		},
		getTargetEl:function(){
			return this.$el.find('> div:eq(0)');
		},
		/*getValue : function() {
			var values = {}, box = this.getBoxes(':checked');
			return box.val();
		},*/
		getSubmitData:function(){
			/*var values = {}, boxes = this.getBoxes(':checkbox'), b, bLen = boxes.length, box, name, inputValue, bucket;
			_.each(boxes,function(box,i) {
				name = box.getName();
				value = box.getValue();
				inputValue = box.inputValue;
				
				if (values.hasOwnProperty(name)) {
            bucket = values[name];
            if (!_.isArray(bucket)) {
                bucket = values[name] = [bucket];
            }
            bucket.push(inputValue);
        } else {
            values[name] = inputValue;
        }
			});*/
			return null;
		},
		render:function(){
    	this.$el.addClass(this.groupCls)
    	this._super.apply(this,arguments)
    },
	}).mixins(Field);
}));
