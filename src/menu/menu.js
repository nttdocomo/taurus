/**
 * @author nttdocomo
 */
define(function(require) {
	var Base = require('../view/base'),
	Dropdown = require('./dropdown');
	return Base.extend({
		dismissable : false,
		text : '',
		hideDelay : 1000,
		initialize:function(){
			Base.prototype.initialize.apply(this,arguments);
			this.$el.css('top',0);
			if(!this.triggerEl.data('menu')){
				this.triggerEl.data('menu',this);
			}
			this.triggerEl.on('click',_.bind(this.expand,this))
			this.dropdownMenu = new Dropdown({
				menus:this.menus,
				renderTo:$(document.body)
			})
			this.dropdownMenu.alignTo(this.triggerEl,{
				"my" : "left top",
				"at" : "left bottom"
			});
		},
		html : function() {
		},
		collapse:function(){
			this.dropdownMenu.hide();
			taurus.$doc.off('mousedown',this.onDocumentClick);
		},
		expand:function(){
			this.dropdownMenu.show();
			this.onDocumentClick = _.bind(function(e){
				if(this.triggerEl[0] != e.target && !this.triggerEl.has(e.target).length && !this.dropdownMenu.$el.has(e.target).length && !this.dropdownMenu.$el.is(e.target)){
					this.collapse();
				}
			},this);
			taurus.$doc.on('mousedown',this.onDocumentClick);
			return false;
		}
	});
});
