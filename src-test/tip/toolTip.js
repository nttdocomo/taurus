"use strict";
(function (root, factory) {
    if(typeof define === "function"){
        if(define.amd) {
            // Now we're wrapping the factory and assigning the return
            // value to the root (window) and returning it as well to
            // the AMD loader.
            define(['../../src/backbone','../../src/underscore','../../src/classic/tip/toolTip'],function(Backbone,_,ToolTip){
              return (root.Class = factory(Backbone,_,Text));
            });
        }
        if(define.cmd){
            define(function(require, exports, module){
                return (root.Class = factory(require('../../src/backbone'),require('../../src/underscore'),require('../../src/classic/tip/toolTip')));
            })
        }
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (root.Class = factory(require('../../src/backbone'),require('../../src/underscore'),require('../../src/classic/tip/toolTip')));
    } else {
        root.Class = factory();
    }
}(this, function(Backbone,_,ToolTip) {
    var run = function() {
		QUnit.test("ToolTip", function( assert ) {
            assert.expect( 3 );
            var done = assert.async(3);
			var $el = $('<div></div>'),toolTip = new ToolTip({
                target: $el,
                showDelay:5,
                text: 'My Tip Title'
            }),event = $.Event('mouseenter',{
                target : $el.get(0)
            }),
            test1 = function(){
                $el.trigger(event);
                setTimeout(function() {
                    assert.equal(toolTip.$el.is(':hidden'), false, "到了延迟显示时间，显示toolTip" );
                    done();
                },4);
                setTimeout(function() {
                    assert.equal(toolTip.$el.is(':visible'), false, "鼠标移到$el上时，还没到延迟显示时间，toolTip还是隐藏" );
                    done();
                    test2()
                },1);
            },
            test2 = function(){
                event = $.Event('mouseleave',{
                    target : $el.get(0)
                })
                $el.trigger(event);
                setTimeout(function() {
                    assert.equal(toolTip.$el.is(':hidden'), true, "鼠标离开$el上时，隐藏toolTip" );
                    done();
                },1);
            };
            test1();
		});
    };
    return {run: run}
}));
