/**
 * @author nttdocomo
 */
define(function(require) {
	var Base = require('../view/base'), Tab = require('./tab');
	return Base.extend({
		defaultType : Tab,
		tagName : 'ul',
		className : 'nav nav-tabs',
		tpl : '',
		events:{
			'click li':'onClick'
		},
		// @private
		onClick : function(e, target) {
			var me = this, tabPanel = me.tabPanel, tabEl, tab, isCloseClick, tabInfo;
			tabEl = $(e.currentTarget).data('component');
			
			me.setActiveTab(tabEl);
			return false;
		},

		/**
		 * @private
		 * Marks the given tab as active
		 * @param {Ext.tab.Tab} tab The tab to mark active
		 * @param {Boolean} initial True if we're setting the tab during setup
		 */
		setActiveTab : function(tab, initial) {
			var me = this,tabPanel = me.tabPanel,
			tab = this.getComponent(tab);
			if(tabPanel){
				tabPanel.setActiveTab(tab.card);
			}

			if (!tab.disabled && tab !== me.activeTab) {
				if (me.activeTab) {
					if (me.activeTab.isDestroyed) {
						me.previousTab = null;
					} else {
						me.previousTab = me.activeTab;
						me.activeTab.deactivate();
					}
				}
				tab.activate();

				me.activeTab = tab;
				me.needsScroll = true;

				// We don't fire the change event when setting the first tab.
				// Also no need to run a layout
				if (!initial) {
					me.trigger('change', me, tab, tab.card);
					// Ensure that after the currently in progress layout, the active tab is scrolled into view
					me.updateLayout();
				}
			}
		}
	});
});
