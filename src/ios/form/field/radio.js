(function (root, factory) {
	if(typeof define === "function") {
	  	if(define.amd){
		    // Now we're wrapping the factory and assigning the return
		    // value to the root (window) and returning it as well to
		    // the AMD loader.
		    define(["./checkbox",'../../../classic/form/radioManager',"underscore"], function(Base,_){
		    	return (root.myModule = factory(Base));
		    });
		}
	  	if(define.cmd){
	  		define(function(require, exports, module){
				return factory(require('./checkbox'),require('../../../classic/form/radioManager'),require('underscore'));
			})
	  	}
	} else if(typeof module === "object" && module.exports) {
	    // I've not encountered a need for this yet, since I haven't
	    // run into a scenario where plain modules depend on CommonJS
	    // *and* I happen to be loading in a CJS browser environment
	    // but I'm including it for the sake of being thorough
	    module.exports = (root.myModule = factory(require("./checkbox"),require('../../../classic/form/radioManager'),require('underscore')));
	} else {
	    root.myModule = factory(root.postal);
	}
}(this, function(TableCell,RadioManager,_) {
	return TableCell.extend({
		childEls:{
			'itemInner':'.item-inner',
			'inputEl':':radio'
		},
		inputType : 'radio',
		checked:false,
		getTpl:function(){
			return '<label class="label-<%=type%> item-content"><input type="<%=type%>" name="<%=name%>" value="<%=value%>"/><div class="item-inner"><div class="item-title"><%=fieldLabel%></div></div></label>'
		},
		onSwitch:function(){
			var me = this;
	        if (!me.disabled && !me.readOnly) {
	            me.setValue(true);
	        }
		},

	    // inherit docs
	    onChange: function(newVal, oldVal) {
	        var me = this,draw = me.draw,
	            r, rLen, radio, radios;

	        me._super.apply(me,arguments);

	        if (newVal) {
	            radios = me.getManager().getByName(me.name, me.getFormId());
	            rLen   = radios.length;

	            _.each(radios,function(radio){
	            	if (radio !== me) {
	                    radio.setValue(false);
	                }
	            })
			}
	    },

	    // inherit docs
	    getManager: function() {
	        return RadioManager;
	    },

		/**
		 * Sets the checked state of the checkbox, and invokes change detection.
		 * @param {Boolean/String} checked The following values will check the checkbox: `true, 'true', '1', or 'on'`, as
		 * well as a String that matches the {@link #inputValue}. Any other value will uncheck the checkbox.
		 * @return {Ext.form.field.Checkbox} this
		 */
		setValue : function(value) {
			var me = this,
	            active;

	        if (_.isBoolean(value)) {
	            me._super(value);
	            if(me.inputEl){
	            	me.inputEl.attr('checked',value);
	            }
	        } else {
	            active = me.getManager().getWithValue(me.name, value, me.getFormId()).getAt(0);
	            if (active) {
	                active.setValue(true);
	            }
	        }
	        return me;
		}
	})/*.mixins(CheckBox)*/
}));
