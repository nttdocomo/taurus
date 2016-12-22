/**
 * @author nttdocomo
 */
;(function (root, factory) {
  if (typeof define === 'function') {
    if (define.amd) {
      define(['./button', '../menu/menu'], factory)
    }
    if (define.cmd) {
      define(function (require, exports, module) {
        return factory(require('./button'), require('../menu/menu'))
      })
    }
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('./button'), require('../menu/menu'))
  }
}(this, function(Button, Menu){
	return Button.extend({
		tpl:'<%=text%> <span class="caret"></span>',
		className:'btn dropdown-toggle',
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
			var menu = new Menu({
				items:this.menu.items,
				width:this.$el.width(),
				renderTo:$(document.body)
			})
			menu.setOwnerCmp(me)
			this.menu = menu
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
}))
