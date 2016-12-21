/**
 * @author nttdocomo
 */
 (function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['../panel/panel','./bar','./tab','../layout/container/card','../../view/card','../../view/tabContent'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('../panel/panel'),require('./bar'),require('./tab'),require('../layout/container/card'),require('../../view/card'),require('../../view/tabContent'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('../panel/panel'),require('./bar'),require('./tab'),require('../layout/container/card'),require('../../view/card'),require('../../view/tabContent'));
	}
}(this, function(Base,Bar,Tab,LayoutCard,Card,TabContent) {
	return Base.extend({
        /**
         * @cfg {String} [itemCls='x-tabpanel-child']
         * The class added to each child item of this TabPanel.
         */

        itemCls: 'tabpanel-child',
		defaultType:Card,
        deferredRender:true,
		initialize : function(options) {
			var me = this;
			Base.prototype.initialize.apply(this, arguments);
		},
		initItems:function(){
			var me = this,activeTab = me.activeTab || (me.activeTab = 0);
			this.layout = new LayoutCard({
				renderTo : me.$el,
                owner:me,
                deferredRender: me.deferredRender,
                itemCls:me.itemCls,
				activeItem: activeTab
			});
			me.frameBody = me.layout.$el;
			me.tabBar = new Bar({
				operation : 'prepend',
				renderTo : me.$el,
				tabPanel : me
			});
			Base.prototype.initItems.apply(me,arguments);
			activeTab = me.activeTab = me.tabBar.getComponent(activeTab);
			console.log(activeTab);
			if (activeTab !== 'undefined') {
				me.tabBar.setActiveTab(activeTab, true);
			}
		},
		getTabBar:function(){
			return this.tabBar;
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
				 Ext.resumeLayouts(true);*/

				// Card switch was not vetoed by an event listener
	            if (card !== previous) {

	                // Update the active tab in the tab bar and resume layouts.
	                me.tabBar.setActiveTab(card.tab);
	                me.trigger('tabchange', me, card, previous);
	                //Ext.resumeLayouts(true);
	            }
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
				'class' : Tab,
				card : item,
				title: item.title,
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
			if (me.isRendered) {
         me.setActiveTab(me.activeTab);
      }
		},
        getActiveItem:function(){
            return this.layout.getActiveItem();
        },
		updateItems:function(){
			var me = this,
            activeItem = me.getActiveItem();
            if (me.deferredRender) {
                if (activeItem) {
                    return activeItem.render(me.getTargetEl())
                }
            } else {
                return me._super.apply(me,arguments);
            }
		}
	});
}));
