/**
 * @author nttdocomo
 */
define(function(require) {
	var Class = require('../class'),
	_ = require('underscore');
	return new (Class.extend({
		menus: {},
		init: function() {
	        var me = this;
	        
	        me.active = [];
	        $(document).on('keypress',_.bind(function(e) {
	        	if(e.keyCode == 27){
		            if (me.active.length > 0) {
		                me.hideAll();
		            }
	        	}
	        }, me));
	    },
		/**
	     * Returns a {@link Ext.menu.Menu} object
	     * @param {String/Object} menu The string menu id, an existing menu object reference, or a Menu config that will
	     * be used to generate and return a new Menu this.
	     * @return {Ext.menu.Menu} The specified menu, or null if none are found
	     */
	    get: function(menu) {
	        var menus = this.menus;
	        
	        if (typeof menu == 'string') { // menu id
	            if (!menus) {  // not initialized, no menus to return
	                return null;
	            }
	            return menus[menu];
	        } else if (menu.isMenu) {  // menu instance
	            return menu;
	        } else if (_.isArray(menu)) { // array of menu items
	            return new taurus.menu.Menu({items:menu});
	        } else { // otherwise, must be a config
	            return new taurus.menu.Menu(menu);
	        }
	    },

	    /**
	     * Hides all menus that are currently visible
	     * @return {Boolean} success True if any active menus were hidden.
	     */
	    hideAll: function() {
	        var active = this.active,
	            menus, m, mLen;

	        if (active && active.length > 0) {
	            menus = active;
	            mLen  = menus.length;

	            for (m = 0; m < mLen; m++) {
	                menus[m].hide();
	            }

	            return true;
	        }
	        return false;
	    },

	    // @private
	    onMouseDown: function(e) {
	        var me = this,
	            active = me.active,
	            activeMenuCount = active.length,
	            lastShow = me.lastShow,
	            i;
	        for (i = 0; i < activeMenuCount; i++) {
                if (active[i].$el.has(e.target).length) {
                    return;
                }
            }

	        /*if (Ext.Date.getElapsed(lastShow) > 50 && activeMenuCount) {
	            // Because we use a buffer in IE, the target may have been removed from the
	            // DOM by the time we get here, so the selector will never find the menu. In this
	            // case, it's safer to not hide than menus than to do so
	            if (Ext.isIE9m && !Ext.getDoc().contains(e.target)) {
	                return;
	            }
	            else {
	                // If any active menus are an ancestor of the target element, we don't hide
	                for (i = 0; i < activeMenuCount; i++) {
	                    if (active.items[i].owns(e.target)) {
	                        return;
	                    }
	                }
	            }
	            me.hideAll();
	        }*/
	        me.hideAll();
	    },

	    onShow: function(m) {
	        var me = this,
	            active   = me.active,
	            attached = me.attached;

	        me.lastShow = new Date();
	        active.push(m);
	        if (!attached) {
	        	$(document).on('mousedown',_.bind(me.onMouseDown,me))
	        	//$.gevent.subscribe($({}), 'mousedown', _.bind(me.onMouseDown,me));
	            me.attached = true;
	        }
	        //m.toFront();
	    },

	    // @private
	    register: function(menu) {
	        var me = this;

	        if (!me.active) {
	            me.init();
	        }

	        //if (menu.floating) {
            me.menus[menu.id] = menu;
            menu.on({
                //beforehide: me.onBeforeHide,
                //hide: me.onHide,
                //beforeshow: me.onBeforeShow,
                'show': me.onShow,
                //scope: me
            },me);
	        //}
	    }
	}));
});
