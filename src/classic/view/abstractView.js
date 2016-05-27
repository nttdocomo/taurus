(function (root, factory) {
    if(typeof define === "function"){
        if(define.amd) {
            // Now we're wrapping the factory and assigning the return
            // value to the root (window) and returning it as well to
            // the AMD loader.
            define(['../../view/base','../../util/storeHolder'],function(Base,StoreHolder){
              return (root.Class = factory(Base,StoreHolder));
            });
        }
        if(define.cmd){
            define(function(require, exports, module){
                return (root.Class = factory(require('../../view/base'),require('../../util/storeHolder')));
            })
        }
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (root.Class = factory(require('../../view/base'),require('../../util/storeHolder')));
    } else {
        root.Class = factory();
    }
}(this, function(Base,StoreHolder) {
	return Base.extend({
		initComponent:function(){
			var me = this;
			if (!me.itemSelector) {
                me.itemSelector = '.' + me.itemCls;
            }
            Base.prototype.initComponent.apply(this,arguments);
            me.bindStoreListeners(me.collection)
            me.refresh()
		},

        addEmptyText: function() {       
            var me = this/*,
                store = me.getStore()*/;

            if (me.emptyText/* && !store.isLoading() && (!me.deferEmptyText || me.refreshCounter > 1 || store.isLoaded())*/) {
                me.emptyEl = $(me.emptyText).insertBefore(me.getTargetEl());
            }
        },

	    getStoreListeners: function() {
	        var me = this;
	        return {
	            refresh: me.onDataRefresh,
	            replace: me.onReplace,
                reset: me.onReset,
	            /*add: me.onAdd,*/
	            remove: me.onRemove,
	            change: me.onUpdate,
                update: me.onAdd,
	            clear: me.onDataRefresh,
	            beginupdate: me.onBeginUpdate,
	            endupdate: me.onEndUpdate
	        };
	    },
        onReset:function(){
            this.refresh();
        },
	    onUpdate:function(store, record, operation, modifiedFieldNames, details){
	    	console.log(arguments)
	    },
        onRemove:function(){
        	console.log(arguments)
        },
        refresh:function(){
            var me = this,collection = me.collection;
            if (!me.rendered) {
                return;
            }
            if (collection.length < 1) {
                // Process empty text unless the store is being cleared.
                me.addEmptyText();
                //items.clear();
            }/* else {
                me.collectNodes(targetEl.dom);
                me.updateIndexes(0);
            }*/
        }
	}).mixins(StoreHolder)
}))
