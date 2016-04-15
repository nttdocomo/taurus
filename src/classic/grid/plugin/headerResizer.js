/**
 * @author nttdocomo
 */
 (function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['../../plugin/abstract'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('../../plugin/abstract'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('../../plugin/abstract'));
	}
}(this, function(Abstract){
	return Abstract.extend({
		minColWidth: 40
	})
}));