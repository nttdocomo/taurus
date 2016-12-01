/**
 * @author nttdocomo
 */
/**
 * @author nttdocomo
 */
define(function(require) {
	require("backbone");
	var Button = require("../../src/classic/button/button");
	var FileButton = require("../../src/classic/button/fileButton");
	var $body = $(document.body);
	var likelihood = 30;
	function randomMenu(){
		var len = chance.natural({min: 1, max: 10});
		var items = [];
		for (var i = len; i >= 0; i--) {
			var item = {
				text:chance.word()
			};
			if(chance.bool({likelihood:likelihood})){
				item.menu = {
					items:randomMenu()
				}
				if(likelihood > 0){
					--likelihood;
				}
			}
			items.push(item)
		};
		return items;
	}

	/*new Menu({
		renderTo : $body,
		items: randomMenu()
	});*/

	new Button({
		renderTo : $body,
		text:chance.word(),
		menu:{
			items:randomMenu()
		}
	});
	new FileButton({
		renderTo : $body,
		text:chance.word()
	})
})