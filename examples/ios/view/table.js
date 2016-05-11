/**
 * @author nttdocomo
 */
define(function(require) {
	var Page = require("../../../src/ios/page/page"),
	Table = require("../../../src/ios/view/table"),
	Button = require("../../../src/ios/button/button"),
	Backbone = require("backbone"),
	chance = require('chance'),
	collection = new Backbone.Collection([{
		text:chance.word()
	},{
		text:chance.word()
	},{
		text:chance.word()
	},{
		text:chance.word()
	}]),
	page = new Page({
		title:chance.word(),
		renderTo:$('.pages'),
		items:[{
			cls:Table,
			collection:collection,
			columns:[{
				dataIndex:'text'
			}]
		}]
	});
	/*navigation = new Navigation({
		items:[{
			cls:NavBar,
			items:[{
				title:'信息'
			}],
		},{
			cls:TableView,
			collection:collection,
			columns:[{
				dataIndex : 'firstName',
				renderer:function(value){
					return value
				}
			}],
			navigationItem:{
				title:'信息'
			}
		}],
		renderTo:$(document.body)
	})*/
});
