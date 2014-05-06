/**
 * @author nttdocomo
 */
define(function(require) {
	var Text = require("../../src/form/field/text"),
		RadioGroup = require("../../src/form/radioGroup"),
		FieldSet = require("../../src/form/fieldSet"),
		$body = $("#main"),
		Number = require("../../src/form/field/number"),
		ComboBox = require("../../src/form/field/comboBox.js"),
		Prompt = require("../../src/widget/prompt.js"),
		Panel = require("../../src/form/panel.js"),
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
		}]);
	new Panel({
		renderTo : $body,
		title:'Simple Form',
		width:350,
		collapsible: true,
		items:[{
			cls:Text,
			width :150,
			name : 'textfield1',
			fieldLabel : 'First Name:'
		},{
			cls:Text,
			width :150,
			name : 'textfield1',
			fieldLabel : 'Last Name:'
		},{
			cls:Text,
			width :150,
			name : 'textfield1',
			fieldLabel : 'Company:'
		}],
		buttons: [{
            text: 'Save',
            className:'btn-primary',
            handler: function() {
                this.up('form').getForm().isValid();
            }
        },{
            text: 'Cancel',
            className:'btn-default',
            handler: function() {
                this.up('form').getForm().reset();
            }
        }]
	});
	new Panel({
		renderTo : $body,
		title:'Simple Form with FieldSets',
		width:350,
		collapsible: true,
		items:[{
			cls:FieldSet,
			title: '编号设置',
			items:[{
				cls:ComboBox,
				fieldLabel : '投放批次：',
				editable:false,
				name : 'textfield4',
				id:'textfield4',
				width:150,
				displayField: 'name',
				valueField:'age',
				collection:collection
			},{
				cls:ComboBox,
				fieldLabel : '投放属性：',
				editable:false,
				name : 'textfield4',
				id:'textfield4',
				width:150,
				displayField: 'name',
				valueField:'age',
				collection:collection
			}]
		}],
		buttons: [{
            text: 'Save',
            className:'btn-primary',
            handler: function() {
                this.up('form').getForm().isValid();
            }
        },{
            text: 'Cancel',
            className:'btn-default',
            handler: function() {
                this.up('form').getForm().reset();
            }
        }]
	});
	/*(new Prompt({
		renderTo : $body,
		title:'Simple Form',
		items:[{
			cls:FieldSet,
			title: '编号设置',
			items:[{
				cls:ComboBox,
				fieldLabel : '投放批次：',
				editable:false,
				name : 'textfield4',
				id:'textfield4',
				width:150,
				displayField: 'name',
				valueField:'age',
				collection:collection
			},{
				cls:ComboBox,
				fieldLabel : '投放属性：',
				editable:false,
				name : 'textfield4',
				id:'textfield4',
				width:150,
				displayField: 'name',
				valueField:'age',
				collection:collection
			}]
		}]
	})).show();*/
	new Text({
		renderTo : $body,
		width :150,
		name : 'textfield1',
		fieldLabel : '交易名称：'
	});
	new RadioGroup({
		renderTo : $body,
		name : 'textfield1',
		fieldLabel : '应用平台：',
		fields:[{
			boxLabel:'IOS',
			name:'platform',
			checked:true
		},{
			boxLabel:'Android',
			name:'platform'
		}]
	});
	new RadioGroup({
		renderTo : $body,
		name : 'textfield1',
		fieldLabel : '广告类型：',
		fields:[{
			boxLabel:'插屏',
			name:'ad_type',
			checked:true
		},{
			boxLabel:'积分墙',
			name:'ad_type'
		}]
	});
	new ComboBox({
		renderTo : $body,
		fieldLabel : '我的应用：',
		editable:false,
		name : 'textfield4',
		id:'textfield4',
		width:150,
		displayField: 'name',
		valueField:'value',
		listConfig:{
			getInnerTpl:function(displayField){
				return '<a href="#" class="boundlist-item"><img src="<%=item.icon%>" height="20" width="20"/><%=item.' + displayField + '%></a>';
			}
		},
		collection:new Backbone.Collection([{
			icon:'http://img.devmix.guohead.com/attach/04/26/1c3dc5b6705f119123c307ad0bd6e9d0.png',
			name:'无节操妹子',
			value:'1'
		},{
			icon:'http://img.devmix.guohead.com/attach/01/14/ed7aaa6ad8d37ffca92b4e1092675fec.png',
			name:'葵花宝典',
			value:'2'
		}])
	});
	new Text({
		renderTo : $body,
		name : 'textfield1',
		fieldLabel : '活动预算：'
	});
	new ComboBox({
		renderTo : $body,
		fieldLabel : '计费方式：',
		editable:false,
		name : 'textfield4',
		id:'textfield4',
		width:150,
		multiSelect: true,
		displayField: 'name',
		valueField:'value',
		collection:new Backbone.Collection([{
			name:'按点击',
			value:'1'
		},{
			name:'按激活',
			value:'2'
		}])
	});
	new Text({
		renderTo : $body,
		name : 'textfield1',
		fieldLabel : '计费单价：'
	});
	new RadioGroup({
		renderTo : $body,
		vertical:true,
		name : 'textfield1',
		fieldLabel : '投放设置：',
		fields:[{
			boxLabel:'一次性投放',
			name:'rel-type',
			checked:true
		},{
			boxLabel:'弹性投放',
			name:'rel-type'
		}]
	});
});