/**
 * @author nttdocomo
 */
define(function(require) {
	var NavBar = require("../../../src/ios/bar/navBar"),
	BarItem = require("../../../src/ios/bar/barItem"),
	Button = require("../../../src/ios/button/button");
	new NavBar({
		items:[{
			text:'信息'
		}],
		renderTo:$(document.body)
	})
});