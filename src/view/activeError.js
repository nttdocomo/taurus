/**
 * @author nttdocomo
 */
define(function(require) {
	var Base = require("./base");
	return taurus.view("taurus.views.ActiveError", Base.extend({
		tpl:'<span class="help-inline"><%=error%></span>',
	}));
});
