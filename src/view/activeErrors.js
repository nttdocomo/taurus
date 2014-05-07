/**
 * @author nttdocomo
 */
define(function(require) {
	var Base = require("./base"),ActiveError = require("./activeError");
	return taurus.view("taurus.views.ActiveErrors", Base.extend({
		tpl:'<%=errors%>',
		tagName:'span',
		className:'help-block',
		html:function(errors){
			var me = this;
			return Base.prototype.html.apply(this,[{
				errors:errors.join('')
			}])
		}
	}));
});
