(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(['../model/tree','backbone'],function(Tree,Backbone){
          return (root.Class = factory(Tree,Backbone));
        });
    }
    if(define.cmd){
        define(function(require, exports, module){
            return (root.Class = factory(require('../model/tree'),require('backbone')));
        })
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (root.Class = factory(require('../model/tree'),require('backbone')));
    } else {
        root.Class = factory();
    }
}(this, function(Tree,Backbone) {
    return Backbone.Collection.extend({
        model: Tree,
        /**
         * Tests whether the store currently has any active filters.
         * @return {Boolean} `true` if the store is filtered.
         */
        isFiltered: function() {
            return this.getFilters().getCount() > 0;
        },

        /**
         * Gets the filters for this store.
         * @return {Ext.util.FilterCollection} The filters
         */
        getFilters: function(/* private */ autoCreate) {
            var result = this.callParent();
            if (!result && autoCreate !== false) {
                this.setFilters([]);
                result = this.callParent();
            }
            return result;
        },
        onBeforeNodeExpand:function(node, callback, scope, args){
            var me = this,
                callbackArgs;
            callbackArgs = [node.collection];
            if (args) {
                callbackArgs.push.apply(callbackArgs, args);
            }
            callback.apply(scope || node, callbackArgs);
        }
    });
}))