(function (root, factory) {
    if(typeof define === "function"){
        if(define.amd) {
            // Now we're wrapping the factory and assigning the return
            // value to the root (window) and returning it as well to
            // the AMD loader.
            define(['../../view/base','../../util/storeHolder','underscore'],function(Base,StoreHolder,_){
              return (root.Class = factory(Base,StoreHolder,_));
            });
        }
        if(define.cmd){
            define(function(require, exports, module){
                return (root.Class = factory(require('../../view/base'),require('../../util/storeHolder'),require('underscore')));
            })
        }
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (root.Class = factory(require('../../view/base'),require('../../util/storeHolder'),require('underscore')));
    } else {
        root.Class = factory();
    }
}(this, function(Base,StoreHolder,_) {
	return Base.extend({
		initComponent:function(){
			var me = this;
			if (!me.itemSelector) {
                me.itemSelector = '.' + me.itemCls;
            }
            Base.prototype.initComponent.apply(this,arguments);
            me.bindStore(me.collection)
            me.refresh()
		},

        addEmptyText: function() {
            var me = this/*,
                store = me.getStore()*/;

            if (me.emptyText/* && !store.isLoading() && (!me.deferEmptyText || me.refreshCounter > 1 || store.isLoaded())*/) {
                me.emptyEl = $(me.emptyText).prependTo(me.getTargetEl());
            }
        },

        /**
         * Changes the data store bound to this view and refreshes it.
         * @param {Ext.data.Store} store The store to bind to this view
         * @since 3.4.0
         */
        bindStore: function(store, initial) {
            var me = this;
            StoreHolder.prototype.bindStore.apply(me,arguments)
            // If we have already achieved our first layout, refresh immediately.
            // If we bind to the Store before the first layout, then beforeLayout will
            // call doFirstRefresh
            if (store/* && me.componentLayoutCounter*/) {
                // If not the initial bind, we enforce noDefer.
                me.doFirstRefresh(store, !initial);
            }
        },

        /**
         * @private
         * Perform the first refresh of the View from a newly bound store.
         *
         * This is called when this View has been sized for the first time.
         */
        doFirstRefresh: function(store, noDefer) {
            var me = this;

            // If we are configured to defer, and *NOT* called from the defer call below
            if (me.deferInitialRefresh && !noDefer) {
                Ext.defer(me.doFirstRefresh, 1, me, [store, true]);
            }

            else {
                // 4.1.0: If we have a store, and the Store is *NOT* already loading (a refresh is on the way), then
                // on first layout, refresh regardless of record count.
                // Template may contain boilerplate HTML outside of record iteration loop.
                // Also, emptyText is appended by the refresh method.
                if (store && !store.isLoading) {
                    me.refresh();
                }
            }
        },

	    getStoreListeners: function() {
	        var me = this,
            debounceOnAdd = _.debounce(me.onAdd, 500);
	        return {
	            refresh: me.onDataRefresh,
	            replace: me.onReplace,
                reset: me.onReset,
                sync: debounceOnAdd,
	            /*add: me.onAdd,*/
	            //remove: _.debounce(me.onRemove, 200),//backbone-pageable will trigger remove event on add models.
	            change: debounceOnAdd,
                update:debounceOnAdd,
	            clear: me.onDataRefresh,
	            beginupdate: me.onBeginUpdate,
	            endupdate: me.onEndUpdate
	        };
	    },
        onSync:function(){
            this.refresh();
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
