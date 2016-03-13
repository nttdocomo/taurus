(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(['backbone','../subscribeModule'],function(Backbone){
          return (root.Class = factory(Backbone));
        });
    }
    if(define.cmd){
        define(function(require, exports, module){
            return (root.Class = factory(require('backbone'),require('../subscribeModule')));
        })
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (root.Class = factory(require('backbone'),require('../subscribeModule')));
    } else {
        root.Class = factory();
    }
}(this, function(Backbone,subscribeModule) {
    var Colleciton = subscribeModule.fire('tree-collection');
    var Model = Backbone.Model.extend({
        defaults:{
            depth:0,
            expandable:true,
            expanded:false,
            icon:'',
            isLast:false,
            leaf:false,
            parentId: null,
            visible:true
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
            var me = this,
            Collection = subscribeModule.fire('tree-collection');
            Backbone.Model.prototype.initialize.apply(this,arguments)
            if (Array.isArray(this.get('children'))) {
                var children = new Backbone.Collection(this.get('children'),{
                    model:Model
                })
                children.parentNode = this;
                children.each(function(model){
                    model.parentNode = me;
                    model.set('depth',me.get('depth')+1)
                })
                me.set({children: children});
            }
        },

        // Used to inform the TreeStore that we belong to about some event which requires its participation.
        callTreeStore: function(funcName, args) {
            var me = this,
                target = me.getTreeStore(),
                fn = target && target[funcName];

            if (target && fn) {
                args = args || [];
                if (args[0] !== me) {
                    args.unshift(me);
                }
                fn.apply(target, args);
            }
        },

        /**
         * Expand this node.
         * @param {Boolean} [recursive=false] True to recursively expand all the children
         * @param {Function} [callback] The function to execute once the expand completes
         * @param {Object} [scope] The scope to run the callback in
         */
        collapse: function(recursive, callback, scope) {
            var me = this;
            if(me.isExpanded()){
              me.set('expanded', false);
              me.callTreeStore('onNodeCollapse', [me.get('children'),callback, scope]);
            }
        },

        /**
         * Expand this node.
         * @param {Boolean} [recursive=false] True to recursively expand all the children
         * @param {Function} [callback] The function to execute once the expand completes
         * @param {Object} [scope] The scope to run the callback in
         */
        expand: function(recursive, callback, scope) {
            var me = this;
            if(!me.isExpanded()){
              me.callTreeStore('onBeforeNodeExpand', [me.onChildNodesAvailable, me, [recursive, callback, scope]]);
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
            return root && root.collection;
        },

        /**
         * Returns true if this node has one or more child nodes, else false.
         * @return {Boolean}
         */
        hasChildNodes: function() {
            return !this.isLeaf() && (this.get('children') && this.get('children').length > 0);
        },
        isExpandable:function(){
            var me = this;
            if (me.get('expandable')) {
                return !(me.isLeaf() || (me.isLoaded() && /*!me.phantom && */!me.hasChildNodes()));
            }
            return false;
        },

        /**
         * Returns `true` if this node is expanded.
         * @return {Boolean}
         */
        isExpanded: function() {
            return this.get('expanded');
        },

        /**
         * Returns true if this node is a leaf
         * @return {Boolean}
         */
        isLeaf: function() {
            return this.get('leaf') === true;
        },

        /**
         * Returns true if this node is loaded
         * @return {Boolean}
         */
        isLoaded: function() {
            return true;
        },
        /**
         * @private
         * Used by {@link Ext.tree.Column#initTemplateRendererData} to determine whether a node is the last *visible*
         * sibling.
         *
         */
        isLastVisible: function() {
            var me = this,
                collection = me.collection,
                result = me == collection.at(collection.length - 1),
                next = me.nextSibling;
            // If it is not the true last and the store is filtered
            // we need to see if any following siblings are visible.
            // If any are, return false.
            /*if (!result && me.getTreeStore().isFiltered()) {
                while (next) {
                    if (next.data.visible) {
                        return false;
                    }
                    next = next.nextSibling;
                }
                return true;
            }*/
            return result;
        },

        /**
         * Returns true if this node is the root node
         * @return {Boolean}
         */
        isRoot: function() {
            return !this.parentNode;
        },
        onChildNodesAvailable:function(records, recursive, callback, scope){
            var me = this;
            me.set('expanded', true);
            me.callTreeStore('onNodeExpand', [records, false])
        }
    });
    return Model
}))
