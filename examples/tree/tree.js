/**
 * @author nttdocomo
 */
define(function(require) {
	var backbone = require("backbone"),
	chance = require('chance'),
	_ = require('underscore'),
	Tree = require("../../src/classic/tree/panel"),
	TreeCollection = require("../../src/classic/collection/tree"),
	TreeModel = require("../../src/classic/model/tree"),
	$body = $(document.body),
	likelihood = 30;
	function randomMenu(){
		var len = chance.natural({min: 1, max: 10});
		var items = [];
		for (var i = len; i >= 0; i--) {
			var item = {
				text:chance.word(),
				leaf:false
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
	var collection = new TreeCollection({
        root: {
            expanded: true,
            children: [
                { text: 'detention', leaf: true },
                { text: 'homework', expanded: false, children: [
                    { text: 'book report', leaf: true },
                    { text: 'algebra', expanded: false,children: [
		                    { text: 'book report', leaf: true },
		                    { text: 'algebra', expanded: false}
		                ]}
                ] },
                { text: 'buy lottery tickets', leaf: true }
            ]
        }
    })
	console.log(collection)
	new Tree({
		hideHeaders:true,
		title: 'Destination',
		collection:collection,
		renderTo:$('#main'),
		listeners: {
      itemclick: function(s,r) {
        alert(r.data.text);
      }
    }
	})
})
