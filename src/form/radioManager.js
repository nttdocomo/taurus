define(function(require){
	var Collection = require('../util/mixedCollection');
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
})