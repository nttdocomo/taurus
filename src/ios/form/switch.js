(function (root, factory) {
	if(typeof define === "function") {
	  	if(define.amd){
		    // Now we're wrapping the factory and assigning the return
		    // value to the root (window) and returning it as well to
		    // the AMD loader.
		    define(["../view/listItem",'../../form/field/checkbox','../../classic/form/checkboxManager',"underscore"], function(Base,_){
		    	return (root.myModule = factory(Base));
		    });
		}
	  	if(define.cmd){
	  		define(function(require, exports, module){
				return factory(require('../view/listItem'),require('../../form/field/checkbox'),require('../../classic/form/checkboxManager'),require('underscore'));
			})
	  	}
	} else if(typeof module === "object" && module.exports) {
	    // I've not encountered a need for this yet, since I haven't
	    // run into a scenario where plain modules depend on CommonJS
	    // *and* I happen to be loading in a CJS browser environment
	    // but I'm including it for the sake of being thorough
	    module.exports = (root.myModule = factory(require("../view/listItem"),require('../../form/field/checkbox'),require('../../classic/form/checkboxManager'),require('underscore')));
	} else {
	    root.myModule = factory(root.postal);
	}
}(this, function(TableCell,CheckBox,CheckboxManager,_) {

			/*<div class="item-input">
            <label class="label-switch">
              <input type="checkbox">
              <div class="checkbox"></div>
            </label>
          </div>*/
	return TableCell.extend({
		childEls:{
			'itemInner':'.item-inner',
			'checkBox':':checkbox'
		},
		checked:false,
		initialize:function(){
			var me = this;
			TableCell.prototype.initialize.apply(me,arguments)
		},
		getTpl:function(){
			return '<div class="item-content"><%if(image){%><div class="item-media"><img class="img" src="<%=image%>"/></div><%}%><div class="item-inner"><div class="item-title"><%=fieldLabel%></div><%=itemInput%></div></div>'
		},
		getTplData:function(){
			return {
				fieldLabel:this.fieldLabel,
				image:null,
				itemInput:_.template('<div class="item-input"><label class="label-switch"><input type="checkbox" name="<%=name%>"><div class="checkbox"></div></label></div>')({
					name:this.name
				})
			}
		},
		onSwitch:function(){
			var me = this;
			if (!me.disabled && !me.readOnly) {
				me.setValue(!me.checked);
			}
		},
		delegateEvents:function(events){
			_.extend(events,{
				'change :checkbox':'onSwitch'
			})
			TableCell.prototype.delegateEvents.call(this,events)
		}
	}).mixins(CheckBox)
}));
