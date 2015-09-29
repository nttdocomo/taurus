(function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['../view/base'], function(Base) {
				return factory(Base);
			});
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('../view/base'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('../view/base'));
	}
}(this, function(Base) {
	return Base.extend({
		
	})
}));