/**
 * @author nttdocomo
 */
 (function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['./base'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('./base'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('./base'));
	}
}(this, function(Base){
	return Base.extend({
		inputType : 'hidden',
		initialize:function(){
			Base.prototype.initialize.apply(this,arguments);
			this.$el.addClass('hide')
		}
	})
}));