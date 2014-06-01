define(function(require) {
	var Base = require('../view/base'), Bar = require('./bar'), Tab = require('./tab'), Card = require('../view/card'), TabContent = require('../view/tabContent');
	return Base.extend({
		tpl : '',
		defaultType:Card,
		initialize : function(options) {
			var me = this;
			Base.prototype.initialize.apply(this, arguments);
		},
		initItems:function(){
			var activeTab = this.activeTab || (this.activeTab = 0);
			this.layout = new TabContent({
				renderTo : this.$el,
				activeItem: activeTab
			});
			this.tabBar = new Bar({
				operation : 'prepend',
				renderTo : this.$el,
				tabPanel : this
			});
			Base.prototype.initItems.apply(this,arguments);
			activeTab = this.activeTab = this.tabBar.getComponent(activeTab);
			console.log(activeTab);
			if (activeTab !== 'undefined') {
				this.tabBar.setActiveTab(activeTab, true);
			}
		},

		/**
		 * Makes the given card active. Makes it the visible card in the TabPanel's CardLayout and highlights the Tab.
		 * @param {String/Number/Ext.Component} card The card to make active. Either an ID, index or the component itself.
		 * @return {Ext.Component} The resulting active child Component. The call may have been vetoed, or otherwise
		 * modified by an event listener.
		 */
		setActiveTab : function(card) {
			var me = this, previous;

			card = me.getComponent(card);
			if (card) {
				previous = me.getActiveTab();

				/*if (previous !== card && me.fireEvent('beforetabchange', me, card, previous) === false) {
				 return false;
				 }*/
				me.layout.setActiveItem(card);

				// We may be passed a config object, so add it.
				// Without doing a layout!
				/*if (!card.isComponent) {
				 Ext.suspendLayouts();
				 card = me.add(card);
				 Ext.resumeLayouts();
				 }

				 // MUST set the activeTab first so that the machinery which listens for show doesn't
				 // think that the show is "driving" the activation and attempt to recurse into here.
				 me.activeTab = card;

				 // Attempt to switch to the requested card. Suspend layouts because if that was successful
				 // we have to also update the active tab in the tab bar which is another layout operation
				 // and we must coalesce them.
				 Ext.suspendLayouts();
				 me.layout.setActiveItem(card);

				 // Read the result of the card layout. Events dear boy, events!
				 card = me.activeTab = me.layout.getActiveItem();

				 // Card switch was not vetoed by an event listener
				 if (card && card !== previous) {

				 // Update the active tab in the tab bar and resume layouts.
				 me.tabBar.setActiveTab(card.tab);
				 Ext.resumeLayouts(true);

				 // previous will be undefined or this.activeTab at instantiation
				 if (previous !== card) {
				 me.fireEvent('tabchange', me, card, previous);
				 }
				 }
				 // Card switch was vetoed by an event listener. Resume layouts (Nothing should have changed on a veto).
				 else {
				 Ext.resumeLayouts(true);
				 }*/
				return card;
			}
		},

		/**
		 * Returns the item that is currently active inside this TabPanel.
		 * @return {Ext.Component} The currently active item.
		 */
		getActiveTab : function() {
			var me = this,
			// Ensure the calculated result references a Component
			result = me.tabBar.getComponent(me.activeTab);

			// Sanitize the result in case the active tab is no longer there.
			if (result && _.indexOf(me.tabBar.items, result) != -1) {
				me.activeTab = result;
			} else {
				me.activeTab = null;
			}

			return me.activeTab;
		},

		// @private
		getDefaultContentTarget : function() {
			return this.body;
		},
		getItemContainer : function() {
			return this.$el.find('.tab-content');
		},
		onAdd : function(item, index) {
			var me = this, cfg = item.tabConfig || {}, defaultConfig = {
				cls : Tab,
				card : item,
				disabled : item.disabled,
				closable : item.closable,
				hidden : item.hidden && !item.hiddenByLayout, // only hide if it wasn't hidden by the layout itself
				tooltip : item.tooltip,
				tabBar : me.tabBar,
				position : me.tabPosition,
				closeText : item.closeText
			};

			cfg = $.extend(cfg, defaultConfig);

			// Create the correspondiong tab in the tab bar
			item.tab = me.tabBar.insert(index, cfg);

			/*item.on({
				scope : me,
				enable : me.onItemEnable,
				disable : me.onItemDisable,
				beforeshow : me.onItemBeforeShow,
				iconchange : me.onItemIconChange,
				iconclschange : me.onItemIconClsChange,
				titlechange : me.onItemTitleChange
			});*/

			/*if (item.isPanel) {
				if (me.removePanelHeader) {
					if (item.rendered) {
						if (item.header) {
							item.header.hide();
						}
					} else {
						item.header = false;
					}
				}
				if (item.isPanel && me.border) {
					item.setBorder(false);
				}
			}*/
		}
	});
});
