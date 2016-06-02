/**
 * @author nttdocomo
 */
define(function(require) {
	var Prompt = require("../../src/classic/widget/prompt"),
	Dialog = require("../../src/classic/widget/dialog"),
	Button = require("../../src/classic/button/button"),
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
	new Button({
		renderTo : $body,
		text:'Dialog',
		handler:function(){
			(new Dialog({
				title:'Dialog',
				content:'Dialog'
			})).show();
		}
	})
});
