"use strict";
(function (root, factory) {
  if(typeof define === "function"){
    if(define.amd) {
      // Now we're wrapping the factory and assigning the return
      // value to the root (window) and returning it as well to
      // the AMD loader.
      define(['../src/base', '../src/configurator'],function(Backbone, inherits){
        return (root.Class = factory(Backbone,_,Text));
      });
    }
    if(define.cmd){
      define(function(require, exports, module){
        return (root.Class = factory(require('../src/base'), require('../src/configurator')))
      })
    }
  } else if(typeof module === "object" && module.exports) {
    // I've not encountered a need for this yet, since I haven't
    // run into a scenario where plain modules depend on CommonJS
    // *and* I happen to be loading in a CJS browser environment
    // but I'm including it for the sake of being thorough
    module.exports = (root.Class = factory(require('../src/base'), require('../src/configurator')));
  } else {
    root.Class = factory();
  }
}(this, function(Base, Configurator) {
  var A = Base.extend({
    config:{
      a:'1'
    }
  })
  //console.log(A.$config instanceof Configurator)
  var run = function() {
    QUnit.test("Configurator", function( assert ) {
      assert.strictEqual(A.$config instanceof Configurator, true, "类的$config是Configurator的实例" );
    });
  };
  return {run: run}
}))
