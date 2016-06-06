/**
 * @author nttdocomo
 */
define(function(require) {
	var Radio = require("../../src/classic/form/field/radio"),
	$body = $("#main");
	new Radio({
		renderTo:$body,
		fieldLabel : 'image',
		boxLabel:'aaaaa',
		inputType:'radio',
		value:'1',
		name : 'textfield2'
	})
	new Radio({
		renderTo:$body,
		fieldLabel : 'dfdfdf',
		boxLabel:'bbbb',
		checked:false,
		inputType:'radio',
		value:'2',
		name : 'textfield2'
	})
});
