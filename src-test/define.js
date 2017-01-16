/*global define module QUnit*/
'use strict';
(function (root, factory) {
  if (typeof define === 'function') {
    if (define.amd) {
      // Now we're wrapping the factory and assigning the return
      // value to the root (window) and returning it as well to
      // the AMD loader.
      define(['../src/backbone', '../src/underscore', '../src/define', '../src/mixin/addConfig', '../src/mixin/initConfig'], function (Backbone, define) {
        return (root.Class = factory(Backbone, define))
      })
    }
    if (define.cmd) {
      define(function (require, exports, module) {
        return (root.Class = factory(require('../src/backbone'), require('../src/underscore'), require('../src/define'), require('../src/mixin/addConfig'), require('../src/mixin/initConfig')))
      })
    }
  } else if (typeof module === 'object' && module.exports) {
    // I've not encountered a need for this yet, since I haven't
    // run into a scenario where plain modules depend on CommonJS
    // *and* I happen to be loading in a CJS browser environment
    // but I'm including it for the sake of being thorough
    module.exports = (root.Class = factory(require('../src/backbone'), require('../src/underscore'), require('../src/define'), require('../src/mixin/addConfig'), require('../src/mixin/initConfig')))
  } else {
    root.Class = factory()
  }
}(this, function (Backbone, _, define, addConfig, initConfig) {
  var run = function () {
    QUnit.test('define', function (assert) {
      var Base = Backbone.View.extend(_.extend({
        initialize: function (config) {
          this.initialConfig = config
          this.initConfig(this.initialConfig)
          this.initialized = true
        },
        beforeInitConfig: function () {}
      }, initConfig), addConfig)
      var ParentClass = define(Base, {
        prop: 1,
        config: {
          parentName: 'aa',
          childEls:{
            'bodyEl':'.bodyEl'
          }
        }
      })
      var ChildClass = define(ParentClass, {
        prop: 2,
        config: {
          childName: 'bbb',
          childEls:{
            'inputEl':'.inputEl'
          }
        }
      })
      assert.equal(ParentClass.prototype.prop, 1, 'new class prototype has attribute prop')
      var parentClass = new ParentClass()
      assert.strictEqual(typeof parentClass.getParentName, 'function', 'this instance has a getConfigName method')
      assert.strictEqual(typeof parentClass.setParentName, 'function', 'this instance has a setConfigName method')
      assert.strictEqual(parentClass.getParentName(), 'aa', 'the get method return the correct value')
      var childClass = new ChildClass()
      console.log(childClass.getChildEls())
    })
  }
  return {run: run}
}))
