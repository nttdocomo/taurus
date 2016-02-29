/**
 * @author nttdocomo
 */
define(function(require) {
	var backbone = require("backbone"),
	chance = require('chance'),
	_ = require('underscore'),
	Tree = require("../../src/tree/panel"),
	TreeModel = require("../../src/model/tree"),
	$body = $(document.body),
	likelihood = 30;
	function randomMenu(){
		var len = chance.natural({min: 1, max: 10});
		var items = [];
		for (var i = len; i >= 0; i--) {
			var item = {
				text:chance.word()
			};
			if(chance.bool({likelihood:likelihood})){
				item.children = randomMenu()
				if(likelihood > 0){
					--likelihood;
				}
			}
			items.push(item)
		};
		return items;
	}
	var model = new TreeModel({
		text: chance.word(),
		children:randomMenu()
	})
	new Tree({
		model:model
	})
})