;(function (root, factory) {
  if (typeof define === 'function') {
    if (define.amd) {
      // Now we're wrapping the factory and assigning the return
      // value to the root (window) and returning it as well to
      // the AMD loader.
      define(['./navigationModel', 'backbone', 'underscore'], function (Base, StoreHolder, _) {
        return (root.Class = factory(Base, StoreHolder))
      })
    }
    if (define.cmd) {
      define(function (require, exports, module) {
        return (root.Class = factory(require('./navigationModel'), require('backbone'), require('underscore')))
      })
    }
  } else if (typeof module === 'object' && module.exports) {
    // I've not encountered a need for this yet, since I haven't
    // run into a scenario where plain modules depend on CommonJS
    // *and* I happen to be loading in a CJS browser environment
    // but I'm including it for the sake of being thorough
    module.exports = (root.Class = factory(require('./navigationModel'), require('backbone'), require('underscore')))
  } else {
    root.Class = factory()
  }
}(this, function (NavigationModel, Backbone, _) {
  return NavigationModel.extend({})
}))
