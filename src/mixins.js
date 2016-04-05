/**
 * @author nttdocomo
 */
 (function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['backbone'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('backbone'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('backbone'));
	}
}(this, function(Backbone){
	var mixins = function(givingClass) {
		var receivingClass = this;

	    // only provide certain methods
	    if ( arguments[1] ) {
	        for ( var i = 2, len = arguments.length; i < len; i++ ) {
	            receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]];
	        }
	    }
	    // provide all methods
	    else {
	        for ( var methodName in givingClass.prototype ) {

	            // check to make sure the receiving class doesn't
	            // have a method of the same name as the one currently
	            // being processed
	            if ( !Object.hasOwnProperty.call(receivingClass.prototype, methodName) ) {
	                receivingClass.prototype[methodName] = givingClass.prototype[methodName];
	            }

	            // Alternatively:
	            // if ( !receivingClass.prototype[methodName] ) {
	            //  receivingClass.prototype[methodName] = givingClass.prototype[methodName];
	            // }
	        }
	    }
	    return receivingClass;
	};
	Backbone.Model.mixins = Backbone.Collection.mixins = Backbone.View.mixins = mixins;
}))