/**
 * @author nttdocomo
 */
define(function(require) {
	var Panel = require("../../src/panel/panel.js");
	var Table = require("../../src/panel/table.js");
	var $body = $("#main");
	new Panel({
		renderTo:$body,
		title:'panel',
		content:'contentcontentcontentcontentcontentcontent'
	});
	var collection = new Backbone.Collection([{
		name:'aaaa',
		age:10
	},{
		name:'aaaa',
		age:10
	},{
		name:'aaaa',
		age:10
	},{
		name:'aaaa',
		age:10
	},{
		name:'aaaa',
		age:10
	},{
		name:'aaaa',
		age:10
	},{
		name:'aaaa',
		age:10
	},{
		name:'aaaa',
		age:10
	},{
		name:'aaaa',
		age:10
	},{
		name:'aaaa',
		age:10
	},{
		name:'aaaa',
		age:10
	},{
		name:'aaaa',
		age:10
	}]);
	new Table({
		loading:true,
		autoHeight:true,
		refreshable:true,
		uiClass:'player-list',
		title:'Player',
		tableConfig:{
			height:100,
			offsetBottom:10,
			columns : [{
				text : 'Name',
				width:100,
				flex : 1,
				sortable : false,
				dataIndex : 'name'
			},{
				text : 'Age',
				flex : 1,
				width:50,
				sortable : false,
				dataIndex : 'age'
			}],
			collection : collection
		},
		collection : collection,
		renderTo:$body
	});
});