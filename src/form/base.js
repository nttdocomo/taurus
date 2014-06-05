/**
 * @author nttdocomo
 */
define(function(require) {
	var Base = require('../view/base');
	return taurus.view("taurus.form.Base", Base.extend({
		tagName : 'form',
		getValues : function() {
			var values  = {},isArray = _.isArray;
			_.each(this.owner.items, function(item) {
				//obj[item.getName()] = item.getSubmitData();
				var data = item.getSubmitData();
				if (_.isObject(data)) {
                    for (name in data) {
                        if (data.hasOwnProperty(name)) {
                            val = data[name];

                            if (values.hasOwnProperty(name)) {
                                bucket = values[name];

                                if (!isArray(bucket)) {
                                    bucket = values[name] = [bucket];
                                }

                                if (isArray(val)) {
                                    values[name] = values[name] = bucket.concat(val);
                                } else {
                                    bucket.push(val);
                                }
                            } else {
                                values[name] = val;
                            }
                        }
                    }
                }
			});
			return values;
		},
		getFields:function(){
			return this.owner.items;
		},/*
		getItemContainer:function(){
			return this.$el.find('.modal-body');
		},*/
		/**
	     * Returns true if client-side validation on the form is successful. Any invalid fields will be
	     * marked as invalid. If you only want to determine overall form validity without marking anything,
	     * use {@link #hasInvalidField} instead.
	     * @return Boolean
	     */
	    isValid: function() {
	        var me = this,
	            invalid;
	        invalid = _.filter(me.getFields(),function(field) {
	            return !field.validate();
	        });
	        return invalid.length < 1;
	    },
		submit : function(options) {
			if (this.model) {
				this.model.save(null, {
					url : this.api,
					traditional:true,
					data : this.getValues()
				});
			} else {
				options = $.extend(options, {
					type : 'POST',
					url : this.api,
					traditional:true,
					data : this.getValues()
				});
				$.ajax(options);
			}
			return false;
		},
	}));
});
