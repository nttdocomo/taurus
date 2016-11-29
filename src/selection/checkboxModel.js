(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(['class'],function(Backbone){
          return (root.Class = factory(Backbone));
        });
    }
    if(define.cmd){
        define(function(require, exports, module){
            return (root.Class = factory(require('class')));
        })
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (root.Class = factory(require('class')));
    } else {
        root.Class = factory();
    }
}(this, function(Class) {
    var CheckboxModel = Class.extend({
        constructor: function() {
            var me = this;
            me._super.apply(me, arguments);   
            
            // If mode is single and showHeaderCheck isn't explicity set to
            // true, hide it.
            if (me.mode === 'SINGLE' && me.showHeaderCheckbox !== true) {
                me.showHeaderCheckbox = false;
            }
        }
    })
    return CheckboxModel
}))