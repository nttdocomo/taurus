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
}(this, function(Base) {
    return Base.extend({
        /**
         * @cfg {Boolean} rootVisible
         * False to hide the root node.
         */
        rootVisible: true,
        expanderSelector: '.tree-expander',
        cellTpl: [
            '<td class="<%=tdCls%>" <%=tdAttr%> style="<%if(tdStyle){%><%=tdStyle%><%}%>" tabindex="-1" data-column-id="<%=column.cid%>">',
                '<div class="grid-cell-inner <%=innerCls%>"',
                    '<%if(style){%> style="<%=style%>"<%}%>><%=value%></div>',
            '</td>'].join(''),
        initComponent: function() {
            var me = this;

            me.model = me.panel.getStore();
            //me.onRootChange(me.model.root);

            Base.prototype.initComponent.apply(me,arguments);
            me.collection.rootVisible = me.rootVisible;
            //me.addRowTpl(Ext.XTemplate.getTpl(me, 'treeRowTpl'));
        },

        onRootChange: function(newRoot, oldRoot) {
            var me = this;

            if (oldRoot) {
                me.rootListeners.destroy();
                me.rootListeners = null;
            }
            
            if (newRoot) {
                me.rootListeners = newRoot.on({
                    beforeexpand: me.onBeforeExpand,
                    expand: me.onExpand,
                    beforecollapse: me.onBeforeCollapse,
                    collapse: me.onCollapse,
                    destroyable: true,
                    scope: me
                });
            }
        },
        processUIEvent: function(e) {
            // If the clicked node is part of an animation, ignore the click.
            // This is because during a collapse animation, the associated Records
            // will already have been removed from the Store, and the event is not processable.
            /*if (e.getTarget('.' + this.nodeAnimWrapCls, this.el)) {
                return false;
            }*/
            return Base.prototype.processUIEvent.apply(this,arguments);//this.callParent([e]);
        },

        onItemClick: function(record, item, index, e) {
            if (e.getTarget(this.expanderSelector, item) && record.isExpandable()) {
                this.toggle(record, e.ctrlKey);
                return false;
            }
            return this.callParent([record, item, index, e]);
        }
    })
}))