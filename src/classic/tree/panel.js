(function (root, factory) {
    if(typeof define === "function") {
        if(define.amd){
            // Now we're wrapping the factory and assigning the return
            // value to the root (window) and returning it as well to
            // the AMD loader.
            define(['../panel/table','./navigationModel', './view','./column','../panel/mixins','../model/tree','underscore','backbone'], factory)
        }
        if(define.cmd){
            define(function(require, exports, module){
                return (root.Class = factory(require('../panel/table'),require('./navigationModel'),require('./view'),require('./column'),require('../panel/mixins'),require('../model/tree'),require('underscore'),require('backbone')));
            })
        }
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (root.Class = factory(require('../panel/table'),require('./navigationModel'),require('./view'),require('./column'),require('../panel/mixins'),require('../model/tree'),require('underscore'),require('backbone')));
    } else {
        root.Class = factory();
    }
}(this, function(Table,NavigationModel,View,Column,mixins,Model,_,Backbone) {
    return Table.extend({
        treeCls: 'tree-panel',
        useArrows: false,
        viewType:View,
        arrowCls: 'tree-arrows',
        displayField: 'text',
        animate:false,
        /**
         * @cfg {Boolean} [rootVisible=true]
         * False to hide the root node.
         *
         * Note that trees *always* have a root node. If you do not specify a {@link #cfg-root} node, one will be created.
         *
         * If the root node is not visible, then in order for a tree to appear to the end user, the root node is autoloaded with its child nodes.
         */
        rootVisible: false,
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
            model,
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

            model = me.applyStore(me.model);

            // If there is no root node defined, then create one.
            if (!model.root) {
                model.root = {};
            }

            // Store must have the same idea about root visibility as us BEFORE callParent binds it.
            model.rootVisible = me.rootVisible;

            me.viewConfig = _.extend({
                rootVisible: me.rootVisible,
                animate: me.enableAnimations,
                singleExpand: me.singleExpand,
                node: model.root,
                hideHeaders: me.hideHeaders,
                navigationModel: NavigationModel
            }, me.viewConfig);

            // If the user specifies the headers collection manually then don't inject
            // our own
            if (!me.columns) {
                if (me.initialConfig.hideHeaders === undefined) {
                    me.hideHeaders = true;
                }
                me.$el.addClass(me.autoWidthCls);
                me.columns = [{
                    'class'    : Column,
                    text     : 'Name',
                    flex     : 1,
                    dataIndex: me.displayField
                }];
            }

            if (me.cls) {
                cls.push(me.cls);
            }
            me.cls = cls.join(' ');

            Table.prototype.initComponent.apply(me,arguments);

            view = me.getView(View);

            // Relay events from the TreeView.
            // An injected LockingView relays events from its locked side's View
        },
        applyStore:function(store){
            if(store instanceof Backbone.Model){
                return store
            } else {
                return new Model(store)
            }
        },

        /**
         * Returns the store associated with this Panel.
         * @return {Ext.data.Store} The store
         */
        getStore: function(){
            return this.model;
        }
    }).mixins(mixins);
}))
