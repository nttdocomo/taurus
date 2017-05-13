/**
 * @author nttdocomo
 */
 (function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory();
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory();
	}
}(this, function(){
  var mix = function (superclass) {
    return new MixinBuilder(superclass)
  }
  var MixinBuilder = function(superclass){
    this.superclass = superclass
  }
  MixinBuilder.prototype.with = function(){
    return Array.prototype.slice.call(arguments).reduce(function (c, mixin) {
      return mixin(c)
    }, this.superclass)
  }
  return mix
}))
