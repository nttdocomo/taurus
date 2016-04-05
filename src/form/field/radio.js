/**
 * @author nttdocomo
 */
 (function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['./checkbox','../radioManager','underscore','svg'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('./checkbox'),require('../radioManager'),require('underscore'),require('svg'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('./checkbox'),require('../radioManager'),require('underscore'),require('svg'));
	}
}(this, function(Base,RadioManager,_,Svg) {
	return Base.extend({
		inputType : 'radio',
		formId: null,
		childEls: {
			'inputEl' : ':radio'
		},
		initShadowInputEl:function(){
			var checked = this.checked;
			this.checkbox = SVG(this.boxLabelEl.parent().get(0)).size(0, 0);
			this.shadowInputEl = SVG(this.boxLabelEl.parent().get(0)).size(0, 0);
			this.checkbox.viewbox(0, 0, 15, 15)
			this.shadowInputEl.viewbox(0, 0, 15, 15)
			this.checkbox.path('M7.5 0C3.36 0 0 3.36 0 7.5s3.36 7.5 7.5 7.5 7.5-3.36 7.5-7.5S11.64 0 7.5 0zm0 13.5c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6z')
			this.shadowInputEl.path('M7.5 3.75c-2.07 0-3.75 1.68-3.75 3.75s1.68 3.75 3.75 3.75 3.75-1.68 3.75-3.75-1.68-3.75-3.75-3.75z')
			this.shadowInputEl.style({
				opacity:checked ? 1:0
			})
		},

	    /**
	     * If this radio is part of a group, it will return the selected value
	     * @return {String}
	     */
	    getGroupValue: function() {
	        var selected = this.getManager().getChecked(this.name, this.getFormId());
	        return selected ? selected.inputValue : null;
	    },

	    // inherit docs
	    getManager: function() {
	        return RadioManager;
	    },

	    /**
	     * @private Handle click on the radio button
	     */
	    onBoxClick: function() {
	        var me = this;
	        if (!me.disabled && !me.readOnly) {
	            this.setValue(true);
	        }
	    },

	    // inherit docs
	    onChange: function(newVal, oldVal) {
	        var me = this,draw = this.draw,
	            r, rLen, radio, radios;

	        Base.prototype.onChange.apply(this,arguments);

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

	    /**
	     * Sets either the checked/unchecked status of this Radio, or, if a string value is passed, checks a sibling Radio
	     * of the same name whose value is the value specified.
	     * @param {String/Boolean} value Checked value, or the value of the sibling radio button to check.
	     * @return {Ext.form.field.Radio} this
	     */
	    setValue: function(value) {
	        var me = this,
	            active;

	        if (_.isBoolean(value)) {
	            Base.prototype.setValue.call(this,value);
	            if(this.inputEl){
	            	this.inputEl.attr('checked',value);
	            }
	        } else {
	            active = me.getManager().getWithValue(me.name, value, me.getFormId()).getAt(0);
	            if (active) {
	                active.setValue(true);
	            }
	        }
	        return me;
	    }
	})
}));