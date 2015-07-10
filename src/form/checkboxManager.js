define(function(require){
	var Collection = require('../util/mixedCollection');
	return new (Collection.extend({
	    getByName: function(name, formId) {
	        return this.filter(function(item) {
	            return item.name === name && item.getFormId() === formId;
	        });
	    }
	}));
})