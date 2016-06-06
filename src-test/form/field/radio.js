"use strict";
(function (root, factory) {
    if(typeof define === "function"){
        if(define.amd) {
            // Now we're wrapping the factory and assigning the return
            // value to the root (window) and returning it as well to
            // the AMD loader.
            define(['../../../src/backbone','../../../src/underscore','../../../src/classic/form/field/radio'],function(Backbone,_,Radio){
              return (root.Class = factory(Base,StoreHolder));
            });
        }
        if(define.cmd){
            define(function(require, exports, module){
                return (root.Class = factory(require('../../../src/backbone'),require('../../../src/underscore'),require('../../../src/classic/form/field/radio')));
            })
        }
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (root.Class = factory(require('../../../src/backbone'),require('../../../src/underscore'),require('../../../src/classic/form/field/radio')));
    } else {
        root.Class = factory();
    }
}(this, function(Backbone,_,Radio) {
    var run = function() {
		QUnit.test("Radio", function( assert ) {
			var $el = $('<div></div>'),radio1 = new Radio({
				renderTo:$el,
				name:'aa',
				value:'bb'
			}),radio2 = new Radio({
				renderTo:$el,
				name:'aa',
				value:'cc'
			})
			assert.equal(radio1.checked, false, "初始化完了之后，radio应该是未勾选的" );
			var event = $.Event('change',{
				target : radio1.inputEl.get(0)
			});
			radio1.$el.trigger(event)
			assert.equal(radio1.checked, true, "点击单选框之后，勾选" );
			event = $.Event('change',{
				target : radio2.inputEl.get(0)
			});
			radio2.$el.trigger(event)
			assert.equal(radio2.checked, true, "点击单选框之后，勾选" );
			assert.equal(radio1.checked, false, "点击单选框之后，勾选" );
		});
    };
    return {run: run}
}));
