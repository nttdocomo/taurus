/**
 * @author nttdocomo
 */
define(function(require, exports, module) {
	require('backbone')
	var $body = $("#main");
	var $doc = $(document.body),panel;
	var store = new Backbone.Collection;
	store.url = '/resources/city.json';
	var collection = new Backbone.Collection([{
		name : "Tim",
		age : 5
	}, {
		name : "Ida",
		age : 26
	}, {
		name : "Rob",
		age : 55
	}]);
	$doc.on('click','[data-trigger="modal"]',function(){
		seajs.use("../../src/form/panel.js", function() {
			if(!panel){
				panel = new taurus.form.Panel({
					title:'111111111',
					renderTo : $(document.body),
					items:[{
						xtype: 'form.field.Text',
						name : 'name',
						fieldLabel : 'name'
					},{
						xtype: 'form.field.ComboBox',
						name : 'country',
						queryMode:'local',
						displayField: 'name',
						valueField:'age',
						fieldLabel : 'country',
						collection:collection
					},{
						xtype: 'form.field.Date',
						name : 'date',
						format:'yyyy-mm-dd',
						fieldLabel : 'date'
					},{
						xtype: 'form.field.Number',
						name : 'number',
						fieldLabel : 'number'
					},{
						xtype: 'form.field.Hidden',
						name : 'aa',
						fieldLabel : 'aa'
					}],
					buttons:[
						{
							text: 'Button 1',
							handler:function(){
								console.log(this)
							}
						}
					]
				});
			}
			panel.show();
		})
	})
	var model = new Backbone.Model({
		'name':'aaaaaaaaa',
		'country':26,
		'date':1357374631169,
		'number':1,
	})
	seajs.use("../../src/form/base.js", function() {
		new taurus.form.Base({
			renderTo : $body,
			model : model,
			items:[{
				xtype: 'form.field.Text',
				name : 'name',
				fieldLabel : 'name'
			},{
				xtype: 'form.field.ComboBox',
				name : 'country',
				queryMode:'local',
				displayField: 'name',
				valueField:'age',
				editable:false,
				fieldLabel : 'country',
				collection:collection
			},{
				xtype: 'form.field.ComboBox',
				name : 'country',
				queryMode:'local',
				displayField: 'name',
				valueField:'age',
				fieldLabel : 'country',
				collection:collection
			},{
				xtype: 'form.field.Date',
				name : 'date',
				fieldLabel : 'date'
			},{
				xtype: 'form.field.Number',
				name : 'number',
				fieldLabel : 'number'
			}]
		});
	})
})