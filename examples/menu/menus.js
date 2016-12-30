/**
 * @author nttdocomo
 */
define(function(require) {
	var backbone = require("backbone"),
	chance = require('chance'),
	_ = require('underscore'),
	Navbar = require("../../src/classic/menu/navbar"),
	Menu = require("../../src/classic/menu/menu.js"),
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
			item.menuAlign = {
				"my" : "left top",
				"at" : "left bottom",
				"collision" : "none none"
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
		renderTo : $('.navbar-collapse'),
		showMenuEvent:'click',
		items: randomMenu()
	});
	var menu = new Menu({
		renderTo : $body,
		items: randomMenu()
	});
	$(document).on('contextmenu',function(e){
		return false;
	}).on('mousedown',_.debounce(function(e){
	    if(e.which == 3) {
	    	//alert('Right Mouse button pressed.');
			menu.showAt(e.clientX,e.clientY)
			
			return false;
	    }
	}))
})