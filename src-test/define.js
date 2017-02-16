/*global define module QUnit*/
'use strict';
(function (root, factory) {
  if (typeof define === 'function') {
    if (define.amd) {
      // Now we're wrapping the factory and assigning the return
      // value to the root (window) and returning it as well to
      // the AMD loader.
      define(['../src/backbone', '../src/underscore', '../src/backbone-super'], function (Backbone, define) {
        return (root.Class = factory(Backbone, define))
      })
    }
    if (define.cmd) {
      define(function (require, exports, module) {
        return (root.Class = factory(require('../src/backbone'), require('../src/underscore'), require('../src/backbone-super')))
      })
    }
  } else if (typeof module === 'object' && module.exports) {
    // I've not encountered a need for this yet, since I haven't
    // run into a scenario where plain modules depend on CommonJS
    // *and* I happen to be loading in a CJS browser environment
    // but I'm including it for the sake of being thorough
    module.exports = (root.Class = factory(require('../src/backbone'), require('../src/underscore'), require('../src/backbone-super')))
  } else {
    root.Class = factory()
  }
}(this, function (Backbone, _) {
  var run = function () {
    QUnit.test('define', function (assert) {
      var ParentClass = Backbone.View.extend({
        constructor:function(config){
          Backbone.View.apply(this, arguments)
          this.initConfig(config)
        },
        prop: 1,
        config: {
          parentName: 'parent',
          childEls:{
            'bodyEl':'.bodyEl'
          }
        }
      })
      var FirstChildClass = ParentClass.extend({
        prop: 2,
        childEls:{
          'inputEl':'.inputEl',
          'bodyEl':'#bodyEl'
        },
        config: {
          childName: 'first'
        }
      })
      var SecondChildClass = ParentClass.extend({
        prop: 2,
        childEls:{
          'inputEl':'.inputEl'
        },
        config: {
          childName: 'second'
        }
      })
      assert.equal(ParentClass.prototype.prop, 1, 'new class prototype has attribute prop')
      var parentClass = new ParentClass({
        instantceProp:1
      })
      assert.strictEqual(typeof parentClass.getParentName, 'function', 'this instance has a getConfigName method')
      assert.strictEqual(typeof parentClass.setParentName, 'function', 'this instance has a setConfigName method')
      assert.strictEqual(parentClass.instantceProp, 1, 'this instance has a setConfigName method')
      assert.strictEqual(parentClass.getParentName(), 'parent', 'the get method return the correct value')
      var childEls = parentClass.getChildEls()
      assert.strictEqual('bodyEl' in childEls && childEls.hasOwnProperty('bodyEl'), true, '判断bodyEl是原型属性而不是对象自身属性')
      var childClass = new FirstChildClass()
      childEls = childClass.getChildEls()
      assert.strictEqual(childClass.getChildName(), 'first', 'the get method return the correct value')
      assert.strictEqual('inputEl' in childEls && childEls.hasOwnProperty('inputEl'), true, '判断inputEl是原型属性而不是对象自身属性')
      assert.strictEqual('bodyEl' in childEls && childEls.hasOwnProperty('bodyEl'), true, '判断inputEl包含bodyEl属性')
      assert.strictEqual(childEls.bodyEl, '#bodyEl', '判断childClass里的bodyEl取的值是不是自己配置的')
      var childClass = new SecondChildClass()
      childEls = childClass.getChildEls()
      assert.strictEqual(childClass.getChildName(), 'second', 'the get method return the correct value')
      assert.strictEqual('inputEl' in childEls && childEls.hasOwnProperty('inputEl'), true, '判断inputEl是原型属性而不是对象自身属性')
      assert.strictEqual('bodyEl' in childEls && childEls.hasOwnProperty('bodyEl'), true, '判断inputEl包含bodyEl属性')
    })
  }
  return {run: run}
}))
