(function (root, factory) {
    if(typeof define === "function") {
        if(define.amd){
            // Now we're wrapping the factory and assigning the return
            // value to the root (window) and returning it as well to
            // the AMD loader.
            define(['../mixin/mixin'], factory);
        }
        if(define.cmd){
            define(function(require, exports, module){
                return factory(require('../mixin/mixin'))
            })
        } 
    }else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = factory(require('../mixin/mixin'))
    } else {
        root.Class = factory();
    }
}(this, function(mixin) {
    return mixin({
        bindStore:function(store, initial, propertyName){
            var me = this
            propertyName = propertyName || 'store'
            if (store) {
                me[propertyName] = store
                me.bindStoreListeners(store);
                //me.onBindStore(store, oldStore);
            } else {
                me[propertyName] = null;
            }
            return me
        },
        /**
         * Binds listeners for this component to the store. By default it will add
         * anything bound by the getStoreListeners method, however it can be overridden
         * in a subclass to provide any more complicated handling.
         * @protected
         * @param {Ext.data.AbstractStore} store The store to bind to
         */
        bindStoreListeners: function(collection) {
            // Can be overridden in the subclass for more complex binding
            var listeners = this.getStoreListeners(collection);

            if (listeners) {
                /*listeners = Ext.apply({}, listeners);
                if (!listeners.scope) {
                    listeners.scope = this;
                }*/
                this.storeListeners = listeners;
                collection.on(listeners,this);
            }
        }
    })
}))
