/**
 * @author nttdocomo
 */
 (function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['./base','./card','backbone'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('./base'),require('./card'),require("backbone"));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('./base'),require('./card'),require("backbone"));
	}
}(this, function(Base,TabPanel,Backbone) {
	return Base.extend({
		defaultType : TabPanel,
		className : 'tab-content',

		// @private
		parseActiveItem : function(item) {
			if (item && item instanceof Backbone.View) {
				return item;
			} else {
				return this.owner.getComponent(item);
			}
		},

		/**
		 * @private
		 * Marks the given tab as active
		 * @param {Ext.tab.Tab} tab The tab to mark active
		 * @param {Boolean} initial True if we're setting the tab during setup
		 */
		setActiveItem : function(card, initial) {
			var me = this, item = this.parseActiveItem(card);

			if (!item.disabled && item !== me.activeItem) {
				if (me.activeItem) {
					if (me.activeItem.isDestroyed) {
						me.previousItem = null;
					} else {
						me.previousItem = me.activeItem;
						me.activeItem.deactivate();
					}
				}
				item.activate();

				me.activeItem = item;
			}
		}
	});
}));