/**
 * @author nttdocomo
 */
 (function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['../view/base','./manager','underscore'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('../view/base'),require('./manager'),require('underscore'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('../view/base'),require('./manager'),require('underscore'));
	}
}(this, function(Base,Manager,_) {
	return Base.extend({
		isMenuItem: true,
		canActivate:true,
		tagName:'li',
		hideOnClick:true,
		menuAlign: {
			"my" : "left top",
			"at" : "right top",
			"collision" : "none none"
		}/*'tl-tr?'*/,
	    /**
	     * @cfg {Number} menuExpandDelay
	     * The delay in milliseconds before this item's sub-menu expands after this item is moused over.
	     */
	    menuExpandDelay: 200,
	    menuHideDelay:200,
	    clickHideDelay:0,
	    activeCls:'active',
		tpl:'<a href="<%if(href){%><%=href%><%}else{%>#<%}%>"><%=text%><%if(menu){%> <span class="caret"></span><%}%></a>',
		activate: function(skipCheck) {
	        var me = this;

	        if (skipCheck || (!me.activated && me.canActivate && me.rendered && !me.isDisabled() && me.isVisible())) {
	            if (!me.plain) {
	                me.$el.addClass(me.activeCls);
	            }

	            // Delay focus so as not to focus/blur during mousemoves, and keyboard navigation
	            // This was the cause of perf problems on IE: https://sencha.jira.com/browse/EXTJSIV-7488
	            //me.focus(false, true);
	            me.activated = true;
	            /*if (me.hasListeners.activate) {
	                me.fireEvent('activate', me);
	            }*/
	        }
	    },
    
	    cancelDeferHide: function(){
	        clearTimeout(this.hideMenuTimer);
	    },

	    deactivate: function() {
	        var me = this,
	            parent;

	        if (me.activated) {
	            //parent = me.up('');
	            if (!me.plain) {
	                me.$el.removeClass(me.activeCls);
	            }

	            // Delay focus of parent so as not to focus/blur during mousemoves, and keyboard navigation
	            // This was the cause of perf problems on IE: https://sencha.jira.com/browse/EXTJSIV-7488
	            /*if (parent) {
	                parent.focus(false, true);
	            }*/
	            me.hideMenu();
	            me.activated = false;
	            /*if (me.hasListeners.deactivate) {
	                me.fireEvent('deactivate', me);
	            }*/
	        }
	    },

	    deferHideMenu: function() {
	        if (this.menu instanceof Backbone.View && this.menu.isVisible()) {
	            this.menu.hide();
	        }
	    },

	    deferHideParentMenus: function() {
	        var ancestor;
	        Manager.hideAll();

	        /*if (!Ext.Element.getActiveElement()) {
	            // If we have just hidden all Menus, and there is no currently focused element in the dom, transfer focus to the first visible ancestor if any.
	            ancestor = this.up(':not([hidden])');
	            if (ancestor) {
	                ancestor.focus();
	            }
	        }*/
	    },

	    doExpandMenu: function() {
	        var me = this,
	            menu = me.menu;
			if (menu) {
	            delete me.menu;
	            me.setMenu(menu);
	        }
	        menu = me.menu;
	        if (me.activated && (menu.rendered || menu.isVisible())) {
	            me.parentMenu.activeChild = menu;
	            menu.ownerItem = me;
	            menu.parentMenu = me.parentMenu;
	            menu.constrainTo = document.body;
				if(me.parentMenu.isNav){
					me.menuAlign = {
						"my" : "left top",
						"at" : "left bottom",
						"collision" : "none none"
					};
				};
	            menu.showBy(me, me.menuAlign);
	        }
	    },
	    expandMenu: function(delay) {
	        var me = this;

	        if (me.menu) {
	            me.cancelDeferHide();
	            if (delay === 0) {
	                me.doExpandMenu();
	            } else {
	                clearTimeout(me.expandMenuTimer);
	                me.expandMenuTimer = _.delay(_.bind(me.doExpandMenu,me),_.isNumber(delay) ? delay : me.menuExpandDelay);
	            }
	        }
	    },

	    hideMenu: function(delay) {
	        var me = this;

	        if (me.menu) {
	            clearTimeout(me.expandMenuTimer);
	            me.hideMenuTimer = _.delay(_.bind(me.deferHideMenu,me),_.isNumber(delay) ? delay : me.menuHideDelay);//Ext.defer(me.deferHideMenu, Ext.isNumber(delay) ? delay : me.menuHideDelay, me);
	        }
	    },
		initialize:function(){
	        Base.prototype.initialize.apply(this,arguments);
			var me = this;
		},
		getTplData:function(){
			return {
				text:this.text,
				menu:!_.isUndefined(this.menu),
				href:this.href
			}
		},

	    onClick: function (e) {
	        var me = this,
	            clickHideDelay = me.clickHideDelay,
	            clickResult,
	            preventDefault;

	        if (!me.href || me.disabled) {
	            e.stopPropagation();
	        }

	        if (me.disabled || me.handlingClick) {
	            return;
	        }

	        if (me.hideOnClick && 
	            // on mobile webkit, when the menu item has an href, a longpress will trigger
	            // the touch callout menu to show.  If this is the case, the tap event object's
	            // browser event type will be 'touchcancel', and we do not want to hide the menu.
	            e.type !== 'touchcancel' &&
	            // items with submenus are activated by touchstart on mobile browsers, so 
	            // we cannot hide the menu on "tap"
	            !me.menu) {

	            if (!clickHideDelay) {
	                me.deferHideParentMenus();
	            } else {
	                me.deferHideParentMenusTimer = Ext.defer(me.deferHideParentMenus, clickHideDelay, me);
	            }
	        }

	        //Ext.callback(me.handler, me.scope, [me, e], 0, me);
	        me.trigger('click', me, e);
	        if (me.handler) {
	            clickResult = me.handler()
	        }

	        // If there's an href, invoke dom.click() after we've fired the click event in case a click
	        // listener wants to handle it.
	        //
	        // Note that we're having to do this because the key navigation code will blindly call stopEvent()
	        // on all key events that it handles!
	        //
	        // But, we need to check the browser event object that was passed to the listeners to determine if
	        // the default action has been prevented.  If so, we don't want to honor the .href config.
	        
	        preventDefault = !!e.isDefaultPrevented();

	        if (me.href && !preventDefault) {
	            me.handlingClick = true;
	            //me.itemEl.dom.click();
	            delete me.handlingClick;
	        }

	        /*if (!me.hideOnClick) {
	            me.focus();
	        }*/
	        return clickResult;
	    },
		/**
	     * Set a child menu for this item. See the {@link #cfg-menu} configuration.
	     * @param {Ext.menu.Menu/Object} menu A menu, or menu configuration. null may be
	     * passed to remove the menu.
	     * @param {Boolean} [destroyMenu] True to destroy any existing menu. False to
	     * prevent destruction. If not specified, the {@link #destroyMenu} configuration
	     * will be used.
	     */
	    setMenu: function(menu, destroyMenu) {
	        var me = this,
	            oldMenu = me.menu;
	            
	        if (oldMenu) {
	            delete oldMenu.parentMenu;
	            delete oldMenu.ownerItem;
	            
	            if (destroyMenu === true || (destroyMenu !== false && me.destroyMenu)) {
	                //Ext.destroy(oldMenu);
	            }
	        }
	        if (menu) {
	            me.menu = Manager.get(menu);
	            me.menu.ownerItem = me;
	        } else {
	            me.menu = null;
	        }
	    }
	});
}));