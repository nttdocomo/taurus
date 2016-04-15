/**
 * @author nttdocomo
 */
define(function(require){
	require("view/base");
	taurus.augmentString('taurus.templates.form.label', '<label class="control-label" for="<%=inputId%>"<%if(labelStyle){%> style="<%=labelStyle%>"<%}%>><%=fieldLabel%></label><div class="controls"><%=field%></div>');
	taurus.view("taurus.form.Label",taurus.views.Base.extend({
		className:"control-group",
		labelWidth:100,
		labelAlign : 'left',
		labelPad : 5,
		initialize : function(options) {
			taurus.views.Base.prototype.initialize.apply(this,arguments)
		}
	}))
})
