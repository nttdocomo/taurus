/**
 * @author nttdocomo
 */
define(function(require) {
	var Base = require('./base'), TabPanel = require('./card');
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
});
