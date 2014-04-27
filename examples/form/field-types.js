/**
 * @author nttdocomo
 */
define(function(require) {
	var Text = require("../../src/form/field/text.js"),
		$body = $("#main"),
		Number = require("../../src/form/field/number.js");
	new Text({
		renderTo : $body,
		name : 'textfield1',
		fieldLabel : '交易名称：'
	});
});