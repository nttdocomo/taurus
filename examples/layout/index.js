/**
 * @author nttdocomo
 */
define(function(require) {
	var backbone = require("backbone"),
	chance = require('chance'),
	Navbar = require("../../src/menu/navbar.js"),
	$body = $(document.body),
	likelihood = 30;
	function randomMenu(){
		var len = chance.natural({min: 1, max: 10});
		var items = [];
		for (var i = len; i >= 0; i--) {
			var item = {
				text:chance.word()
			};
			if(chance.bool()){
				item.href = chance.url();
			}
			if(chance.bool({likelihood:likelihood})){
				item.menu = {
					showMenuEvent:'click',
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

	new Navbar({
		renderTo : $('.top'),
		showMenuEvent:'click',
		items: randomMenu()
	});
})