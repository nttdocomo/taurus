/**
 * @author nttdocomo
 */
define(function(require) {
	var Base = require('../view/base'),
	_ = require('underscore');
	return Base.extend({
		tagName : 'form',
		initialize:function(){
			Base.prototype.initialize.apply(this,arguments);
			this.$el.on('submit',function(){
				return false;
			});
		},
		getValues : function() {
			var values  = {},isArray = _.isArray;
			items = this.getFields();
			_.each(items, function(item) {
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
	    query:function(queryString){
	    	var query = queryString.match(/\[(.+?)\]/),
	    	items = [];
	    	_.each(this.items,function(item){
	    		if(item[query[1]]){
	    			items.push(item)
	    		} else {
		    		if(item.query){
		    			items = items.concat(item.query(queryString))
		    		}
	    		}
	    	})
	    	return items;
	    },
		getFields:function(){
			return this.query('[isFormField]')
			/*var fields = [];
			function filterField(items){
				_.each(items,function(item){
					if(item.isFormField){
						fields.push(item)
					} else {
						if(item.items && item.items.length){
							filterField(item.items)
						}
					}
				})
			}
			filterField(this.items);
			return fields;*/
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
	    /**
	     * Resets all fields in this form. By default, any record bound by {@link #loadRecord}
	     * will be retained.
	     * @param {Boolean} [resetRecord=false] True to unbind any record set
	     * by {@link #loadRecord}
	     * @return {Ext.form.Basic} this
	     */
	    reset: function(resetRecord) {
	        //Ext.suspendLayouts();

	        var me     = this,
	            fields = me.getFields(),
	            f,
	            fLen   = fields.length;

	        for (f = 0; f < fLen; f++) {
	            fields[f].reset();
	        }

	        /*Ext.resumeLayouts(true);
	        
	        if (resetRecord === true) {
	            delete me._record;
	        }*/
	        return me;
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
	});
});
