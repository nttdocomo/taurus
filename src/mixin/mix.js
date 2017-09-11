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
	var MixinBuilder = function(superclass){
    this.superclass = superclass
  }
  MixinBuilder.prototype.with = function(){
    return Array.prototype.slice.call(arguments).reduce(function (c, mixin) {
      return mixin(c)
    }, this.superclass)
  }
  return function (superclass) {
	  return new MixinBuilder(superclass)
	}
}))
