/**
 * @author nttdocomo
 */
/* # Example usage
 *
 * 		@example
 *		new taurus.form.field.Text({
 * 			name: 'name',
 * 			fieldLabel: 'Name',
 * 			inputType: 'password'
 * 		})
 */
define(function(require) {
	var Base = require("./base");
	return taurus.view("taurus.form.field.Display", Base.extend({
		allowBlank : true,
		fieldSubTpl:'<p class="form-control-static"><%=value%></p>'
	}));
});
