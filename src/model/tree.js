(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(['backbone'],function(Backbone){
          return (root.Class = factory(Backbone));
        });
    }
    if(define.cmd){
        define(function(require, exports, module){
            return (root.Class = factory(require('backbone')));
        })
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (root.Class = factory(require('backbone')));
    } else {
        root.Class = factory();
    }
}(this, function(Backbone) {
    var Model = Backbone.Model.extend({
        defaults:{
            icon:'',
            parentId: null
        },
        /**
         * @cfg {Ext.data.TreeModel/Ext.data.NodeInterface/Object} root
         * The root node for this store. For example:
         *
         *     root: {
         *         expanded: true,
         *         text: "My Root",
         *         children: [
         *             { text: "Child 1", leaf: true },
         *             { text: "Child 2", expanded: true, children: [
         *                 { text: "GrandChild", leaf: true }
         *             ] }
         *         ]
         *     }
         *
         * Setting the `root` config option is the same as calling {@link #setRootNode}.
         *
         * It's important to note that setting expanded to true on the root node will cause
         * the tree store to attempt to load.  This will occur regardless the value of 
         * {@link Ext.data.ProxyStore#autoLoad autoLoad}. If you you do not want the store 
         * to load on instantiation, ensure expanded is false and load the store when you're ready.
         * 
         */
        root: null,

        /**
         * @cfg {Boolean} rootVisible `false` to not include the root node in this Stores collection.
         * @accessor
         */
        rootVisible: false,
        initialize: function() {
            if (Array.isArray(this.get('children'))) {
                this.set({children: new Collection(this.get('children'))});
            }
        },
        /**
         * Returns the {@link Ext.data.TreeStore} which owns this node.
         * @return {Ext.data.TreeStore} The TreeStore which owns this node.
         */
        getTreeStore: function() {
            var root = this;
            while (root && !root.treeStore) {
                root = root.parentNode;
            }
            return root && root.treeStore;
        },
        isExpandable:function(){
            var me = this;
            if (me.get('expandable')) {
                return !(me.isLeaf() || (me.isLoaded() && !me.phantom && !me.hasChildNodes()));
            }
            return false;
        },
        /**
         * Tests whether the store currently has any active filters.
         * @return {Boolean} `true` if the store is filtered.
         */
        isFiltered: function() {
            return this.getFilters().getCount() > 0;
        },
        /**
         * @private
         * Used by {@link Ext.tree.Column#initTemplateRendererData} to determine whether a node is the last *visible*
         * sibling.
         * 
         */
        isLastVisible: function() {
            var me = this,
                result = me.get('isLast'),
                next = me.nextSibling;
            // If it is not the true last and the store is filtered
            // we need to see if any following siblings are visible.
            // If any are, return false.
            if (!result && me.getTreeStore().isFiltered()) {
                while (next) {
                    if (next.data.visible) {
                        return false;
                    }
                    next = next.nextSibling;
                }
                return true;
            }
            return result;
        }
    }),
    Collection = Backbone.Collection.extend({
        model: Model
    });
    return Model
}))