/**
 * @author nttdocomo
 */
define(function(require){
	var SwitchButton = require('/src/button/checkboxButton')
	new SwitchButton({
		onText:'开',
		offText:'关',
		renderTo:$(document.body)
	})
})
