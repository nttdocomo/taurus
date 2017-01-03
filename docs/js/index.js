define(function(require){
	var Navbar = require('classic/menu/navbar')
	new Navbar({
		renderTo : $('.navbar-collapse'),
		showMenuEvent:'click',
		items: [{
			text: 'Home',
			href: '/'
		}]
	});
})