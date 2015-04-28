/**
 * @author nttdocomo
 */
define(function(require) {
	var Text = require("../../src/form/field/text"),
	InputGroup = require("../../src/form/inputGroup"),
	ComboBox = require("../../src/form/field/comboBox"),
	Button = require("../../src/button/button"),
	$body = $("#main"),
	collection = new Backbone.Collection([{
		name : "001",
		age : 1
	}, {
		name : "002",
		age : 2
	}, {
		name : "003",
		age : 3
	}, {
		name : "004",
		age : 4
	}, {
		name : "005",
		age : 5
	}, {
		name : "006",
		age : 6
	}, {
		name : "007",
		age : 7
	}]),
	inputGroup1 = new InputGroup({
		renderTo:$body,
		fieldLabel:'aaaaa',
		items:[{
			cls:Text,
			name : 'textfield1'
		},{
			cls:Text,
			name : 'textfield2'
		}]
	}),
	inputGroup2 = new InputGroup({
		renderTo:$body,
		items:[{
			cls:Text,
			name : 'textfield1'
		},{
			cls:ComboBox,
			name : 'textfield2',
			displayField:'name',
			collection:collection,
			valueField:'age'
		}]
	}),
	inputGroup3 = new InputGroup({
		renderTo:$body,
		items:[{
			cls:ComboBox,
			name : 'textfield1',
			displayField:'name',
			collection:collection,
			valueField:'age'
		},{
			cls:ComboBox,
			name : 'textfield2',
			displayField:'name',
			collection:collection,
			valueField:'age'
		}]
	}),
	inputGroup4 = new InputGroup({
		renderTo:$body,
		items:[{
			cls:ComboBox,
			name : 'textfield1',
			displayField:'name',
			collection:collection,
			editable:false,
			valueField:'age'
		},{
			cls:Text,
			name : 'textfield2'
		}]
	});
	new Button({
		renderTo:$body,
		text:'get input goup 1 value',
		handler:function(){
			console.log(inputGroup1.getValue())
		}
	})
	new Button({
		renderTo:$body,
		text:'get input goup 2 value',
		handler:function(){
			console.log(inputGroup2.getValue())
		}
	})
	new Button({
		renderTo:$body,
		text:'get input goup 3 value',
		handler:function(){
			console.log(inputGroup3.getValue())
		}
	})
	new Button({
		renderTo:$body,
		text:'get input goup 4 value',
		handler:function(){
			console.log(inputGroup4.getValue())
		}
	})
});