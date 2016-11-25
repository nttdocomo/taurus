/**
 * @author nttdocomo
 */
define(function(require) {
 	var ButtonDropdown = require("../../src/classic/button/buttonDropdown.js")
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
        collection:collection,
		text: 'name',
        renderTo:$body,
        menu : [
			{text: 'Item 1'},
			{text: 'Item 2'},
			{text: 'Item 3'},
			{text: 'Item 4'}
		]
	});
})