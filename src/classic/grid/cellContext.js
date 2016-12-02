(function (root, factory) {
    if(typeof define === "function"){
        if(define.amd) {
            // Now we're wrapping the factory and assigning the return
            // value to the root (window) and returning it as well to
            // the AMD loader.
            define(['class'],function(Table){
              return (root.CellContext = factory(Table));
            });
        }
        if(define.cmd){
            define(function(require, exports, module){
                return (root.CellContext = factory(require('class')));
            })
        }
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (root.CellContext = factory(require('class')));
    }
}(this, function(Class) {
    return Class.extend({
        constructor: function(view) {
            this.view = view;
        },
        setAll:function(view, recordIndex, columnIndex, record, columnHeader){
            var me = this;

            me.view = view;
            me.rowIdx = recordIndex;
            me.colIdx = columnIndex;
            me.record = record;
            me.column = columnHeader;
            return me;
        }
    })
}))
