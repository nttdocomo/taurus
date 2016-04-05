/**
 * @author nttdocomo
 */
define(function(require) {
	require("backbone");
	require("../../src/panel/table.js");
	var $doc = $(document.body);
	var myData = [
        {'company':'3m Co', 'price': 71.72,'change': 0.02},
        {'company':'Alcoa Inc', 'price': 29.01,'change': 0.42},
        {'company':'Altria Group Inc', 'price': 83.81,'change': 0.28},
        {'company':'American Express Company', 'price': 52.55,'change': 0.01},
        {'company':'American International Group, Inc.', 'price': 64.13,'change': 0.31},
        {'company':'AT&T Inc.', 'price': 31.61,'change': -0.48},
        {'company':'Boeing Co.', 'price': 75.43,'change': 0.53}
    ];
    var collection = new Backbone.Collection(myData)
	var table = new taurus.panel.Table({
		title:'table',
		height:200,
		columns: [{
			text : 'Company',
			flex : 1,
			sortable : false,
			dataIndex: 'company'
		},{
			text     : 'Price',
			width    : 75,
			sortable : true,
			renderer:function(value){
				return value/10;
			},
			dataIndex: 'price'
		},{
            text     : 'Change',
            width    : 75,
            sortable : true,
			dataIndex: 'change'
        }],
        collection:collection,
        renderTo:$('.main')
	});
})