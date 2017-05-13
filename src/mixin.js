/**
 * @author nttdocomo
 */
 (function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['./backbone', 'class', './backbone-super'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('./backbone'), require('class'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('./backbone'), require('class'));
	}
}(this, function(){
	var mixin = function(protoProps, classProps) {
		return function(superclass){
      return superclass.extend(protoProps, classProps)
    }
  }
}))
