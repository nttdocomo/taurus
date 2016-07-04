/**
 * @author nttdocomo
 */
 (function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['./container','backbone'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
                return factory(require('./container'),require('backbone'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('./container'),require('backbone'));
	}
}(this, function(Container,Backbone){
	return Container.extend({
        type: 'hbox',
        vertical: false
	});
}));
