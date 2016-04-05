/**
 * @author nttdocomo
 */
define(function(require) {
	require("backbone");
	var File = require("../../src/form/field/file.js");
	var $body = $("#main");
	new File({
		renderTo : $body,
		name : 'textfield1',
		fieldLabel : 'country',
		id:'textfield1'
	});
	new File({
		renderTo : $body,
		buttonOnly: true,
		name : 'textfield1',
		id:'textfield1'
	});
})