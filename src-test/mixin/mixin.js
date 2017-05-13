"use strict";
(function (root, factory) {
  if(typeof define === "function"){
    if(define.amd) {
      // Now we're wrapping the factory and assigning the return
      // value to the root (window) and returning it as well to
      // the AMD loader.
      define(['../../src/class'],function(Backbone, inherits){
        return (root.Class = factory(Backbone,_,Text));
      });
    }
    if(define.cmd){
      define(function(require, exports, module){
        return (root.Class = factory(require('../../src/class')));
      })
    }
  } else if(typeof module === "object" && module.exports) {
    // I've not encountered a need for this yet, since I haven't
    // run into a scenario where plain modules depend on CommonJS
    // *and* I happen to be loading in a CJS browser environment
    // but I'm including it for the sake of being thorough
    module.exports = (root.Class = factory(require('../../src/class')));
  } else {
    root.Class = factory();
  }
}(this, function(Class) {
  var Mixin1 = function(superclass) {
    return superclass.extend({
      foo: function(){
        var value = this._super()
        return value + 1
      }
    })
  }
  var S = Class.extend({
    foo: function(){
      return 1
    }
  })
  var C = Mixin1(S).extend({
    foo: function(){
      var value = this._super()
      return value + 1
    }
  })
  var mix = function (superclass) {
    return new MixinBuilder(superclass)
  }
  var MixinBuilder = function(superclass){
    this.superclass = superclass
  }
  MixinBuilder.prototype.with = function(){
    return Array.prototype.slice.call(arguments).reduce(function (c, mixin) {
      return mixin(c)
    }, this.superclass)
  }
  var MyClass = mix(S).with(Mixin1).extend({
    foo: function(){
      var value = this._super()
      return value + 2
    }
  })
  var run = function() {
    QUnit.test("Mixin", function( assert ) {
      assert.equal((new C()).foo(), 3, "实例调用了Mixin1的foo方法" );
    });
    QUnit.test("MixinBuilder", function( assert ) {
      assert.equal((new MyClass()).foo(), 4, "实例调用了Mixin1的foo方法" );
    });
  };
  return {run: run}
}))
