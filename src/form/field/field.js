/**
 * @author nttdocomo
 */
 (function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['underscore'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('underscore'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('underscore'));
	}
}(this, function(_) {
    /**
     * Sets a data value into the field and runs the change detection and validation.
     * @param {Object} value The value to set
     * @return {Ext.form.field.Field} this
     */
    setValue: function(value) {
        var me = this;
        me.value = value;
        me.checkChange();
        return me;
    }
}))
