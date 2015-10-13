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
}(this, function(Base) {
	return Base.extend({
		tpl:'<a href="#"><%=displayField%></a>',
		tagName:'li',
		renderHtml:function(){
			var json = this.model.toJSON();
			json.displayField = json[this.displayField];
			delete json[this.displayField];
			return Base.prototype.html.call(this,json)
		}
	});
}));