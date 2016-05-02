/**
 * @author nttdocomo
 */
 (function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['../../util/mixedCollection'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('../../util/mixedCollection'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('../../util/mixedCollection'));
	}
}(this, function(Collection){
	return new (Collection.extend({
		getChecked: function(name, formId) {
	        return this.find(function(item) {
	            return item.get(name) === name && item.get('checked') && item.getFormId() === formId;
	        });
	    },

	    getByName: function(name, formId) {
	        return this.filter(function(item) {
	            return item.name === name && item.getFormId() === formId;
	        });
	    },

	    getWithValue: function(name, value, formId) {
	        return this.filter(function(item) {
	            return item.name === name &&
	                   item.inputValue == value && // jshint ignore:line
	                   item.getFormId() === formId;
	        });
	    }
	}));
}));
