/**
 * @author nttdocomo
 */
define(function(require) {
	var Backbone = require("../src/backbone"),
	_ = require("../src/underscore"),
	PageableCollection = require("../src/backbone-pageable");
	var pageCol = new PageableCollection([],{
		mode:'client',
		state: {
			pageSize:5
		}
	}),
	array = []
	for (var i = 7 - 1; i >= 0; i--) {
		array.push({
			'name':i,
			'phone':'15210492508',
			'amount':i,
			'comment':'cccccccccccccc'
		})
	}
	pageCol.add(array)
	pageCol.getNextPage()
	pageCol.add(array)
	console.log(pageCol.state)
});
