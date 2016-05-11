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
		tagName:'thead',
		tpl:'<tr><%=head%></tr>',
		renderHtml:function(){
			var html = [];
			_.each(this.items,function(column){
				html.push(_.template('<th><%=text%></th>',{
					width:column.text.width,
					text:column.text
				}))
			});
			return Base.prototype.renderHtml.apply(this,[{head:html.join('')}])
		}
	})
}));