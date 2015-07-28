/**
 * @author nttdocomo
 */
define(function(require) {
	var Base = require("./base");
	return Base.extend({
		tpl:'<span class="help-inline"><%=error%></span>',
	});
});
