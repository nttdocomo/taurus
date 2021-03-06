/**
 * Helper class for creating mixins that provides possibility to specify dependency for them.
 * @module Mixin
 * @version 1.0.1
 */
;(function (root, factory) {
  if (typeof define === 'function') {
    if(define.amd){
      define(factory)
    }
    if(define.cmd){
      define(factory)
    }
  }
}(this, function () {
  return function (config) {
    return function (superclass) {
      return superclass.extend(config)
    }
  }
}))
