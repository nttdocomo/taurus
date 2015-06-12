/**
 * @author nttdocomo
 */
define(function(require) {
	var Base = require('./checkbox'),
	RadioManager = require('../radioManager');
	return Base.extend({
		inputType : 'radio',
		formId: null,

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
				/*draw.viewbox(0, 0, 100,100);
				var path = draw.path('M49.346,46.341c-3.79-2.005,3.698-10.294,7.984-8.89 c8.713,2.852,4.352,20.922-4.901,20.269c-4.684-0.33-12.616-7.405-14.38-11.818c-2.375-5.938,7.208-11.688,11.624-13.837 c9.078-4.42,18.403-3.503,22.784,6.651c4.049,9.378,6.206,28.09-1.462,36.276c-7.091,7.567-24.673,2.277-32.357-1.079 c-11.474-5.01-24.54-19.124-21.738-32.758c3.958-19.263,28.856-28.248,46.044-23.244c20.693,6.025,22.012,36.268,16.246,52.826 c-5.267,15.118-17.03,26.26-33.603,21.938c-11.054-2.883-20.984-10.949-28.809-18.908C9.236,66.096,2.704,57.597,6.01,46.371 c3.059-10.385,12.719-20.155,20.892-26.604C40.809,8.788,58.615,1.851,75.058,12.031c9.289,5.749,16.787,16.361,18.284,27.262 c0.643,4.698,0.646,10.775-3.811,13.746'),
				length = path.node.getTotalLength();
				path.style({
					'stroke-dasharray': length + 'px, ' + length + 'px',
					'stroke-dashoffset': (Math.floor( length ) - 1) + 'px'
				})
				path.node.getBoundingClientRect();
				path.style({
					'-webkit-transition': 'stroke-dashoffset 0.8s ease-in 0s',
					'transition': 'stroke-dashoffset 0.8s ease-in 0s'
				})
				path.node.style.strokeDashoffset = '0';*/
			} else {
				draw.clear();
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
	        } else {
	            active = me.getManager().getWithValue(me.name, value, me.getFormId()).getAt(0);
	            if (active) {
	                active.setValue(true);
	            }
	        }
	        return me;
	    }
	})
})
