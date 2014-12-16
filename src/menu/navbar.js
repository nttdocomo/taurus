/**
 * @author nttdocomo
 */
define(function(require) {
	var Menu = require('./menu');
	return Menu.extend({
		isNav:true,
		className:'nav navbar-nav'
	});
});
