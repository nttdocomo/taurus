/**
 * @author nttdocomo
 */
 (function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['class','underscore'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('class'),require('underscore'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('class'),require('underscore'));
	}
}(this, function(Class,_){
	// I am the constructor function.
	function Collection(){

		// When creating the collection, we are going to work off
		// the core array. In order to maintain all of the native
		// array features, we need to build off a native array.
		var collection = Object.create( Array.prototype );

		// Initialize the array. This line is more complicated than
		// it needs to be, but I'm trying to keep the approach
		// generic for learning purposes.
		collection = (Array.apply( collection, arguments ) || collection);

		// Add all the class methods to the collection.
		Collection.injectClassMethods( collection );

		// Return the new collection object.
		return( collection );

	}


	// ------------------------------------------------------ //
	// ------------------------------------------------------ //


	// Define the static methods.
	Collection.injectClassMethods = function( collection ){

		// Loop over all the prototype methods and add them
		// to the new collection.
		for (var method in Collection.prototype){

			// Make sure this is a local method.
			if (Collection.prototype.hasOwnProperty( method )){

				// Add the method to the collection.
				collection[ method ] = Collection.prototype[ method ];

			}

		}

		// Return the updated collection.
		return( collection );

	};


	// I create a new collection from the given array.
	Collection.fromArray = function( array ){

		// Create a new collection.
		var collection = Collection.apply( null, array );

		// Return the new collection.
		return( collection );

	};


	// I determine if the given object is an array.
	Collection.isArray = function( value ){

		// Get it's stringified version.
		var stringValue = Object.prototype.toString.call( value );

		// Check to see if the string represtnation denotes array.
		return( stringValue.toLowerCase() === "[object array]" );

	};


	// ------------------------------------------------------ //
	// ------------------------------------------------------ //


	// Define the class methods.
	Collection.prototype = {

		// I add the given item to the collection. If the given item
		// is an array, then each item within the array is added
		// individually.
		add: function( value ){

			// Check to see if the item is an array.
			if (Collection.isArray( value )){

				// Add each item in the array.
				for (var i = 0 ; i < value.length ; i++){

					// Add the sub-item using default push() method.
					Array.prototype.push.call( this, value[ i ] );

				}

			} else {

				// Use the default push() method.
				Array.prototype.push.call( this, value );

			}

			// Return this object reference for method chaining.
			return( this );

		},


		// I add all the given items to the collection.
		addAll: function(){

			// Loop over all the arguments to add them to the
			// collection individually.
			for (var i = 0 ; i < arguments.length ; i++){

				// Add the given value.
				this.add( arguments[ i ] );

			}

			// Return this object reference for method chaining.
			return( this );

		},
		getIndexBy:function(name, value){
			for (var i = 0; i < this.length; i++) {
		        if (this[i][name] == value) {
		            return i;
		        }
		    }
		    return -1;
		},
		remove : function(o) {
	        var me = this;
	        me.getIndexBy('id',o.id)
	        me.splice(me.getIndexBy('id',o.id) - 1, 1);

	        /*return (index === -1) ? false : me.removeAt(index);*/
	    }

	};


	// ------------------------------------------------------ //
	// ------------------------------------------------------ //
	// ------------------------------------------------------ //
	// ------------------------------------------------------ //


	// Return the collection constructor.
	return( Collection );
}));