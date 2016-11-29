/**
 * @author nttdocomo
 */
define(function(require){
	var Button = require('./button'),
	Menu = require("../menu/menu");
	return Button.extend({
		tpl:'<button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown"><%=text%> <span class="caret"></span></button>',
		className:'btn-group',
		tagName : 'div',
		initialize:function(){
			Button.prototype.initialize.apply(this, arguments);
			if(this.menu){
				this.setMenu();
			}
		},
		delegateEvents : function(events) {
			var events = $.extend(events || {}, this.events, {
				'click .dropdown-toggle' : 'onTriggerClick'
			});
			Button.prototype.delegateEvents.call(this, events)
		},
		applyChildEls:function(childEls){
			Button.prototype.applyChildEls.call(this,childEls);
			this.triggerWrap = this.$el;
		},
		getAlignEl:function(){
			return this.$el
		},
		onTriggerClick:function(){
			var me = this;
	        if (me.menu) {
	            me.showMenu(true);
	        }
		},
		showMenu:function(fromEvent){
	        var me = this,
	        menu = me.menu,
	        onDocumentClick = function(){
	        	menu.hide();
	        	taurus.$doc.off('mousedown',onDocumentClick);
	        }
			if (menu.isVisible()) {
                menu.hide();
            } else {
            	menu.show();
            	taurus.$doc.on('mousedown',onDocumentClick);
				this.alignMenu();
            }
		},
		setMenu:function(){
			this.menu = new Menu({
				items:this.menu,
				width:this.$el.width(),
				renderTo:$(document.body)
			})
		},
		alignMenu:function(){
			var me = this, menu = me.menu,position = {
					"my" : "left top",
					"at" : "left bottom",
			"collision" : "none none"
				},
			heightAbove = taurus.getPositionAbove(this.$el),
			heightBelow = taurus.getPositionBelow(this.$el),
			space = Math.max(heightAbove, heightBelow);

			// Allow the picker to height itself naturally.
			/*if (picker.height) {
				delete picker.height;
				picker.updateLayout();
			}*/
			// Then ensure that vertically, the dropdown will fit into the space either above or below the inputEl.
			if (menu.getHeight() > heightBelow - 5 && heightAbove > heightBelow) {
				position = {
					"my" : "left bottom",
					"at" : "left top",
			"collision" : "none none"
				};
				// have some leeway so we aren't flush against
			}
			menu.alignTo(this.$el, position);
		}
	})
})
