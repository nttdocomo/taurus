(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(['../view/table'],function(Table){
          return (root.Class = factory(Table));
        });
    }
    if(define.cmd){
        define(function(require, exports, module){
            return (root.Class = factory(require('../view/table')));
        })
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (root.Class = factory(require('../view/table')));
    } else {
        root.Class = factory();
    }
}(this, function(Table) {
    return Table.extend({
        initComponent: function() {
            var me = this;

            if (me.bufferedRenderer) {
                me.animate = false;
            }
            else if (me.initialConfig.animate === undefined) {
                me.animate = Ext.enableFx;
            }

            me.store = me.panel.getStore();
            me.onRootChange(me.store.getRoot());

            me.animQueue = {};
            me.animWraps = {};

            me.callParent();
            me.store.setRootVisible(me.rootVisible);
            me.addRowTpl(Ext.XTemplate.getTpl(me, 'treeRowTpl'));
        }
    })
}))