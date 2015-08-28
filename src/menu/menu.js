/**
 * @author nttdocomo
 */
define(function(require) {
	var Base = require('../view/base'),
	MenuItem = require('./item'),
	Manager = require('./manager'),
	_ = require('underscore'),
	Backbone = require('backbone');
	return taurus.augmentString('taurus.menu.Menu',Base.extend({
		isMenu: true,
		tagName:'ul',
		className:'dropdown-menu',
		events:{
			'mouseleave li':'onMouseLeave',
			'mouseenter li':'onMouseOver',
			'click li': 'onClick'
		},
		initialize:function(){
			this.renderTo = $(document.body);
	        Base.prototype.initialize.apply(this,arguments);
	        Manager.register(this)
		},

	    /**
	     * Returns whether a menu item can be activated or not.
	     * @return {Boolean}
	     */
	    canActivateItem: function(item) {
	        return item && !item.isDisabled() && item.isVisible() && (item.canActivate || !item.isMenuItem);
	    },

	    /**
	     * Deactivates the current active item on the menu, if one exists.
	     */
	    deactivateActiveItem: function(andBlurFocusedItem) {
	        var me = this,
	            activeItem = me.activeItem,
	            focusedItem = me.focusedItem;

	        if (activeItem) {
	            activeItem.deactivate();
	            if (!activeItem.activated) {
	                delete me.activeItem;
	            }
	        }

	        // Blur the focused item if we are being asked to do that too
	        // Only needed if we are being hidden - mouseout does not blur.
	        if (focusedItem && andBlurFocusedItem) {
	            //focusedItem.blur();
	            delete me.focusedItem;
	        }
	    },
	    // @private
	    getItemFromEvent: function(e) {
	        return $(e.currentTarget).data('component')
	    },

	    // @inheritdoc
	    hide: function() {
	        this.deactivateActiveItem(true);
	        Base.prototype.hide.apply(this,arguments);
	    },
		lookupComponent: function(cmp) {
	        var me = this;

	        if (typeof cmp == 'string') {
	            cmp = me.lookupItemFromString(cmp);
	        } else if (_.isObject(cmp)) {
	            cmp = me.lookupItemFromObject(cmp);
	        }

	        // Apply our minWidth to all of our child components so it's accounted
	        // for in our VBox layout
	        cmp.minWidth = cmp.minWidth || me.minWidth;

	        return cmp;
	    },
	    // @private
	    lookupItemFromObject: function(cmp) {
	        var me = this;

	        if (!(cmp instanceof Backbone.View)) {
	            if (!cmp.cls) {
	                cmp = new MenuItem($.extend(_.omit(cmp, 'cls'),{
						renderTo:this.getItemContainer()
					}));
	            } else {
	                cmp = new cmp.cls($.extend(_.omit(cmp, 'cls'),{
						renderTo:this.getItemContainer()
					}));
	            }
	        }

	        if (cmp.isMenuItem) {
	            cmp.parentMenu = me;
	        }

	        return cmp;
	    },

	    // @private
	    lookupItemFromString: function(cmp) {
	        return (cmp == 'separator' || cmp == '-') ?
	            new Ext.menu.Separator()
	            : new Ext.menu.Item({
	                canActivate: false,
	                hideOnClick: false,
	                plain: true,
	                text: cmp
	            });
	    },

	    onClick: function(e) {
	        var me = this,
	            type = e.type,
	            item;

	        /*if (me.disabled) {
	            e.stopEvent();
	            return;
	        }*/

	        // if e.type !== 'keydown', then we're dealing with a click or tap event
	        item = (type !== 'keydown') ? me.getItemFromEvent(e) : me.activeItem;
	        if (item && item.isMenuItem) {
	            if (!item.menu || !me.ignoreParentClicks) {
	                item.onClick(e);
	            } else {
	                e.stopEvent();
	            }
	        }
	        // Click event may be fired without an item, so we need a second check
	        if (!item || item.disabled) {
	            item = undefined;
	        }
	        //me.fireEvent('click', me, item, e);
	    },
	    onMouseLeave:function(e){
	        var me = this;

	        me.deactivateActiveItem();

	        if (me.disabled) {
	            return;
	        }
	    },
	    onMouseOver:function(e){
	    	var me = this,
	    	item = me.getItemFromEvent(e),
	    	parentMenu = me.parentMenu,
	    	ownerItem = me.ownerItem;

	    	if (parentMenu) {
	            parentMenu.setActiveItem(ownerItem);
	            ownerItem.cancelDeferHide();
	            //parentMenu.mouseMonitor.mouseenter();
	        }
	    	// Do not activate the item if the mouseover was within the item, and it's already active
	        if (item && !item.activated) {
	            me.setActiveItem(item);
	            if (item.activated && item.expandMenu) {
	                item.expandMenu();
	            }
	        }
	    },

	    setActiveItem: function(item) {
	        var me = this;

	        if (item && (item != me.activeItem)) {
	            me.deactivateActiveItem();
	            if (me.canActivateItem(item)) {
	                if (item.activate) {
	                    // Activate passing skipCheck flag. We checked using me.canActivate()
	                    item.activate(true);
	                    if (item.activated) {
	                        me.activeItem = item;
	                        me.focusedItem = item;
	                    }
	                } else {
	                    //item.focus();
	                    me.focusedItem = item;
	                }
	            }
	            // Activating will focus, focusing will scroll the item into view.
	        }
	    }
	}));
});
