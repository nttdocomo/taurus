/**
 * @author nttdocomo
 */
define(function(require) {
	var Base = require('./base');
	var Scrollbar = require('../util/scrollbar');
	return taurus.view("taurus.views.Scrollable", Base.extend({
		initialize : function(options) {
			Base.prototype.initialize.apply(this,arguments);
			if(this.hasScrollbar){
				$(window).on('resize',_.throttle(_.bind(function(){
					this.scrollbar.update();
				},this),500));
			}
		},
		html : function(data) {
			var html = Base.prototype.html.apply(this,arguments);
			if(this.hasScrollbar){
				this.scrollbar = new Scrollbar({
					oViewport:this.$el,
					oContent:this.$el.find(' > :first-child'),
					renderTo:this.$el
				});
			}
			return html;
		}
	}));
});
