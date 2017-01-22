"use strict";
(function (root, factory) {
  if(typeof define === "function"){
    if(define.amd) {
      // Now we're wrapping the factory and assigning the return
      // value to the root (window) and returning it as well to
      // the AMD loader.
      define(['../../../src/backbone','../../../src/underscore','../../../src/classic/form/field/text'],function(Backbone,_,Text){
        return (root.Class = factory(Backbone,_,Text));
      });
    }
    if(define.cmd){
      define(function(require, exports, module){
        return (root.Class = factory(require('../../../src/backbone'),require('../../../src/underscore'),require('../../../src/classic/form/field/text')));
      })
    }
  } else if(typeof module === "object" && module.exports) {
    // I've not encountered a need for this yet, since I haven't
    // run into a scenario where plain modules depend on CommonJS
    // *and* I happen to be loading in a CJS browser environment
    // but I'm including it for the sake of being thorough
    module.exports = (root.Class = factory(require('../../../src/backbone'),require('../../../src/underscore'),require('../../../src/classic/form/field/text')));
  } else {
    root.Class = factory();
  }
}(this, function(Backbone,_,Text) {
  var run = function() {
    QUnit.test("Text", function( assert ) {
      var $el = $('<div></div>')
      var text = new Text({
        renderTo:$el,
        name:'aa',
        regex:/^\d+$/,
        regexText:'regexText'
      })
      assert.equal(text.isValid(), true, "初始化完了之后，text的allowBlank默认为true，值为空，校验通过" );
      text.allowBlank = false;
      assert.equal(text.isValid(), false, "将text的allowBlank重置为false，值为空，校验失败" );
      text.setValue('false');
      assert.equal(text.getValue(), 'false', "通过setValue方法将text的值设为'false'" );
      assert.equal(text.getSubmitValue(), 'false', "通过getSubmitValue获得的值与getValue相等" );
      assert.strictEqual(text.isValid(), false, "test的值不是有效的值" );
      assert.strictEqual(text.activeErrors.length, 1, "text应该有一个错误" );
      assert.strictEqual(text.activeErrors[0], 'regexText', "并且这个错误的值等于regexText" );
    });
  };
  return {run: run}
}));
