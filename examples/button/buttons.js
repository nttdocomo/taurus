/**
 * @author nttdocomo
 */
/**
 * @author nttdocomo
 */
define(function(require) {
	require("backbone");
	Button = require("../../src/button/button");
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
})