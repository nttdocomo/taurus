/**
 * @author nttdocomo
 */
define(function(require) {
	var File = require("../../src/classic/form/field/fileUpload"),
	Backbone = require("../../src/backbone"),
	$body = $("#main");
	new File({
		renderTo : $body,
		fieldLabel : '应用平台',
		buttonOnly:true
	});
});
