/**
 * @author nttdocomo
 */
define(function(require) {
	var Radio = require("../../src/classic/form/field/radio"),
	RadioGroup = require("../../src/classic/form/radioGroup"),
	$body = $("#main");
	$body.append('<h2>单选框</2>')
	new Radio({
		renderTo:$body,
		fieldLabel : '单选框',
		boxLabel:'单选框',
		inputType:'radio',
		value:'1',
		name : 'textfield2'
	})
	$body.append('<h2>包含选中和没选中事件的单选框</2>')
	for (var i = 2 - 1; i >= 0; i--) {
		new Radio({
			renderTo:$body,
			fieldLabel : '单选框'+i,
			boxLabel:'单选框'+i,
			checked:false,
			inputType:'radio',
			value:'2',
			name : 'textfield3',
			handler:function(checked){
				alert(this.fieldLabel + checked)
			}
		})
	}
	$body.append('<h2>使用radio group的单选框</2>')
	var items = []
	for (var i = 2 - 1; i >= 0; i--) {
		items.push({
			'class':Radio,
			boxLabel:'单选框'+i,
			checked:false,
			inputType:'radio',
			value:'2',
			name : 'textfield4',
			handler:function(checked){
				alert(this.boxLabel + checked)
			}
		})
	}
	new RadioGroup({
		renderTo:$body,
		fieldLabel : '单选框',
		items:items
	})
});
