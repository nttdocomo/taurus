/**
 * @author nttdocomo
 */
define(function(require) {
	var Prompt = require("../../src/widget/prompt"),
	Button = require("../../src/button/button"),
	$body = $("#main");
	new Button({
		renderTo : $body,
		text:'Clear Value',
		handler:function(){
			(new Prompt({
				title:'1111',
				content:'adsadasdasd'
			})).show();
		}
	})
}); 