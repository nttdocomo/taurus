(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(['../grid/column/column'],function(Table){
          return (root.Class = factory(Table));
        });
    }
    if(define.cmd){
        define(function(require, exports, module){
            return (root.Class = factory(require('../grid/column/column')));
        })
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (root.Class = factory(require('../grid/column/column')));
    } else {
        root.Class = factory();
    }
}(this, function(Base) {
    return Base.extend({
        innerCls: 'grid-cell-inner-treecolumn',
        cellTpl: ['<div class="{childCls} {elbowCls}-img {elbowCls}<%if(expandable){%>-plus <%=expanderCls%><%}%>" role="presentation"></div>'].join(''),
        initComponent: function() {
            var me = this;

            me.setupRenderer();

            // This always uses its own renderer.
            // Any custom renderer is used as an inner renderer to produce the text node of a tree cell.
            /*me.innerRenderer = me.renderer;*/

            me.renderer = me.treeRenderer;
            //me.scope = me;

            Base.prototype.initComponent.apply(this,arguments);
            
            //me.hasCustomRenderer = me.innerRenderer && me.innerRenderer.length > 1;
        },
        treeRenderer:function(value, metaData, record, rowIdx, colIdx, store, view){
            var me = this,
            cls = record.get('cls'),
            rendererData;

            // The initial render will inject the cls into the TD's attributes.
            // If cls is ever *changed*, then the full rendering path is followed.
            if (metaData && cls) {
                metaData.tdCls += ' ' + cls;
            }

            rendererData = me.initTemplateRendererData(value, metaData, record, rowIdx, colIdx, store, view);
            
            return me.getTpl('cellTpl').apply(rendererData);
        },
    
        initTemplateRendererData: function(value, metaData, record, rowIdx, colIdx, store, view) {
            var me = this,
                innerRenderer = me.innerRenderer,
                data = record.attributes,
                parent = record.parentNode,
                rootVisible = view.rootVisible,
                lines = [],
                parentData;
            
            while (parent && (rootVisible || parent.data.depth > 0)) {
                parentData = parent.data;
                lines[rootVisible ? parentData.depth : parentData.depth - 1] =
                        parentData.isLast ? 0 : 1;
                parent = parent.parentNode;
            }
            
            return {
                record: record,
                baseIconCls: me.iconCls,
                customIconCls: (data.icon || data.iconCls) ? me.customIconCls : '',
                iconCls: data.iconCls,
                icon: data.icon,
                checkboxCls: me.checkboxCls,
                checked: data.checked,
                elbowCls: me.elbowCls,
                expanderCls: me.expanderCls,
                textCls: me.textCls,
                leaf: data.leaf,
                expandable: record.isExpandable(),
                expanded: data.expanded,
                isLast: record.isLastVisible(),
                blankUrl: Ext.BLANK_IMAGE_URL,
                href: data.href,
                hrefTarget: data.hrefTarget,
                lines: lines,
                metaData: metaData,
                // subclasses or overrides can implement a getChildCls() method, which can
                // return an extra class to add to all of the cell's child elements (icon,
                // expander, elbow, checkbox).  This is used by the rtl override to add the
                // "x-rtl" class to these elements.
                childCls: me.getChildCls ? me.getChildCls() + ' ' : '',
                value: innerRenderer ? innerRenderer.apply(me.rendererScope, arguments) : value
            };
        }
    })
}))