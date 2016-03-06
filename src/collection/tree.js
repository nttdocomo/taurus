(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(['../model/tree','../subscribeModule','backbone'],function(Tree,Backbone){
          return (root.Class = factory(Tree,Backbone));
        });
    }
    if(define.cmd){
        define(function(require, exports, module){
            return (root.Class = factory(require('../model/tree'),require('../subscribeModule'),require('backbone')));
        })
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (root.Class = factory(require('../model/tree'),require('../subscribeModule'),require('backbone')));
    } else {
        root.Class = factory();
    }
}(this, function(Tree,subscribeModule,Backbone) {
    var Collection = Backbone.Collection.extend({
        model: Tree,
        initialize:function(){
          Backbone.Collection.prototype.initialize.apply(this,arguments)
          this.updateRoot()
        },
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

        // Collects child nodes to remove into the passed toRemove array.
        // When available, all descendant nodes are pushed into that array using recursion.
        handleNodeExpand: function(parent, records, toAdd) {
            var me = this,
                ln = records ? records.length : 0,
                i, record;

            // If parent is not visible, nothing to do (unless parent is the root)
            if (parent !== this.root && !me.isVisible(parent)) {
                return;
            }

            if (ln) {
                // The view items corresponding to these are rendered.
                // Loop through and expand any of the non-leaf nodes which are expanded
                for (i = 0; i < ln; i++) {
                    record = records.at(i);

                    // If the TreePanel has not set its visible flag to false, add to new node array
                    if (record.get('visible')) {
                        // Add to array being collected by recursion when child nodes are loaded.
                        // Must be done here in loop so that child nodes are inserted into the stream in place
                        // in recursive calls.
                        toAdd.push(record);

                        if (record.isExpanded()) {
                            if (record.isLoaded()) {
                                // Take a shortcut - appends to toAdd array
                                me.handleNodeExpand(record, record.childNodes, toAdd);
                            }
                            else {
                                // Might be asynchronous if child nodes are not immediately available
                                record.set('expanded', false);
                                record.expand();
                            }
                        }
                    }
                }
            }
        },

        isVisible: function(node) {
            var parentNode = node.parentNode,
                visible = node.get('visible'),
                root = this.root;

            while (visible && parentNode) {
                visible = parentNode.get('expanded') && parentNode.get('visible');
                parentNode = parentNode.parentNode;
            }
            // The passed node is visible if we ended up at the root node, and it is visible.
            // UNLESS it's the root node, and we are configured with rootVisible:false
            return visible && !(node === root && !this.rootVisible);
        },
        onBeforeNodeExpand:function(node, callback, scope, args){
            var me = this,
                callbackArgs;
            callbackArgs = [node.get('children')];
            if (args) {
                callbackArgs.push.apply(callbackArgs, args);
            }
            callback.apply(scope || node, callbackArgs);
        },

        // Called from a node's onChildNodesAvailable method to
        // insert the newly available child nodes below the parent.
        onNodeExpand: function(parent, records) {
            var me = this,
                insertIndex = me.indexOf(parent) + 1,
                toAdd = [];

            me.handleNodeExpand(parent, records, toAdd);

            // If a hidden root is being expanded for the first time, it's not an insert operation
            if (!me.refreshCounter && parent.isRoot() && !parent.get('visible')) {
                me.loadRecords(toAdd);
            }
            // The add event from this insertion is handled by TreeView.onAdd.
            // That implementation calls parent and then ensures the previous sibling's joining lines are correct.
            else {
                me.add(toAdd,{at:insertIndex});
                console.log(me)
            }
        },
        updateRoot:function(){
          
        }
    });
    subscribeModule.subscribe('tree-collection',Collection);
    return Collection
}))
