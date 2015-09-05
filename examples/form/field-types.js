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
	DateType = require("../../src/form/field/date"),
	DateTime = require("../../src/form/field/datetime"),
	Time = require("../../src/form/field/time"),
	FieldContainer = require("../../src/form/fieldContainer"),
	Splitter = require("../../src/resizer/splitter"),
	Backbone = require("../../src/backbone"),
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
			name : 'first_name',
			fieldLabel : 'First Name:'
		},{
			cls:Text,
			name : 'last_name',
			fieldLabel : 'Last Name:'
		},{
			cls:Text,
			name : 'company',
			fieldLabel : 'Company:'
		}, {
			cls:Text,
            fieldLabel: 'Email',
            name: 'email',
            allowBlank: false
        }, {
			cls:DateType,
			width:200,
            fieldLabel: 'DOB',
            name: 'dob'
        }, {
			cls:DateTime,
            fieldLabel: 'DOB',
            name: 'dob',
            value:1402689600000
        }, {
			cls:Number,
            fieldLabel: 'Age',
            name: 'age',
            minValue: 0,
            maxValue: 100
        }, {
			cls:Time,
            fieldLabel: 'Time Field',
            name: 'time',
            minValue: '6:00 AM',
            maxValue: '8:00 PM',
        },{
        	cls:FieldContainer,
            fieldLabel: 'Container',
            direction:'column',
            items:[{
				cls:Time,
	            name: 'time',
	            width:100,
	            editable:false,
	            minValue: '6:00 AM',
	            maxValue: '8:00 PM',
	        },{
				cls:Text,
	            width:200,
	            name: 'age'
	        }]
        }, {
			cls:FieldContainer,
            fieldLabel: '有效日期',
            direction:'column',
            items:[{
            	cls:DateType,
            	width:150,
	            name: 'start'
            },{
	        	cls:Splitter,
	        	text:'至'
	        },{
            	cls:DateType,
            	width:150,
	            name: 'end'
            }]
        },{
        	cls:FieldContainer,
            fieldLabel: 'Container',
            direction:'column',
            items:[{
				cls:Time,
	            name: 'start',
	            width:100,
	            editable:false,
	            minValue: '6:00 AM',
	            maxValue: '8:00 PM',
	        },{
	        	cls:Splitter,
	        	text:'至'
	        },{
				cls:Time,
	            name: 'end',
	            width:100,
	            editable:false,
	            minValue: '6:00 AM',
	            maxValue: '8:00 PM',
	        }]
        },{
			cls:RadioGroup,
			fieldLabel : '应用平台:',
			items:[{
				boxLabel:'iOS',
				checked:true,
				name:'type'
			},{
				boxLabel:'Android',
				name:'type'
			}],
			name : 'platform'
		}],
		buttons: [{
            text: 'Save',
            className:'btn-primary',
            handler: function() {
                if(this.getForm().isValid()){
                	console.log(this.getForm().getValues());
                }
            }
        },{
            text: 'Cancel',
            className:'btn-default',
            handler: function() {
                this.getForm().reset();
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
			title: 'Phone Number',
			items:[{
				cls:Text,
				fieldLabel : 'Home:',
				editable:false,
				name : 'home',
				id:'textfield4',
				emptyText:'(888) 555-1212',
				collection:collection
			},{
				cls:Text,
				fieldLabel : 'Business:',
				editable:false,
				name : 'business',
				id:'textfield4',
				collection:collection
			},{
				cls:Text,
				fieldLabel : 'Mobile:',
				editable:false,
				name : 'mobile',
				id:'textfield4',
				collection:collection
			},{
				cls:Text,
				fieldLabel : 'Fax:',
				editable:false,
				name : 'fax',
				id:'textfield4',
				collection:collection
			},{
				cls:CheckboxGroup,
				fieldLabel : '应用平台:',
				items:[{
					boxLabel:'iOS',
					name:'type'
				},{
					boxLabel:'Android',
					name:'type'
				}],
				name : 'platform'
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
                this.getForm().reset();
            }
        }]
	});
});