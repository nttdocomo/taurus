define(function(require){
	var Backbone = require('backbone')
	var Navbar = require('taurus/classic/menu/navbar')
	var Tree = require("taurus/classic/tree/panel")
	var TreeCollection = require("taurus/classic/collection/tree")
	var TreeModel = require("taurus/classic/model/tree")
	var Route = require("./route")
	new Navbar({
		renderTo : $('.navbar-collapse'),
		showMenuEvent:'click',
		items: [{
			text: 'Home',
			href: '/'
		}]
	});
	var collection = new TreeCollection({
    root: {
      expanded: true,
      children: [{
      	text: 'detention',
      	leaf: true
      }, {
      	text: 'components',
      	expanded: false,
      	children: [{
      		text: 'form',
      		expanded: false,
      		children: [{
      			text: 'field',
	      		expanded: false,
	      		children: [{
	      			text: 'text',
	      			leaf: true,
	      			href:'/text'
	      		}]
      		}]
      	}, {
      		text: 'algebra',
      		expanded: false,
      		children: [{
      			text: 'book report',
      			leaf: true
      		}, {
      			text: 'algebra',
      			expanded: false
      		}]
      	}]
      }, {
      	text: 'buy lottery tickets',
      	leaf: true
      }]
    }
  })
	console.log(collection)
	new Tree({
		hideHeaders:true,
		title: 'Destination',
		collection:collection,
		renderTo:$('.sidebar'),
		listeners: {
      itemclick: function(s,r) {
        alert(r.data.text);
      }
    }
	})
	new Route
	Backbone.history.start({
		root:'/docs' //root:'/static/web/allah/index.html',
		//pushState: true
	});
})