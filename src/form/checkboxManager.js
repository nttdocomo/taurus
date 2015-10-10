/**
 * @author nttdocomo
 */
 (function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['../util/mixedCollection'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('../util/mixedCollection'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('../util/mixedCollection'));
	}
}(this, function(Collection){
	return new (Collection.extend({
	    getByName: function(name, formId) {
	        return this.filter(function(item) {
	            return item.name === name && item.getFormId() === formId;
	        });
	    }
	}));
}));