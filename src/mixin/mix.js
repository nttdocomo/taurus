/**
 * Helper class for creating mixins that provides possibility to specify dependency for them.
 * @module Mixin
 * @version 1.0.1
 */
;(function (root, factory) {
  if (typeof define === 'function') {
    if(define.amd){
      define(['underscore'], factory)
    }
    if(define.cmd){
      define(function(require){
        return factory(require('underscore'))
      })
    }
  }
}(this, function (_) {
	var MixinBuilder = function(superclass){
    this.superclass = superclass
  }
  MixinBuilder.prototype.with = function(){
    return _.reduce(Array.prototype.slice.call(arguments), function (c, mixin) {
      return mixin(c)
    }, this.superclass)
  }
  return function (superclass) {
	  return new MixinBuilder(superclass)
	}
}))
