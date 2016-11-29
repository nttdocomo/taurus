/**
 * @author nttdocomo
 */
define(function(require) {
 	var ButtonDropdown = require("../../src/classic/button/buttonDropdown.js")
 	var SplitButtonDropdown = require("../../src/classic/button/splitButtonDropdown.js")
 	var $ = require('jquery')
 	var Backbone = require('backbone') 
 	var $body = $(document.body);
	var collection = new Backbone.Collection([{
		name : "Tim",
		age : 5
	}, {
		name : "Ida",
		age : 26
	}, {
		name : "Rob",
		age : 55
	}])
 	var button = new ButtonDropdown({
    triggerEvent:'mouseenter',
		text: 'name',
    renderTo:$body.find('#example-1'),
    menu : [{
    	text: 'Item 1',
    	onClick:function(){
    		console.log('asdasd')
    	}
    },
			{text: 'Item 2'},
			{text: 'Item 3'},
			{text: 'Item 4'}
		]
	});
 	var button = new SplitButtonDropdown({
    collection:collection,
    triggerEvent:'click',
		text: 'name',
    renderTo:$body.find('#example-2'),
    menu : [{
    	text: 'Item 1',
    	onClick:function(){
    		console.log('asdasd')
    	}
    },
			{text: 'Item 2'},
			{text: 'Item 3'},
			{text: 'Item 4'}
		]
	});
})