/**
 * @author nttdocomo
 */
 (function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['./base','taurus'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('./base'),require('taurus'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('./base'),require('taurus'));
	}
}(this, function(Base,taurus) {
	return Base.extend({
		allowBlank : true,
		fieldSubTpl:'<div class="form-control-static"><%=value%></div>',
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

	        value = taurus.valueFrom(value, '');
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
}));
