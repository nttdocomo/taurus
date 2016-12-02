/**
 * @author nttdocomo
 */
define(function(require) {
	var Text = require("../../src/classic/form/field/text"),
	RadioGroup = require("../../src/classic/form/radioGroup"),
	CheckboxGroup = require("../../src/classic/form/checkboxGroup"),
	FieldSet = require("../../src/classic/form/fieldSet"),
	Number = require("../../src/classic/form/field/number"),
	Panel = require("../../src/classic/form/panel"),
	DateType = require("../../src/classic/form/field/date"),
	DateTime = require("../../src/classic/form/field/datetime"),
	Time = require("../../src/classic/form/field/time"),
	FieldContainer = require("../../src/classic/form/fieldContainer"),
	Splitter = require("../../src/classic/resizer/splitter"),
	File = require("../../src/classic/form/field/file"),
	Container = require("../../src/classic/container/container"),
	Backbone = require("../../src/backbone"),
	$body = $("#main");
	new Panel({
		renderTo : $body,
		title:'Multi Column Form',
		width:700,
		collapsible: true,
		items:[{
			'class':Container,
			layout:'hbox',
			items:[{
				'class':Text,
				msgTarget:'under',
				name : 'first_name',
				emptyText:'First Name',
				fieldLabel : 'First Name'
			},{
				'class':Text,
				msgTarget:'under',
				name : 'first_name',
				emptyText:'First Name',
				fieldLabel : 'First Name'
			}]
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
});
