/**
 * @author nttdocomo
 */
define(function(require){
	require('./base');
	return taurus.view("taurus.form.field.Hidden", taurus.form.field.Base.extend({
		inputType : 'hidden',
		initialize:function(){
			taurus.form.field.Base.prototype.initialize.apply(this,arguments);
			this.$el.addClass('hide')
		}
	}))
})
