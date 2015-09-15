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
(function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(["./comboBox","./picker","../../picker/time",'../../underscore','../../moment','../../backbone'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
		        return factory(require('./comboBox'),require("./picker"),require("../../picker/time"),require('../../underscore'),require('../../moment'),require('../../backbone'));
		     })
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require("./comboBox"),require("./picker"),require("../../picker/time"),require('../../underscore'),require('../../moment'),require('../../backbone'));
	} else {
		root.myModule = factory();
	}
}(this, function(Base,Picker,Time,_,moment,Backbone) {
	return Base.extend({
		format:'H:mm',
		submitFormat:'HHmm',
		initDateParts: [2008, 0, 1],
		increment: 15,
		queryMode: 'local',
		displayField: 'disp',
		valueField: 'date',
		createPicker : function() {
			var picker = this.picker = new Time($.extend({
				collection : this.collection,
				minValue:this.minValue,
				maxValue:this.maxValue
			}, this.listConfig)), me = this;
			picker.on({
				'itemclick': this.onItemClick,
				'refresh': this.onListRefresh
			}, this);
			this.doAutoSelect();
			return picker;
		},

		formatDate: function(items) {
		    var formatted = [],
		        i, len;

		    items = $.makeArray(items);

		    for (i = 0, len = items.length; i < len; i++) {
		        formatted.push(items[i].format(this.format));
		    }

		    return formatted.join(this.delimiter);
		},
	    getInitDate: function (hours, minutes, seconds) {
	        var parts = this.initDateParts;

	        return moment({
	        	y:parts[0],
	        	M:parts[1],
	        	d:parts[2],
	        	h:hours || 0,
	        	m: minutes || 0,
	        	s:seconds || 0,
	        	ms:0
	        });    
	    },
		initComponent: function() {
	        var me = this,
	            min = me.minValue,
	            max = me.maxValue;
	        
	        if (min) {
	            me.setMinValue(min);
	        }
	        if (max) {
	            me.setMaxValue(max);
	        }

	        // Create a store of times.
	        me.collection = Time.createStore(me.format, me.increment,me.minValue,me.maxValue);

	        Base.prototype.initComponent.apply(this,arguments);

	        // Ensure time constraints are applied to the store.
	        // TimePicker does this on create.
	        me.getPicker();
	    },

		/**
		 * @private
		 * Parses an input value into a valid Date object.
		 * @param {String/Date} value
		 */
		parseDate: function(value) {
		    return moment(value,this.format)
		},

	    /**
	     * @private
	     * Updates either the min or max value. Converts the user's value into a Date object whose
	     * year/month/day is set to the {@link #initDate} so that only the time fields are significant.
	     */
	    setLimit: function(value, isMin) {
	        var me = this,
	            d, val;
	        if (_.isString(value)) {
	            d = me.parseDate(value);
	        }
	        else if (_.isDate(value)) {
	            d = moment(value);
	        }
	        console.log(d)
	        if (d) {
	            val = me.getInitDate();
	            val.hour(d.hour());
	            val.minute(d.minute());
	            val.second(d.second());
	            val.millisecond(d.millisecond());
	        }
	        // Invalid min/maxValue config should result in a null so that defaulting takes over
	        else {
	            val = null;
	        }
	        me[isMin ? 'minValue' : 'maxValue'] = val;
	    },

	    /**
	     * Replaces any existing {@link #minValue} with the new time and refreshes the picker's range.
	     * @param {Date/String} value The minimum time that can be selected
	     */
	    setMinValue: function(value) {
	        var me = this,
	            picker = me.picker;
	        me.setLimit(value, true);
	        if (picker) {
	            picker.setMinValue(me.minValue);
	        }
	    },

	    /**
	     * Replaces any existing {@link #maxValue} with the new time and refreshes the picker's range.
	     * @param {Date/String} value The maximum time that can be selected
	     */
	    setMaxValue: function(value) {
	        var me = this,
	            picker = me.picker;
	        me.setLimit(value, false);
	        if (picker) {
	            picker.setMaxValue(me.maxValue);
	        }
	    },

		valueToRaw: function(value) {
		    return this.formatDate(this.parseDate(value));
		},
		getValue:function(){
			return this.value
		},

	    /**
	     * @private
	     */
	    getSubmitValue: function() {
	        var me = this,
	            format = me.submitFormat || me.format,
	            value = moment(me.getValue(),me.format);

	        return value ? value.format(format) : null;
	    },

		rawToValue: function (item) {
		    var me = this,
		        items, values, i, len;

		    if (me.multiSelect) {
		        values = [];
		        items = Ext.Array.from(item);

		        for (i = 0, len = items.length; i < len; i++) {
		            values.push(me.parseDate(items[i]));
		        }

		        return values;
		    }

		    return me.parseDate(item);
		},

	    setValue: function (v) {
	        var me = this;

	        // The timefield can get in a loop when creating its picker. For instance, when creating the picker, the
	        // timepicker will add a filter (see TimePicker#updateList) which will then trigger the checkValueOnChange
	        // listener which in turn calls into here, rinse and repeat.
	        // if (me.creatingPicker) {
	        //     return;
	        // }

	        // Store MUST be created for parent setValue to function.
	        me.getPicker();

	        if (_.isString(v)) {
	            v = me.parseDate(v);
	        }

	        if (_.isDate(v)) {
	        	v = moment(v);
	        }

	        if(v instanceof Backbone.Model){
	        	v = v.get('date')
	        }
	        v = me.getInitDate(v.hour(), v.minute(), v.second());
	        v = v.format(this.format);

	        return Picker.prototype.setValue.apply(this,arguments);
	    }
	});
}));
