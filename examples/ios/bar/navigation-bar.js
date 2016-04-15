/**
 * @author nttdocomo
 */
define(function(require) {
	console.log('aaaaa')
	var View = require("../../../src/ios/view/view"),
	TableView = require("../../../src/ios/view/table"),
	Navigation = require("../../../src/ios/view/navigation"),
	Backbone = require("backbone"),
	Button = require("../../../src/ios/button/button"),
	collection = new Backbone.Collection([{
		firstName:'Cui'
	}]),
	navigation = new Navigation({
		activeView:new TableView({
			collection:collection,
			columns:[{
				dataIndex : 'firstName',
				renderer:function(value){
					return value
				}
			}],
			navigationItem:{
				title:'信息',
				backBarButtonItem:{
					title:'Back'
				}
			}
		}),
		renderTo:$(document.body)
	})
});