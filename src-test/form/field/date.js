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
		seajs.use(["http://battle.ship.com/src/taurus.js", "http://battle.ship.com/src/form/field/date.js"], function() {
			var date = new taurus.form.field.Date({
				name : 'date',
				format:'yyyy-mm-dd',
				fieldLabel : 'date'
			})
			container.appendChild(text.render().el);
			data.on('change',function(){
				
			})
		})
	}
});
