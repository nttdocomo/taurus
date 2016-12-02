/**
 * @author nttdocomo
 */
 (function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['./container','backbone'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
                return factory(require('./container'),require('backbone'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('./container'),require('backbone'));
	}
}(this, function(Container,Backbone){
	return Container.extend({
        /**
         * Return the active (visible) component in the layout.
         * @return {Ext.Component}
         */
        getActiveItem: function() {
            var me = this,
                // It's necessary to check that me.activeItem is not undefined as it could be 0 (falsey). We're more interested in
                // checking the layout's activeItem property, since that is the source of truth for an activeItem.  If it's
                // determined to be empty, check the owner. Note that a default item is returned if activeItem is `undefined` but
                // not `null`. Also, note that `null` is legitimate value and completely different from `undefined`.
                item = me.activeItem === undefined ? (me.owner && me.owner.activeItem) : me.activeItem,
                result = me.parseActiveItem(item);

            // Sanitize the result in case the active item is no longer there.
            if (result && me.owner.items.indexOf(result) !== -1) {
                me.activeItem = result;
            }

            // Note that in every use case me.activeItem will have a truthy value except for when a container or tabpanel is explicity
            // configured with activeItem/Tab === null or when an out-of-range index is given for an active tab (as it will be undefined).
            // In those cases, it is meaningful to return the null value, so do so.
            return result == null ? null : (me.activeItem || me.owner.activeItem);
        },
        /**
         * @private
         */
        parseActiveItem: function (item) {
            var activeItem;

            if (item && item instanceof Backbone.View) {
                activeItem = item;
            } else if (typeof item === 'number' || item === undefined) {
                activeItem = this.getLayoutItems()[item || 0];
            } else if (item === null) {
                activeItem = null;
            } else {
                activeItem = this.owner.getComponent(item);
            }

            return activeItem;
        },
        /**
         * @private
         * Marks the given tab as active
         * @param {Ext.tab.Tab} tab The tab to mark active
         * @param {Boolean} initial True if we're setting the tab during setup
         */
        setActiveItem : function(card, initial) {
            var me = this, owner = me.owner, oldCard = me.activeItem,newCard = me.parseActiveItem(card);// Is this a valid, different card?
            if (newCard && oldCard !== newCard) {
                if (oldCard) {
                    oldCard.hide()
                }
                // If the card has not been rendered yet, now is the time to do so.
                if (!newCard.rendered) {
                    me.renderItem(newCard, me.getRenderTarget(), owner.items.length);
                }
                // Make sure the new card is shown
                if (newCard.hidden) {
                    newCard.show();
                }
                // Layout needs activeItem to be correct, so clear it if the show has been vetoed,
                // set it if the show has *not* been vetoed.
                if (newCard.hidden) {
                    me.activeItem = newCard = null;
                } else {
                    me.activeItem = newCard;
                }
            }

            /*if (!item.disabled && item !== me.activeItem) {
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
            }*/
        }
	});
}));
