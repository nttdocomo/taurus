/**
 * @author nttdocomo
 */
 (function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['./menu','../view/base','underscore'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('./menu'),require('../view/base'),require('underscore'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('./menu'),require('../view/base'),require('underscore'));
	}
}(this, function(Menu,Base,_) {
	return Menu.extend({
		isNav:true,
		className:'nav navbar-nav',
		initialize:function(){
	        Menu.prototype.initialize.apply(this,arguments);
	        $(document).on('mousedown',_.bind(this.deactivateActiveItem,this))
		}
	});
}));
