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
			define(["./label","./fieldAncestor"], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
		        return factory(require('./label'),require('./fieldAncestor'));
		     })
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require("./label"),require('./fieldAncestor'));
	} else {
		root.myModule = factory();
	}
}(this, function(Base,FieldAncestor) {
	return Base.extend({
		fieldSubTpl:'',
		uiClass:'form-fieldcontainer',
		direction:'row',
		/**
	     * @cfg {Boolean} combineErrors
	     * If set to true, the field container will automatically combine and display the validation errors from
	     * all the fields it contains as a single error on the container, according to the configured
	     * {@link #msgTarget}. Defaults to false.
	     */
	    combineErrors:false,
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
		getTargetEl: function() {
            return this.frameBody || this.bodyEl;
        },
		lookupComponent : function(cmp) {
			if(this.combineErrors){
				cmp.msgTarget = false;
			}
			return this._super.apply(this,arguments)
			/*var Cls;
			if (_.has(cmp, 'cls')) {
				Cls = cmp['cls'];
			} else {
				Cls = this.defaultType;
			}
			if(Cls){
				return new Cls($.extend(_.omit(cmp, 'cls'),{
					//renderTo:this.getItemContainer(cmp)
				}));
			}
			return false;*/
		},
        render:function(){
        	this.$el.addClass('form-fieldcontainer-' + this.direction)
        	Base.prototype.render.apply(this,arguments)
        },
        /**
	     * @private Fired when the error message of any field within the container changes, and updates the
	     * combined error message to match.
	     */
	    onFieldErrorChange: function(activeError) {
	        if (this.combineErrors) {
	            var me = this,
	                oldError = me.getActiveError(),
	                invalidFields = _.filter(me.query('[isFormField]'), function(field) {
	                    return field.hasActiveError();
	                }),
	                newErrors = me.getCombinedErrors(invalidFields);

	            if (newErrors.length) {
	                me.setActiveErrors(activeError);
	            } else {
	                me.unsetActiveError();
	            }

	            if (oldError !== me.getActiveError()) {
	                me.updateLayout();
	            }
	        }
	    },
		onAdd : function(item, pos, len) {
			Base.prototype.onAdd.apply(this,arguments);
			this.onChildFieldAdd(item)
		},

	    /**
	     * Takes an Array of invalid {@link Ext.form.field.Field} objects and builds a combined list of error
	     * messages from them. Defaults to prepending each message by the field name and a colon. This
	     * can be overridden to provide custom combined error message handling, for instance changing
	     * the format of each message or sorting the array (it is sorted in order of appearance by default).
	     * @param {Ext.form.field.Field[]} invalidFields An Array of the sub-fields which are currently invalid.
	     * @return {String[]} The combined list of error messages
	     */
	    getCombinedErrors: function(invalidFields) {
	        var errors = [],
	            f,
	            fLen   = invalidFields.length,
	            field,
	            activeErrors, a, aLen,
	            error, label;

	        for (f = 0; f < fLen; f++) {
	            field = invalidFields[f];
	            activeErrors = field.getActiveErrors();
	            aLen         = activeErrors.length;

	            for (a = 0; a < aLen; a++) {
	                error = activeErrors[a];
	                label = field.getFieldLabel();

	                errors.push((label ? label + ': ' : '') + error);
	            }
	        }

	        return errors;
	    }
	}).mixins(FieldAncestor);
}));
