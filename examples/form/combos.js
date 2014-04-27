/**
 * @author nttdocomo
 */
define(function(require) {
	require("backbone");
	require("../../src/form/field/comboBox.js");
	var $body = $("#main");
	var collection = new Backbone.Collection([{
		name : "广东",
		age : 5
	}, {
		name : "北京",
		age : 1
	}, {
		name : "上海",
		age : 2
	}, {
		name : "天津",
		age : 3
	}, {
		name : "重庆",
		age : 4
	}, {
		name : "福建",
		age : 26
	}, {
		name : "广西",
		age : 55
	}])
	var city = [[{
		name : "广州",
		age : 5
	}, {
		name : "珠海",
		age : 26
	}, {
		name : "深圳",
		age : 55
	}],[{
		name : "福州",
		age : 5
	}, {
		name : "厦门",
		age : 26
	}],[{
		name : "桂林",
		age : 5
	}, {
		name : "南宁",
		age : 26
	}, {
		name : "柳州",
		age : 55
	}]]
	var comboBox = new taurus.form.field.ComboBox({
		renderTo : $body,
		name : 'textfield1',
		id:'textfield1',
		displayField: 'name',
		fieldLabel : 'country',
		collection:collection,
		listeners:{
			'select':function(){
				var child = $('#textfield2').data('component')
				child.clearValue()
				var index = this.collection.indexOf(arguments[1])
				child.collection.reset(city[index])
			}
		}
	});
	new taurus.form.field.ComboBox({
		renderTo : $body,
		name : 'textfield2',
		id:'textfield2',
		displayField: 'name',
		fieldLabel : 'city',
		collection:new Backbone.Collection()
	});
	new taurus.form.field.ComboBox({
		renderTo : $body,
		name : 'textfield3',
		id:'textfield3',
		width:150,
		displayField: 'name',
		valueField:'age',
		fieldLabel : 'city',
		collection:collection
	});
	new taurus.form.field.ComboBox({
		renderTo : $body,
		editable:false,
		name : 'textfield4',
		id:'textfield4',
		width:150,
		multiSelect: true,
		displayField: 'name',
		valueField:'age',
		fieldLabel : 'city',
		collection:collection
	});
})