(function (root, factory) {
	if(typeof define === "function") {
	  	if(define.amd){
		    // Now we're wrapping the factory and assigning the return
		    // value to the root (window) and returning it as well to
		    // the AMD loader.
		    define(["./text","backbone","underscore"], function(Base,_){
		    	return (root.myModule = factory(Base));
		    });
		}
	  	if(define.cmd){
	  		define(function(require, exports, module){
				return factory(require('./text'),require('backbone'),require('underscore'),require);
			})
	  	}
	} else if(typeof module === "object" && module.exports) {
	    // I've not encountered a need for this yet, since I haven't
	    // run into a scenario where plain modules depend on CommonJS
	    // *and* I happen to be loading in a CJS browser environment
	    // but I'm including it for the sake of being thorough
	    module.exports = (root.myModule = factory(require("./text"),require('backbone'),require('underscore')));
	} else {
	    root.myModule = factory(root.postal);
	}
}(this, function(TableCell,Backbone,_,require) {
	return TableCell.extend({
		multiSelect:false,
		childEls:{
			'itemInner':'.item-inner',
			'itemAfter':'.item-after'
		},
		delimiter:',',
		getTpl:function(){
			return '<div class="item-link smart-select"><div class="item-content"><div class="item-inner"><div class="item-title"><%=fieldLabel%></div><div class="item-after"><%=value%></div></div></div></div>'
		},
		getTplData:function(){
			var me =this;
			return _.extend(me._super.apply(me,arguments),{
				fieldLabel:me.fieldLabel,
				type:me.inputType,
				name:me.name,
				value:me.value
			})
		},
		delegateEvents:function(events){
			var me = this,events = events || {};
			events['click'] = function(){
				me.getPicker(function(picker){
					me.picker = picker;
					me.navBar.pushItem({
						title:picker.title/*,
						backBarButtonItem:{
							title:'取消'
						}*/
					})
					me.pages.pushItem(picker)
					me.trigger('click');
				});
			}/*'onClick'*/;
			TableCell.prototype.delegateEvents.call(this,events);
		},
		getPicker:function(callback){
			var me = this;
			if(me.picker){
				callback(me.picker);
			} else {
				require.async(['../../picker/smartSelect','../../form/field/'+(me.multiSelect ? 'checkbox':'radio')],function(SmartSelect,InputType){
					var smartSelect = new SmartSelect({
						title:me.text,
						multiSelect:me.multiSelect,
						collection:me.collection,
						items:me.collection.map(function(model){
							return _.extend(model.toJSON(),{
								name:me.name,
								'class':InputType
							})
						})
					})
					smartSelect.on({
						'itemclick': me.onItemClick
					}, me);
					callback(smartSelect)
				})
			}
		},
		onItemClick:function(event, record){
			var me = this, valueField = me.valueField, value = me.value, lastSelected, picker = me.getPicker(function(picker){
				if (value) {
					value = $.makeArray(value);
				} else {
					value = [];
				}
				var index = _.indexOf(value, record.get(me.valueField));
				if (!me.multiSelect){
					lastSelected = me.collection.find(function(item) {
						return value[0] == item.get(me.valueField);
					}, me);
					//picker.onItemDeselect(lastSelected);
				}
				if (index != -1 && me.multiSelect) {
					value.splice(index, 1);
					//picker.onItemDeselect(record);
				} else {
					value.push(record.get(me.valueField));
					//picker.onItemSelect(record);
				}
				var selection = me.collection.filter(function(item) {
					return _.contains(value, item.get(me.valueField));
				}, me);
				if (!me.multiSelect && selection.length) {
					if (_.find(selection, function(item) {
						return record.get(valueField) === item.get(valueField);
					})) {
						me.setValue(record);
						me.trigger('select', record);
						//me.collapse();
					};
				} else {
					me.setValue(selection);
				}
	        	console.log(me.getValue())
			});
			return false;
		},
		setValue : function(value) {
			var me = this;
			if (value != null) {
	            return me.doSetValue(value);
	        }
	        // Clearing is a special, simpler case.
	        else {
	            return me.doSetValue(null);
	        }
		},
		doSetValue:function(value){
			var me = this, displayField = me.displayField, valueField = me.valueField || displayField, processedValue = [], displayTplData = [], model, record, displayValue,
			displayIsValue = me.displayField === me.valueField,
			displayTplData = me.displayTplData || (me.displayTplData = []);
			displayTplData.length = 0;
			if (_.isUndefined(value)) {
				return Picker.prototype.setValue.apply(me, value);
			}
			if (_.isString(value) && value == '') {
				return Picker.prototype.setValue.apply(me, [value]);
			}
			value = $.makeArray(value);
			for ( i = 0, len = value.length; i < len; i++) {
				val = value[i];
				if ((_.isString(val) || _.isNumber(val) || _.isObject(val)) && me.collection.length) {
					if (_.isString(val) || _.isNumber(val)) {
						record = me.collection.find(function(model) {
							return model.get(valueField) == val;
						});
					}
					if (_.isObject(val)) {
						record = me.collection.find(function(model) {
							var value;
							if ( val instanceof Backbone.Model) {
								value = val.get(valueField);
							} else {
								value = val[valueField];
							}
							return model.get(valueField) == value;
						});
					}
				} else {
					record = val;
				}
				if (record) {
					if ( record instanceof Backbone.Model) {
						record = record.toJSON();
					}
					displayTplData.push(record);
					processedValue.push(record[valueField]);
					me.updateValue();
				} else {

				}
			}
			me.displayTplData = displayTplData;
			me.value = processedValue.length ? me.multiSelect ? processedValue : processedValue[0] || '' : value ? value : '';
			me.applyEmptyText();
			return TableCell.prototype.setValue.apply(me, [me.value]);
		},
		updateValue:function(){
			var me = this,
            inputEl = me.inputEl;
			if (inputEl && me.emptyText && !_.isEmpty(me.value)) {
	            inputEl.removeClass(me.emptyCls);
	        }
		},
		getDisplayTpl : function() {
			if (this.displayTpl) {
				return this.displayTpl;
			}
			return '<%_.each(value,function(item,index){%><%=item.' + this.displayField + '%><%if(index < value.length - 1){%>' + this.delimiter + '<%}%><%})%>';
		},
		getDisplayValue : function() {
			return _.template(this.getDisplayTpl())({
				value : this.displayTplData
			});
		},
		getValue : function() {
			return this.value;
		},
		setRawValue : function(value) {
			this.rawValue = value;
			this.itemAfter && this.itemAfter.text(value);
		},
		valueToRaw : function(value) {
			return TableCell.prototype.valueToRaw.apply(this, [this.getDisplayValue()]);
		},
		applyEmptyText:function(){}
	})/*.mixins(CheckBox)*/
}));
