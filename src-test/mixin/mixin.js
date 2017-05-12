"use strict";
(function (root, factory) {
  if(typeof define === "function"){
    if(define.amd) {
      // Now we're wrapping the factory and assigning the return
      // value to the root (window) and returning it as well to
      // the AMD loader.
      define(['../../src/backbone','../../src/backbone-super','../../src/class'],function(Backbone, inherits){
        return (root.Class = factory(Backbone,_,Text));
      });
    }
    if(define.cmd){
      define(function(require, exports, module){
        return (root.Class = factory(require('../../src/backbone'),require('../../src/backbone-super'),require('../../src/class')));
      })
    }
  } else if(typeof module === "object" && module.exports) {
    // I've not encountered a need for this yet, since I haven't
    // run into a scenario where plain modules depend on CommonJS
    // *and* I happen to be loading in a CJS browser environment
    // but I'm including it for the sake of being thorough
    module.exports = (root.Class = factory(require('../../src/backbone'),require('../../src/backbone-super'),require('../../src/class')));
  } else {
    root.Class = factory();
  }
}(this, function(Backbone, inherits, Class) {
  var Mixin1 = function(superclass) {
    return function(_superclass){
      return inherits(_superclass, {
        foo: function(){
          this.super()
          return 2
        }
      })
    }(superclass)
  }
  var Klass = inherits(Mixin1(Class))
  var run = function() {
    QUnit.test("Mixin", function( assert ) {
      assert.equal((new Klass()).foo(), 2, "实例调用了Mixin1的foo方法" );
    });
  };
  return {run: run}
}))
