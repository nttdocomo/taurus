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
	var array = [],
	slice = array.slice,
	Collection = Class.extend({
		init:function(options){
			var me = this;
			me.items = [];
			me.keys = [];
		},
		/**
	     * Adds an item to the collection. Fires the {@link #event-add} event when complete.
	     *
	     * @param {String/Object} key The key to associate with the item, or the new item.
	     *
	     * If a {@link #getKey} implementation was specified for this MixedCollection,
	     * or if the key of the stored items is in a property called `id`,
	     * the MixedCollection will be able to *derive* the key for the new item.
	     * In this case just pass the new item in this parameter.
	     *
	     * @param {Object} [obj] The item to add.
	     *
	     * Note that when adding a value that is iterable, it must be wrapped in brackets, i.e.:
	     *
	     *     c.add([[1, 2]]);
	     *
	     * This will be needed for any value that is iterable, i.e., an array, arguments object,
	     * HTML collections, etc.
	     *
	     * @return {Object} The item added.
	     * @since 1.1.0
	     */
	    add : function(obj) {
	    	this.items.push(obj)
	    },
	    //</deprecated>

	    /**
	     * Inserts an item at the specified index in the collection. Fires the {@link #event-add} event when complete.
	     * @param {Number} index The index to insert the item at.
	     * @param {String/Object/String[]/Object[]} key The key to associate with the new item, or the item itself.
	     * May also be an array of either to insert multiple items at once.
	     * @param {Object/Object[]} o (optional) If the second parameter was a key, the new item.
	     * May also be an array to insert multiple items at once.
	     * @return {Object} The item inserted or an array of items inserted.
	     * @since 1.1.0
	     */
	    insert : function(index, key, obj) {
	        var out;
	        if(_.isArray(key)){
	        	out = this.doInsert(index, key, obj);
	        }
	        if (arguments.length > 2) {
                out = this.doInsert(index, [key], [obj]);
            } else {
                out = this.doInsert(index, [key]);
            }
            out = out[0];
	        return out;
	    },
	    doInsert:function(index, keys, objs){
	    	var me = this;
	    	if (objects != null) {
	            me.useLinearSearch = true;
	        }
	        // No external keys: calculate keys array if not passed
	        else {
	            objects = keys;
	            keys = new Array(len);
	            for (i = 0; i < len; i++) {
	                keys[i] = this.getKey(objects[i]);
	            }
	        }
	    }
	});

    // Underscore methods that we want to implement on the Collection.
	// 90% of the core usefulness of Backbone Collections is actually implemented
	// right here:
	var methods = ['forEach', 'each', 'map', 'collect', 'reduce', 'foldl',
	'inject', 'reduceRight', 'foldr', 'find', 'detect', 'filter', 'select',
	'reject', 'every', 'all', 'some', 'any', 'include', 'contains', 'invoke',
	'max', 'min', 'toArray', 'size', 'first', 'head', 'take', 'initial', 'rest',
	'tail', 'drop', 'last', 'without', 'difference', 'indexOf', 'shuffle',
	'lastIndexOf', 'isEmpty', 'chain', 'sample', 'partition'];

	// Mix in each Underscore method as a proxy to `Collection#models`.
	_.each(methods, function(method) {
		if (!_[method]) return;
		Collection.prototype[method] = function() {
			var args = slice.call(arguments);
			args.unshift(this.items);
			return _[method].apply(_, args);
		};
	});
	return Collection;
}));