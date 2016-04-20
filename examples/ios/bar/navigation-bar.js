/**
 * @author nttdocomo
 */
define(function(require) {
	var View = require("../../../src/ios/view/view"),
	TableView = require("../../../src/ios/view/table"),
	NavBar = require("../../../src/ios/bar/navBar"),
	Navigation = require("../../../src/ios/view/navigation"),
	Backbone = require("backbone"),
	chance = require('chance'),
	Button = require("../../../src/ios/button/button"),
	navBar = new NavBar({
		items:[{                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
			title:'信息',
			backBarButtonItem:{
				title:'取消'
			}
		}],
		renderTo:$('.page')
	}),
	pageContent = $('<div class="page-content"><div class="content-block"></div></div>').appendTo($('.page'))
	button = new Button({
		text:'Usual Button 1',
		renderTo:pageContent.find('.content-block'),
		listeners:{
			click: {
				selector:'',
				fn:function(){
					console.log(arguments)
					navBar.pushItem({                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
						title:chance.word(),
						backBarButtonItem:{
							title:'取消'
						}
					})
				}
			}
		}
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
