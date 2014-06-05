/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('./base');
	return Base.extend({
		className:'tab-pane',
		activeCls:'active',
		// @private
		activate : function(supressEvent) {
			var me = this;

			me.active = true;
			me.$el.addClass(me.activeCls);
		},
		// @private
		deactivate : function(supressEvent) {
			var me = this;

			me.active = false;
			me.$el.removeClass(me.activeCls);
		}
	});
});
