/**
 * @author nttdocomo
 */
define(function(require) {
	var View = require("../../../src/ios/view/view"),
	Button = require("../../../src/ios/button/button");
	new View({
		navigationItem:{
			title:'信息',
			backBarButtonItem:{
				title:'Back'
			}
		},
		renderTo:$(document.body)
	})
});