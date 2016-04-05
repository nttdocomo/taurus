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
TestCase("FormFieldTest", {
	testTextField : function() {
		var container = document.createElement('div');
		document.body.appendChild(container)
		seajs.use(["http://battle.ship.com/src/taurus.js", "http://battle.ship.com/src/form/field/base.js"], function() {
			var text = new taurus.form.field.Base({
				name : 'name',
				fieldLabel : 'Name',
				inputType : 'password'
			})
			container.appendChild(text.render().el);
			assertNotNull("container has an element", container.firstChild)
			var el = text.render().el;
			assertEquals("container has an element", text.render().el,container.firstChild)
		})
	}
});
