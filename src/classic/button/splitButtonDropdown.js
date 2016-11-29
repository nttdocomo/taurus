/**
 * @author nttdocomo
 */
define(function(require){
	var Button = require('./buttonDropdown'),
	Menu = require("../menu/menu");
	return Button.extend({
		tpl:'<button type="button" class="btn btn-danger"><%=text%></button><button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown"><span class="caret"></span></button>',
	})
})
