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
		tpl:'<%=errors%>',
		tagName:'span',
		className:'help-block',
		renderHtml:function(errors){
			var me = this;
			return Base.prototype.renderHtml.apply(this,[{
				errors:errors.join('')
			}])
		}
	});
}));