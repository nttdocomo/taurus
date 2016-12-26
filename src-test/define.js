/*global define module QUnit*/
'use strict';
(function (root, factory) {
  if (typeof define === 'function') {
    if (define.amd) {
      // Now we're wrapping the factory and assigning the return
      // value to the root (window) and returning it as well to
      // the AMD loader.
      define(['../src/backbone', '../src/define'], function (Backbone, define) {
        return (root.Class = factory(Backbone, define))
      })
    }
    if (define.cmd) {
      define(function (require, exports, module) {
        return (root.Class = factory(require('../src/backbone'), require('../src/define')))
      })
    }
  } else if (typeof module === 'object' && module.exports) {
    // I've not encountered a need for this yet, since I haven't
    // run into a scenario where plain modules depend on CommonJS
    // *and* I happen to be loading in a CJS browser environment
    // but I'm including it for the sake of being thorough
    module.exports = (root.Class = factory(require('../src/backbone'), require('../src/define')))
  } else {
    root.Class = factory()
  }
}(this, function (Backbone, define) {
  var run = function () {
    QUnit.test('define', function (assert) {
      var NewClass = define(Backbone.View, {
        prop: 1,
        config: {
          configName: 'aa'
        }
      })
      assert.equal(NewClass.prototype.prop, 1, 'new class prototype has attribute prop')
    })
  }
  return {run: run}
}))
