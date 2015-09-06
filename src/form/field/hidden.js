/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('./base');
	return Base.extend({
		inputType : 'hidden',
		initialize:function(){
			Base.prototype.initialize.apply(this,arguments);
			this.$el.addClass('hide')
		}
	})
})
