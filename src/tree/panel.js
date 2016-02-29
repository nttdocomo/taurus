(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(['../panel/table','../model/tree','underscore'],function(Table){
          return (root.Class = factory(Table));
        });
    }
    if(define.cmd){
        define(function(require, exports, module){
            return (root.Class = factory(require('../panel/table'),require('../model/tree'),require('underscore')));
        })
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (root.Class = factory(require('../panel/table'),require('../model/tree'),require('underscore')));
    } else {
        root.Class = factory();
    }
}(this, function(Table,Model,_) {
    return Table.extend({
        treeCls: 'tree-panel',
        useArrows: false,
        arrowCls: 'tree-arrows',
        initialize: function(config) {
            config = config || {};
            if (config.animate === undefined) {
                config.animate = _.isBoolean(this.animate) ? this.animate : true/*Ext.enableFx*/;
            }
            this.enableAnimations = config.animate;
            delete config.animate;

            Table.prototype.initialize.apply(this,arguments);
        },
        initComponent: function() {
            var me = this,
            cls = [me.treeCls],
            store,
            view;

            if (me.useArrows) {
                cls.push(me.arrowCls);
                me.lines = false;
            }

            if (me.lines) {
                cls.push(me.linesCls);
            } else if (!me.useArrows) {
                cls.push(me.noLinesCls);
            }

            store = me.applyStore(me.store);

            // If there is no root node defined, then create one.
            if (!store.root) {
                store.root = {};
            }

            // Store must have the same idea about root visibility as us BEFORE callParent binds it.
            store.setRootVisible(me.rootVisible);

            me.viewConfig = Ext.apply({
                rootVisible: me.rootVisible,
                animate: me.enableAnimations,
                singleExpand: me.singleExpand,
                node: store.getRoot(),
                hideHeaders: me.hideHeaders,
                navigationModel: 'tree'
            }, me.viewConfig);

            // If the user specifies the headers collection manually then don't inject
            // our own
            if (!me.columns) {
                if (me.initialConfig.hideHeaders === undefined) {
                    me.hideHeaders = true;
                }
                me.addCls(me.autoWidthCls);
                me.columns = [{
                    xtype    : 'treecolumn',
                    text     : 'Name',
                    flex     : 1,
                    dataIndex: me.displayField         
                }];
            }

            if (me.cls) {
                cls.push(me.cls);
            }
            me.cls = cls.join(' ');

            me.callParent();

            view = me.getView();

            // Relay events from the TreeView.
            // An injected LockingView relays events from its locked side's View
            me.relayEvents(view, [
                /**
                * @event checkchange
                * Fires when a node with a checkbox's checked property changes
                * @param {Ext.data.TreeModel} node The node who's checked property was changed
                * @param {Boolean} checked The node's new checked state
                */
                'checkchange',
                /**
                * @event afteritemexpand
                * @inheritdoc Ext.tree.View#afteritemexpand
                */
                'afteritemexpand',
                /**
                * @event afteritemcollapse
                * @inheritdoc Ext.tree.View#afteritemcollapse
                */
                'afteritemcollapse'
            ]);
        },
        applyStore:function(store){
            return new Model(store)
        }
    })
}))