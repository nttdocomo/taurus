(function (root, factory) {
	if(typeof define === "function") {
	  	if(define.amd){
		    // Now we're wrapping the factory and assigning the return
		    // value to the root (window) and returning it as well to
		    // the AMD loader.
		    define(["./text",'../../../classic/form/checkboxManager',"underscore"], function(Base,_){
		    	return (root.myModule = factory(Base));
		    });
		}
	  	if(define.cmd){
	  		define(function(require, exports, module){
				return factory(require('./text'),require('../../../classic/form/checkboxManager'),require('underscore'));
			})
	  	}
	} else if(typeof module === "object" && module.exports) {
	    // I've not encountered a need for this yet, since I haven't
	    // run into a scenario where plain modules depend on CommonJS
	    // *and* I happen to be loading in a CJS browser environment
	    // but I'm including it for the sake of being thorough
	    module.exports = (root.myModule = factory(require("./text"),require('../../../classic/form/checkboxManager'),require('underscore')));
	} else {
	    root.myModule = factory(root.postal);
	}
}(this, function(TableCell,CheckboxManager,_) {

			/*<div class="item-input">
            <label class="label-switch">
              <input type="checkbox">
              <div class="checkbox"></div>
            </label>
          </div>*/
	return TableCell.extend({
		childEls:{
			'itemInner':'.item-inner',
			'inputEl':':checkbox'
		},
		checked:false,
		initialize:function(){
			var me = this;
			this._super.apply(me,arguments)
		},
		getTpl:function(){
			return '<label class="label-checkbox item-content"><input type="checkbox" name="<%=name%>" /><div class="item-media"><i class="icon icon-form-checkbox"></i></div><div class="item-inner"><div class="item-title"><%=fieldLabel%></div></div></label>'
		},
		getTplData:function(){
			return {
				fieldLabel:this.fieldLabel
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
				this._super.apply(this, arguments);
				this.inputEl.attr('checked',checked)
			}

			return me;
		}
	})/*.mixins(CheckBox)*/
}));
