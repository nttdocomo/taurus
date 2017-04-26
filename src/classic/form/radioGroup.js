/**
 * @author nttdocomo
 */
(function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['./field/base','underscore','./checkboxGroup','./field/radio','../../../taurus'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('./field/base'),require('underscore'),require('./checkboxGroup'),require('./field/radio'), require('../../../taurus'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('./field/base'),require('underscore'),require('./field/checkbox'),require('./field/radio'), require('../../../taurus'));
	}
}(this, function(Base,_,CheckboxGroup,Radio, taurus) {
	return CheckboxGroup.extend({
		blankText : 'You must select one item in this group',
		defaultType:Radio,
		simpleValue: false,
		groupCls : taurus.baseCSSPrefix + 'form-radio-group',
		isFormField:false,
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
		getValue : function() {
			var me = this
      var items = me.items
      var ret
      if (me.simpleValue) {
	      for (i = items.length; i-- > 0; ) {
	        item = items[i];

	        if (item.checked) {
	          ret = item.inputValue;
	          break;
	        }
	      }
      } else {
         ret = me._super();
      }
      
      return ret;
		},
		setValue: function(value) {
			var me = this
			var items = me.items
			var cmp
			if (me.simpleValue) {
        for (i = 0, len = items.length; i < len; ++i) {
          cmp = items[i];

          if (cmp.inputValue === value) {
            cmp.setValue(true);
            break;
          }	
        }
      }
		}
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
