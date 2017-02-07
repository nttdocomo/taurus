/*global define module QUnit*/
var ConfigClass = function(){}
ConfigClass.prototype = {
  parentName: 'aa',
  childEls:{
    'bodyEl':'.bodyEl'
  }
}
console.log(ConfigClass.prototype)
console.log(new ConfigClass)
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
      var ParentClass = Base.extend({
        prop: 1,
        config: {
          parentName: 'aa',
          childEls:{
            'bodyEl':'.bodyEl'
          }
        }
      })
      var ChildClass = ParentClass.extend({
        prop: 2,
        childEls:{
          'inputEl':'.inputEl',
          'bodyEl':'#bodyEl'
        },
        config: {
          childName: 'bbb'
        }
      })
      assert.equal(ParentClass.prototype.prop, 1, 'new class prototype has attribute prop')
      var parentClass = new ParentClass({
        instantceProp:1
      })
      assert.strictEqual(typeof parentClass.getParentName, 'function', 'this instance has a getConfigName method')
      assert.strictEqual(typeof parentClass.setParentName, 'function', 'this instance has a setConfigName method')
      assert.strictEqual(parentClass.instantceProp, 1, 'this instance has a setConfigName method')
      assert.strictEqual(parentClass.getParentName(), 'aa', 'the get method return the correct value')
      var childEls = parentClass.getChildEls()
      assert.strictEqual('bodyEl' in childEls && childEls.hasOwnProperty('bodyEl'), true, '判断bodyEl是原型属性而不是对象自身属性')
      var childClass = new ChildClass()
      childEls = childClass.getChildEls()
      assert.strictEqual('inputEl' in childEls && childEls.hasOwnProperty('inputEl'), true, '判断inputEl是原型属性而不是对象自身属性')
      assert.strictEqual('bodyEl' in childEls, true, '判断inputEl包含bodyEl属性')
      assert.strictEqual(childEls.bodyEl, '#bodyEl', '判断childClass里的bodyEl取的值是不是自己配置的')
    })
  }
  return {run: run}
}))
