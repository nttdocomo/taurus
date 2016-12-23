/**
 * @author nttdocomo
 */
(function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['./field/base','underscore','./checkboxGroup','./field/radio'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('./field/base'),require('underscore'),require('./checkboxGroup'),require('./field/radio'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('./field/base'),require('underscore'),require('./field/checkbox'),require('./field/radio'));
	}
}(this, function(Base,_,CheckboxGroup,Radio) {
	return CheckboxGroup.extend({
		blankText : 'You must select one item in this group',
		defaultType:Radio,
		//fieldSubTpl : '<div><%_.each(fields,function(field){%><%if(vertical){%><div><%}%><%if(field.boxLabel){%><label id="<%=field.cmpId%>-boxLabelEl" class="radio-inline"><%}%><input class="form-radio" id="<%=field.id%>" type="<%=field.type%>" name="<%=field.name%>"<%if(field.checked){%> checked="checked"<%}%> value="<%=field.inputValue%>"/><%if(field.boxLabel){%><%=field.boxLabel%></label><%}%><%if(vertical){%></div><%}%><%})%></div>',
		/*getBoxes : function(query) {
			return this.$el.find(':radio' + (query || ''));
		},*/
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
						type : 'radio',
						name : field.name || me.name
					}, field);
				}),
				vertical:this.vertical
			};
		},
		/*checkChange : function(e) {
			var value = this.getValue(), key = _.keys(value)[0];
			// If the value is an array we skip out here because it's during a change
			// between multiple items, so we never want to fire a change
			if (_.isArray(value[key])) {
				return;
			}
			Base.prototype.checkChange.apply(this, arguments);
		},*/
		getErrors : function() {
			return Base.prototype.getErrors.apply(this,arguments);
		},
		setValue : function(value) {
			Base.prototype.setValue.apply(this,arguments);
		},
		/*getValue : function() {
			var values = {}, box = this.getBoxes(':checked');
			return box.val();
		},*/
		/*getSubmitData:function(){
			var values = {}, boxes = this.getBoxes(':radio'), b, bLen = boxes.length, box, name, inputValue, bucket;
			_.each(boxes,function(box,i) {
				name = box.getName();
				value = box.getValue();
				inputValue = box.inputValue;
				if(value){
					values[name] = inputValue;
				}/*
				if (values.hasOwnProperty(name)) {
                    bucket = values[name];
                    if (!_.isArray(bucket)) {
                        bucket = values[name] = [bucket];
                    }
                    bucket.push(inputValue);
                } else {
                    values[name] = inputValue;
                }*/
			/*});
			return values;
		}*/
	});
}));
