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
            assert.expect(5);
            var done = assert.async(5);
			var $el = $('<div></div>'),toolTip = new ToolTip({
                target: $el,
                showDelay:5,
                hideDelay: 1,
                text: 'My Tip Title'
            }),
            test1 = function(){
                var event = $.Event('mouseenter',{
                    target : $el.get(0)
                });
                $el.trigger(event);
                setTimeout(function() {
                    assert.equal(toolTip.$el.is(':hidden'), false, "到了延迟显示时间，显示toolTip" );
                    done();
                    test2();
                },5);
            },
            test2 = function(){
                var event = $.Event('mouseleave',{
                    target : $el.get(0)
                })
                $el.trigger(event);
                setTimeout(function() {
                    assert.equal(toolTip.$el.is(':hidden'), true, "鼠标离开$el上时，隐藏toolTip" );
                    done();
                    test3();
                },1);
                /*setTimeout(function() {
                    assert.equal(toolTip.$el.is(':hidden'), false, "鼠标离开$el上时，还没到延迟显示时间，toolTip还是显示" );
                    done();
                },1);*/
            },
            test3 = function(){
                var event = $.Event('mouseenter',{
                    target : $el.get(0)
                })
                $el.trigger(event);
                setTimeout(function() {
                    assert.equal(toolTip.$el.is(':hidden'), false, "到了延迟显示时间，显示toolTip" );
                    done();
                    test4()
                },5);
                setTimeout(function() {
                    assert.equal(toolTip.$el.is(':hidden'), true, "鼠标移到$el上时，还没到延迟显示时间，toolTip还是隐藏" );
                    done();
                },1);
            },
            test4 = function(){
                var event = $.Event('mousedown',{
                    target : $el.get(0)
                })
                $(document).trigger(event);
                setTimeout(function() {
                    assert.equal(toolTip.$el.is(':hidden'), true, "鼠标在文档任意区域按下时，隐藏toolTip" );
                    done();
                },1);
            };
            test1();
		});
    };
    return {run: run}
}));
