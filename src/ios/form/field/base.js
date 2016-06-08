(function (root, factory) {
	if(typeof define === "function") {
	  	if(define.amd){
		    // Now we're wrapping the factory and assigning the return
		    // value to the root (window) and returning it as well to
		    // the AMD loader.
		    define(["../../../view/base","../../../classic/form/field/field","underscore"], function(Base,_){
		    	return (root.myModule = factory(Base));
		    });
		}
	  	if(define.cmd){
	  		define(function(require, exports, module){
				return factory(require('../../../view/base'),require('../../../classic/form/field/field'),require('underscore'));
			})
	  	}
	} else if(typeof module === "object" && module.exports) {
	    // I've not encountered a need for this yet, since I haven't
	    // run into a scenario where plain modules depend on CommonJS
	    // *and* I happen to be loading in a CJS browser environment
	    // but I'm including it for the sake of being thorough
	    module.exports = (root.myModule = factory(require("../../../view/base"),require('../../../classic/form/field/field'),require('underscore')));
	} else {
	    root.myModule = factory(root.postal);
	}
}(this, function(Base,Field,_) {
	return Base.extend({
		tagName:'li',
		childEls:{
			'itemInner':'.item-inner',
		},
		getTpl:function(){
			return '<div class="item-content"><%if(image){%><div class="item-media"><img class="img" src="<%=image%>"/></div><%}%><div class="item-inner"><div class="item-title"><%=fieldLabel%></div><%=itemInput%></div></div>'
		},
		getTplData:function(){
			var me = this;
			return {
				fieldLabel:me.fieldLabel,
				image:null
			}
		},
		getRawValue : function() {
			var v = (this.inputEl ? this.inputEl.val() : taurus.valueFrom(this.rawValue, ''));
			this.rawValue = v;
			return v;
		},
		getValue : function() {
			var me = this, val = me.rawToValue(me.processRawValue(me.getRawValue()));
			me.value = val;
			return val;
		},
		onChange : function(newVal, oldVal) {
			/*if (this.validateOnChange) {
				this.validate();
			}*/
			//this.checkDirty();
		},
		processRawValue : function(value) {
			return value;
		},
		rawToValue : function(rawValue) {
			return rawValue;
		},
		setRawValue : function(value) {
			this.rawValue = value;
			this.inputEl && this.inputEl.val(value);
		},
        /**
         * Sets a data value into the field and runs the change detection and validation. To set the value directly
         * without these inspections see {@link #setRawValue}.
         * @param {Object} value The value to set
         * @return {Ext.form.field.Field} this
         */
        setValue:function(value){
            var me = this;
            me.setRawValue(me.valueToRaw(value));
            return Field.prototype.setValue.call(me, value);
        },

        /**
         * Converts a mixed-type value to a raw representation suitable for displaying in the field. This allows controlling
         * how value objects passed to {@link #setValue} are shown to the user, including localization. For instance, for a
         * {@link Ext.form.field.Date}, this would control how a Date object passed to {@link #setValue} would be converted
         * to a String for display in the field.
         *
         * See {@link #rawToValue} for the opposite conversion.
         *
         * The base implementation simply does a standard toString conversion, and converts {@link Ext#isEmpty empty values}
         * to an empty string.
         *
         * @param {Object} value The mixed-type value to convert to the raw representation.
         * @return {Object} The converted raw value.
         */
        valueToRaw: function(value) {
            return '' + taurus.valueFrom(value, '');
        }
	}).mixins(Field)
}));
