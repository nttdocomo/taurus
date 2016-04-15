/**
 * @author nttdocomo
 */
 (function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['../view/base'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('../view/base'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('../view/base'));
	}
}(this, function(Base){
	return taurus.view('taurus.spinner.Wave',Base.extend({
		tpl:'<div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div>',
		className:'spinner wave'
	}))
}));