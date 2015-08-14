/**
 * @author nttdocomo
 */
define(function(require) {
	var Text = require("../../src/form/field/text"),
	RadioGroup = require("../../src/form/radioGroup"),
	CheckboxGroup = require("../../src/form/checkboxGroup"),
	FieldSet = require("../../src/form/fieldSet"),
	$body = $("#main"),
	Number = require("../../src/form/field/number"),
	Panel = require("../../src/form/panel"),
	Alert = require("../../src/tip/alert"),
	DateType = require("../../src/form/field/date"),
	DateTime = require("../../src/form/field/datetime");
	require('jquery.mockjax');
	$.mockjax({
		url: "/restful/login",
		dataType: "json",
		status: 200,
		// Simulate a network latency of 750ms
		responseTime: 750,
		response: function(settings) {
			var data = settings.data;
			if(data.username == 'aaa' && data.password == '111111'){
				this.status = 200;
				this.responseText = {
					randomText: "random " + Math.random()
				};
			} else {
				this.status = 400;
			};
		}
	});
	new Panel({
		renderTo : $body,
		title:'Login Form',
		width:350,
		collapsible: true,
		items:[{
			cls:Text,
			name : 'username',
			fieldLabel : 'User Name:'
		},{
			cls:Text,
			type:'password',
			name : 'password',
			fieldLabel : 'Password:'
		}],
		buttons: [{
            text: 'Login',
            className:'btn-primary',
            handler: function() {
            	var me = this;
                this.getForm().isValid();
                $.ajax({
                	url: "/restful/login",
                	dataType: "json",
                	data:this.getForm().getValues(),
                	type:'post',
                	success:function(res){
                		if(me.alert){
                			me.alert.close();
                		}
                		me.alert = new Alert({
                			dismissable:true,
                			type:'success',
                			renderTo:me.body,
                			operation:'prepend',
                			text:'登录成功'
                		})
                	},
                	error:function(){
                		if(me.alert){
                			me.alert.close();
                		}
                		me.alert = new Alert({
                			type:'danger',
                			dismissable:true,
                			renderTo:me.body,
                			operation:'prepend',
                			text:'登录失败，请检查您的用户名或密码'
                		})
                	}
                })
            }
        }]
	});
});