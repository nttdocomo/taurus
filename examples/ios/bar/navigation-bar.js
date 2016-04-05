/**
 * @author nttdocomo
 */
define(function(require) {
	var Navigation = require("../../../src/ios/bar/navigationBar"),
	BarItem = require("../../../src/ios/bar/barItem"),
	Button = require("../../../src/ios/button/button");
	new Navigation({
		title:'信息',
		items:[{
			cls:Button,
			text:'信息',
			side:'left',
			iconClass:'back'
		}],
		renderTo:$(document.body)
	})
});