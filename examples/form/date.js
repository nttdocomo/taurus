/**
 * @author nttdocomo
 */
/**
 * @author nttdocomo
 */
define(function(require) {
	require("backbone");
	var tDate = require("../../src/form/field/date.js");
	var $body = $("#main");
	new tDate({
		renderTo : $body,
		name : 'textfield2',
		displayField: 'name',
		fieldLabel : 'date'
	});
})