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
	var Picker = require("./picker");
	var BoundList = require("../../view/boundList");
	require("../../lang/event");
	return taurus.view("taurus.form.field.ComboBox", Picker.extend({
		isExpanded : false,
		queryMode: 'remote',
		delimiter:', ',
		queryParam:'query',
		triggerTpl: '<div class="input-group-btn"><button class="btn form-trigger btn-default" type="button"><span class="caret"></span></button></div>',
		initialize:function(){
			Picker.prototype.initialize.apply(this,arguments);
			//this.collection.on('reset',_.bind(this.expand,this));
		},
		initField:function(){
			this.displayTpl = this.getDisplayTpl();
			if(this.collection){
				if(!(this.collection instanceof Backbone.Collection)){
					this.collection = new this.collection;
				}
				if(this.value && !_.isObject(this.value) && !this.collection.length){
					this.collection.fetch({
						success:_.bind(Picker.prototype.initField,this)
					});
				} else {
					Picker.prototype.initField.apply(this,arguments);
				}
			}
		},
		delegateEvents : function(events) {
			var events = $.extend(events || {}, {
				'keyup input' : _.throttle(this.onKeyUp, 1000)
			});
			if (!this.editable) {
				events = $.extend(events, {
					'click input' : 'onTriggerClick'
				});
			}
			Picker.prototype.delegateEvents.call(this, events);
		},
		alignPicker:function(){
			this.picker.setWidth(this.triggerWrap.width());
			var me = this, picker = me.getPicker(),position,
			heightAbove = taurus.getPositionAbove(this.$el),
			heightBelow = taurus.getPositionBelow(this.$el),
			height = picker.getHeight();
			space = heightBelow;
			position = {
				"my" : "left top",
				"at" : "left bottom"
			};
			if(height >  space - 5 && heightBelow < heightAbove){
				space = heightAbove;
				position = {
					"my" : "left bottom",
					"at" : "left top"
				};
			}

			// Allow the picker to height itself naturally.
			/*if (picker.height) {
				delete picker.height;
				picker.updateLayout();
			}*/
			if (picker.$el.height() > space - 5) {
	            picker.setHeight(space - 5); // have some leeway so we aren't flush against
	        }
			// Then ensure that vertically, the dropdown will fit into the space either above or below the inputEl.
			me.doAlign(position);
			//Picker.prototype.alignPicker.apply(this,arguments);
		},
		doAutoSelect : function() {
			var me = this, picker = me.picker, lastSelected, itemNode, value = this.getValue();
			lastSelected = this.collection.find(function(model){
				return model.get(me.displayField) == value;
			});
			itemNode = picker.getNode(lastSelected || 0);
			if (itemNode) {
				picker.highlightItem(itemNode);
				itemNode.scrollIntoView(false);
			}
			if (picker && me.autoSelect && me.collection.length > 0) {
				// Highlight the last selected item and scroll it into view
				lastSelected = picker.getSelectionModel().lastSelected;
				itemNode = picker.getNode(lastSelected || 0);
				if (itemNode) {
					picker.highlightItem(itemNode);
					itemNode.scrollIntoView(false);
				}
			}
		},
		doQuery:function(queryString, forceAll, rawQuery){
			var isLocalMode = this.queryMode === 'local',collection = this.collection;
			if (isLocalMode) {
				this.expand();
			} else {
				if(!collection.length){
					collection.fetch({
						data:this.getParams(),
						success:_.bind(this.expand,this)
					});
				} else {
					this.expand();
				}
			}
			if (isLocalMode) {
                this.doAutoSelect();
            }
		},
		getParams:function(queryString){
			var params = {},
	            param = this.queryParam;

	        if (queryString) {
	            params[param] = queryString;
	        }
	        return params;
		},
		getValue:function(){
			return this.value;
		},
		onKeyUp:function(e){
			var key = e.getKey();
			if(!e.isSpecialKey() && key !== 229){
				this.doQuery(this.getRawValue(), false, true);
			}
		},
		createPicker:function(){
			var picker = this.picker = new BoundList($.extend({
				displayField:this.displayField,
				collection:this.collection
			},this.listConfig)),me=this;
			picker.on('itemclick', this.onItemClick, this);
			return picker;
		},
		getDisplayTpl:function(){
			if (this.displayTpl) {
				return this.displayTpl;
			}
			return '<%_.each(value,function(item,index){%><%=item.'+this.displayField+'%><%if(index < value.length - 1){%>'+this.delimiter+'<%}%><%})%>';
		},
		getDisplayValue: function() {
	        return _.template(this.getDisplayTpl(),{value:this.displayTplData});
	    },
	    valueToRaw:function(value){
	    	return Picker.prototype.valueToRaw.apply(this,[this.getDisplayValue()]);
	    },
		setValue:function(value){
			if(_.isUndefined(value)){
				return Picker.prototype.setValue.apply(this,[value]);
			}
			var me = this,
				displayField = this.displayField,
				valueField = this.valueField || displayField,
				processedValue = [],
				displayTplData = [],
				model,record,displayValue;
			value = $.makeArray(value);
			for (i = 0, len = value.length; i < len; i++) {
				val = value[i];
				if((_.isString(val) || _.isNumber(val) || _.isObject(val)) && this.collection.length){
					if(_.isString(val) || _.isNumber(val)){
						record =  this.collection.find(function(model){
							return model.get(valueField) == val;
						});
					}
					if(_.isObject(val)){
						record =  this.collection.find(function(model){
							var value;
							if(val instanceof Backbone.Model){
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
				if(record){
					if(record instanceof Backbone.Model){
						record = record.toJSON();
					}
					displayTplData.push(record);
					processedValue.push(record[valueField]);
				}else {
					
				}
			}
			this.displayTplData = displayTplData;
			this.value = this.multiSelect ? processedValue : processedValue[0];
			return Picker.prototype.setValue.apply(this,[this.value]);
		},
		clearValue: function() {
	        this.setValue([]);
	    },
	    getSubTplData: function(){
	        var me = this;
	        var data = Picker.prototype.getSubTplData.apply(this,arguments);
	        data.value = this.getDisplayValue();
	        return data;
	    },
		onItemClick:function(e,record){
			var valueField = this.valueField;
			if(this.value){
				this.value = $.makeArray(this.value);
			} else {
				this.value = [];
			}
			var index = _.indexOf(this.value, record.get(this.valueField)); 
			if(index != -1 && this.multiSelect){
				this.value.splice(index,1);
			} else {
				this.value.push(record.get(this.valueField));
			}
			var selection = this.collection.filter(function(item){
				return _.contains(this.value,item.get(this.valueField));
			},this);
			if (!this.multiSelect && selection.length) {
				if(_.find(selection,function(item){
					return record.get(valueField) === item.get(valueField);
				})){
					this.setValue(record);
					this.trigger('select', record);
					this.collapse();
				}
			} else {
				this.setValue(selection);
			}
			//Picker.prototype.onItemClick.apply(this,arguments);
		},
		onTriggerClick: function() {
	        var me = this;
            if (me.isExpanded) {
                me.collapse();
            } else {
                me.doQuery(me.getRawValue(), false, true);
            }
            me.inputEl.focus();
	    },
	    load:function(options){
	    	var success = options.success,me=this;
	    	options.success = function(){
	    		me.triggerEl.removeAttr('disabled');
	    		success && success.apply(this,arguments);
	    	};
	    	this.collection.fetch(options);
	    	this.triggerEl.attr('disabled','disabled');
	    }
	}));
});
