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

        /**
         * Collapses a record that is loaded in the view.
         *
         * If an animated collapse or expand of the record is in progress, this call will be ignored.
         * @param {Ext.data.Model} record The record to collapse
         * @param {Boolean} [deep] True to collapse nodes all the way up the tree hierarchy.
         * @param {Function} [callback] The function to run after the collapse is completed
         * @param {Object} [scope] The scope of the callback function.
         */
        collapse: function(record, deep, callback, scope) {
            var me = this,
                doAnimate = !!me.animate;

            // Block toggling if we are already animating an expand or collapse operation.
            if (!doAnimate || !record.isExpandingOrCollapsing) {
                if (!record.isLeaf()) {
                    record.isExpandingOrCollapsing = doAnimate;
                }
                return record.collapse(deep, callback, scope);
            }
        },

        /**
         * Expands a record that is loaded in the view.
         *
         * If an animated collapse or expand of the record is in progress, this call will be ignored.
         * @param {Ext.data.Model} record The record to expand
         * @param {Boolean} [deep] True to expand nodes all the way down the tree hierarchy.
         * @param {Function} [callback] The function to run after the expand is completed
         * @param {Object} [scope] The scope of the callback function.
         */
        expand: function(record, deep, callback, scope) {
            var me = this,
                doAnimate = !!me.animate,
                result;

            // Block toggling if we are already animating an expand or collapse operation.
            if (!doAnimate || !record.isExpandingOrCollapsing) {
                if (!record.isLeaf()) {
                    record.isExpandingOrCollapsing = doAnimate;
                }

                // Need to suspend layouts because the expand process makes multiple changes to the UI
                // in addition to inserting new nodes. Folder and elbow images have to change, so we
                // need to coalesce all resulting layouts.
                //Ext.suspendLayouts();
                result = record.expand(deep, callback, scope);
                //Ext.resumeLayouts(true);
                return result;
            }
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
            return Base.prototype.onItemClick.apply(this,arguments);
        },
        onCellClick:function(cell, cellIndex, record, row, rowIndex, e){
          var me = this,
            column = e.position.column,
            checkedState;

            // We're only interested in clicks in the tree column
            if (column.isTreeColumn){
              if (e.getTarget(me.expanderSelector, cell) && record.isExpandable()) {
                // Ensure focus is on the clicked cell so that if this causes a refresh,
                // focus restoration does not scroll back to the previouslty focused position.
                // onCellClick is called *befor* cellclick is fired which is what changes focus position.
                // TODO: connect directly from View's event processing to NavigationModel without relying on events.
                //me.getNavigationModel().setPosition(e.position);
                me.toggle(record, e.ctrlKey);

                // So that we know later to stop event propagation by returning false from the NavigationModel
                // TODO: when NavigationModel is directly hooked up to be called *before* the event sequence
                // This flag will not be necessary.
                e.nodeToggled = true;
            }
            }
        },

        /**
         * Toggles a record between expanded and collapsed.
         *
         * If an animated collapse or expand of the record is in progress, this call will be ignored.
         * @param {Ext.data.Model} record
         * @param {Boolean} [deep] True to collapse nodes all the way up the tree hierarchy.
         * @param {Function} [callback] The function to run after the expand/collapse is completed
         * @param {Object} [scope] The scope of the callback function.
         */
        toggle: function(record, deep, callback, scope) {
            if (record.isExpanded()) {
                this.collapse(record, deep, callback, scope);
            } else {
                this.expand(record, deep, callback, scope);
            }
        }
    })
}))