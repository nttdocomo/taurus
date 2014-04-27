/**
 * @author nttdocomo
 */
define(function(require){
	var Button = require('/src/button/button');
	var SwitchButton = require('/src/button/switchButton');
	new Button({
		text:'111111',
		renderTo:$(document.body)
	})
	new SwitchButton({
		buttons:[{
			text:'111111'
		},{
			text:'222222'
		}],
		listeners:
		{
			'change': function(btn, item)
			{
				alert(btn.text());		
			}
		},
		renderTo:$(document.body)
	})
})
