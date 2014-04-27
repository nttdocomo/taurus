/**
 * @author nttdocomo
 */
seajs.config({
	alias : {
		'jquery' : 'jquery',
		'backbone' : 'backbone',
		'underscore' : 'underscore'
	},
	base : 'http://battle.ship.com/src/',
	charset : 'utf-8'
});
TestCase("ComboBoxTest", {
	testOneCombobox : function() {
		var container = document.createElement('div');
		document.body.appendChild(container)
		seajs.use(["http://battle.ship.com/src/taurus.js", "http://battle.ship.com/src/form/field/comboBox.js"], function() {
			var collection = new Backbone.Collection([{
				name : "Tim",
				age : 5
			}, {
				name : "Ida",
				age : 26
			}, {
				name : "Rob",
				age : 55
			}])
			var displayField = 'name',valueField = 'age',comboBox = new taurus.form.field.ComboBox({
				renderTo : $(container),
				name : 'textfield2',
				displayField: displayField,
				valueField: valueField,
				fieldLabel : 'country',
				collection:collection
			});
			//click the trigger to show the boundlist
			comboBox.triggerEl.click();
			assertNotUndefined('picker is defined', comboBox.picker);
			assertSame('open the boundlist, boundlist is not append to body', 1, $('body').find('#listEl').length)
			assertTrue('boundlist is not visible', comboBox.picker.$el.is(":visible"))
			comboBox.triggerEl.click();
			assertFalse('boundlist is visible', comboBox.picker.$el.is(":visible"))
			//click the trigger to show the boundlist
			comboBox.triggerEl.click();
			assertTrue('boundlist is not visible', comboBox.picker.$el.is(":visible"))
			//click the document to hide the boundlist
			taurus.$doc.mousedown();
			assertFalse('boundlist is visible', comboBox.picker.$el.is(":visible"))
			//test the list item click and check the getValue return the right value
			for (var i = 0; i < collection.length; i++){
				comboBox.triggerEl.click();
				comboBox.picker.$el.find('li:eq('+i+')').click();
				assertSame('comboBox value', collection.at(i).get(valueField), comboBox.getValue())
				assertSame('comboBox value', collection.at(i).get(displayField), comboBox.getRawValue())
				assertFalse('boundlist is visible', comboBox.picker.$el.is(":visible"))
			}
		})
	}
});
