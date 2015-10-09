/**
 * @author nttdocomo
 */
 (function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['../i18n'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('../i18n'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('../i18n'));
	}
}(this, function(i18n){
	return new i18n({
		locales:[[
		'zh-cn',{
			"Page %d of %d" : "%2$d页中的第%1$d页",
			"Cancel" : "取消",
			"Confirm" : "确定"
		}]]
	});
}));