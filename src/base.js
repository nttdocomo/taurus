;(function (root, factory) {
  if (typeof define === 'function') {
    // Now we're wrapping the factory and assigning the return
    // value to the root (window) and returning it as well to
    // the AMD loader.
    if (define.amd) {
      define(['./super', './configurator', './underscore'], function () {
        return (root.Class = factory())
      })
    }
    if (define.cmd) {
      define(function (require, exports, module) {
        return (root.Class = factory(require('./super'), require('./configurator'), require('./underscore')))
      })
    }
  } else if (typeof module === 'object' && module.exports) {
    // I've not encountered a need for this yet, since I haven't
    // run into a scenario where plain modules depend on CommonJS
    // *and* I happen to be loading in a CJS browser environment
    // but I'm including it for the sake of being thorough
    module.exports = (root.Class = factory(require('./super'), require('./configurator'), require('./underscore')))
  } else {
    root.Class = factory()
  }
}(this, function (inherits, Configurator, _) {
  var Base = function () {}
  Base.extend = function (protoProps, classProps) {
    var child = inherits(this, protoProps, classProps)
    child.extend = this.extend
    child.getConfigurator()
    return child
  }
  _.extend(Base, {
    getConfigurator: function(){
      return this.$config || new Configurator(this);
    }
  })
  return Base
}))
