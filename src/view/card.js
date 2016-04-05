/**
 * @author nttdocomo
 */
 (function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['./base'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('./base'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('./base'));
	}
}(this, function(Base){
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
}));
