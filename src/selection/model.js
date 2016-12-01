;(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // Now we're wrapping the factory and assigning the return
    // value to the root (window) and returning it as well to
    // the AMD loader.
    define(['class', 'backbone', 'underscore'], function (Backbone) {
      return (root.Class = factory(Backbone))
    })
  }
  if (define.cmd) {
    define(function (require, exports, module) {
      return (root.Class = factory(require('class'), require('backbone'), require('underscore')))
    })
  } else if (typeof module === 'object' && module.exports) {
    // I've not encountered a need for this yet, since I haven't
    // run into a scenario where plain modules depend on CommonJS
    // *and* I happen to be loading in a CJS browser environment
    // but I'm including it for the sake of being thorough
    module.exports = (root.Class = factory(require('class'), require('backbone'), require('underscore')))
  } else {
    root.Class = factory()
  }
}(this, function (Class, Backbone, _) {
  var Model = Class.extend({
    beforeViewRender: function (view) {
      if (!this.views) {
        this.views = []
      }
      this.views.push(view)
    },
    onNavigate: function(){
      console.log('onNavigate')
    }
  }).extend(Backbone.Events)
  return Model
}))
