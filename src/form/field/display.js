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
define(function(require) {
	var Base = require("./base"),
	taurus = require('../../taurus');
	return Base.extend({
		allowBlank : true,
		fieldSubTpl:'<p class="form-control-static"><%=value%></p>',
		getRawValue:function(){
			return this.rawValue;
		},
    
	    valueToRaw: function(value) {
	        if (value || value === 0 || value === false) {
	            return value;
	        } else {
	            return '';
	        }
	    },

	    setRawValue: function(value) {
	        var me = this;
	            
	        value = taurus.value(value, '');
	        me.rawValue = value;
	        if (me.rendered) {
	            me.inputEl.html(me.getDisplayValue());
	        }
	        return value;
	    },
        getDisplayValue:function(){
        	var me = this,
	            value = this.getRawValue(),
	            display;
	        if (me.renderer) {
	             display = me.renderer.call(me.scope || me, value, me);
	        } else {
	             display = value;
	        }
	        return display;
        },
	    getSubTplData: function(fieldData) {
	        var ret = Base.prototype.getSubTplData.apply(this,arguments);

	        ret.value = this.getDisplayValue();

	        return ret;
	    },
		applyChildEls : function(childEls) {
			var childEls = $.extend(childEls || {}, {
				'inputEl' : '.form-control-static'
			});
			Base.prototype.applyChildEls.call(this, childEls);
		}
	});
});
