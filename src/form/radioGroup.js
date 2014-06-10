/**
 * @author nttdocomo
 */
define(function(require) {
	var CheckboxGroup = require('./checkboxGroup');
	var Base = require('./field/base');
	return taurus.view('taurus.form.RadioGroup', CheckboxGroup.extend({
		blankText : 'You must select one item in this group',
		fieldSubTpl : '<div><%_.each(fields,function(field){%><%if(vertical){%><div><%}%><%if(field.boxLabel){%><label id="<%=field.cmpId%>-boxLabelEl" class="radio-inline"><%}%><input class="form-radio" id="<%=field.id%>" type="<%=field.type%>" name="<%=field.name%>"<%if(field.checked){%> checked="checked"<%}%> value="<%=field.inputValue%>"/><%if(field.boxLabel){%><%=field.boxLabel%></label><%}%><%if(vertical){%></div><%}%><%})%></div>',
		getBoxes : function(query) {
			return this.$el.find(':radio' + (query || ''));
		},
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
		getValue : function() {
			var values = {}, box = this.getBoxes(':checked');
			return box.val();
		},
		getSubmitData:function(){
			var values = {}, boxes = this.getBoxes(':checked'), b, bLen = boxes.length, box, name, inputValue, bucket;
			boxes.each(function(i) {
				box = $(this);
				name = box.attr('name');
				inputValue = box.val();
				if (values.hasOwnProperty(name)) {
                    bucket = values[name];
                    if (!_.isArray(bucket)) {
                        bucket = values[name] = [bucket];
                    }
                    bucket.push(inputValue);
                } else {
                    values[name] = inputValue;
                }
			});
			return values;
		}
	}));
});
