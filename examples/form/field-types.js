/**
 * @author nttdocomo
 */
define(function(require) {
	var Text = require("../../src/classic/form/field/text"),
	RadioGroup = require("../../src/classic/form/radioGroup"),
	CheckboxGroup = require("../../src/classic/form/checkboxGroup"),
	FieldSet = require("../../src/classic/form/fieldSet"),
	$body = $("#main"),
	Number = require("../../src/classic/form/field/number"),
	Panel = require("../../src/classic/form/panel"),
	FormBase = require("../../src/classic/form/base"),
	DateType = require("../../src/classic/form/field/date"),
	DateTime = require("../../src/classic/form/field/datetime"),
	Time = require("../../src/classic/form/field/time"),
	FieldContainer = require("../../src/classic/form/fieldContainer"),
	Splitter = require("../../src/classic/resizer/splitter"),
	File = require("../../src/classic/form/field/file"),
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
	var form = new FormBase({
		renderTo : $body,
		items:[{
			'class':Text,
			msgTarget:'under',
			name : 'first_name',
			emptyText:'First Name',
			fieldLabel : 'First Name:'
		}]
	})
	form.add(0, {
		'class':Text,
		msgTarget:'under',
		name : 'first_name',
		emptyText:'Two Name',
		fieldLabel : 'First Name:'
	})
	new Panel({
		renderTo : $body,
		title:'Simple Form',
		width:350,
		collapsible: true,
		items:[{
			'class':Text,
			msgTarget:'under',
			name : 'first_name',
			emptyText:'First Name',
			fieldLabel : 'First Name:'
		},{
			'class':Text,
			name : 'last_name',
			fieldLabel : 'Last Name:'
		},{
			'class':Text,
			name : 'company',
			fieldLabel : 'Company:'
		}, {
			'class':Text,
      fieldLabel: 'Email',
      name: 'email',
      allowBlank: false
    }, {
			'class':DateType,
			width:200,
      startDate:'09/08/2015',
      fieldLabel: 'DOB',
      name: 'dob'
    }, {
			'class':DateTime,
      fieldLabel: 'DOB',
      name: 'dob',
      value:1402689600000
    }, {
			'class':Number,
      fieldLabel: 'Age',
      name: 'age',
      minValue: 0,
      maxValue: 100
    }, {
			'class':Time,
      fieldLabel: 'Time Field',
      name: 'time',
      minValue: '6:00 AM',
      maxValue: '8:00 PM',
    },{
    	'class':FieldContainer,
      fieldLabel: 'Container',
      direction:'column',
      items:[{
				'class':Time,
        name: 'time',
        width:100,
        editable:false,
        minValue: '6:00 AM',
        maxValue: '8:00 PM',
    	},{
				'class':Text,
        width:200,
        name: 'age'
      }]
    }, {
			'class':FieldContainer,
      fieldLabel: '有效日期',
      direction:'column',
      items:[{
      	'class':DateType,
      	width:150,
        name: 'start'
      },{
	    	'class':Splitter,
	    	text:'至'
	    },{
      	'class':DateType,
      	width:150,
        name: 'end'
      }]
    },{
    	'class':FieldContainer,
      fieldLabel: 'Container',
      direction:'column',
      items:[{
				'class':Time,
        name: 'start',
        width:100,
        editable:false,
        minValue: '6:00 AM',
        maxValue: '8:00 PM',
      },{
      	'class':Splitter,
      	text:'至'
      },{
				'class':Time,
        name: 'end',
        width:100,
        editable:false,
        minValue: '6:00 AM',
        maxValue: '8:00 PM',
      }]
    },{
			'class':RadioGroup,
			fieldLabel : '应用平台:',
			msgTarget:'under',
			items:[{
				boxLabel:'iOS',
				checked:true,
				name:'type'
			},{
				boxLabel:'Android',
				name:'type'
			}],
			name : 'platform'
		},{
			'class':File,
			fieldLabel : '应用平台:',
			buttonOnly:true
		}],
		buttons: [{
            text: 'Save',
            className:'btn-primary',
            handler: function() {
            	console.log(this.getForm().getValues());
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
			'class':FieldSet,
			title: 'Phone Number',
			items:[{
				'class':Text,
				fieldLabel : 'Home:',
				editable:false,
				name : 'home',
				id:'textfield4',
				emptyText:'(888) 555-1212',
				collection:collection
			},{
				'class':Text,
				fieldLabel : 'Business:',
				editable:false,
				name : 'business',
				id:'textfield4',
				collection:collection
			},{
				'class':Text,
				fieldLabel : 'Mobile:',
				editable:false,
				name : 'mobile',
				id:'textfield4',
				collection:collection
			},{
				'class':Text,
				fieldLabel : 'Fax:',
				editable:false,
				name : 'fax',
				id:'textfield4',
				collection:collection
			},{
				'class':CheckboxGroup,
				fieldLabel : '应用平台:',
				items:[{
					boxLabel:'iOS',
					name:'type',
					inputValue:'ios'
				},{
					boxLabel:'Android',
					name:'type',
					inputValue:'android'
				}],
				name : 'platform'
			}]
		}],
		buttons: [{
      text: 'Save',
      className:'btn-primary',
      handler: function() {
        console.log(this.getForm().isValid())
        console.log(this.getForm().getValues());
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
