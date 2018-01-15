/**
 * @author nttdocomo
 */
;(function (root, factory) {
  if (typeof define === 'function') {
    if (define.amd) {
      define(['../../view/base', '../menu/menu', '../menu/manager', './manager', '../tip/quickTipManager', 'taurus', 'underscore', '../../svg'], factory)
    }
    if (define.cmd) {
      define(function (require, exports, module) {
        return factory(require('../../view/base'), require('../menu/menu'), require('../menu/manager'), require('./manager'), require('../tip/quickTipManager'), require('taurus'), require('underscore'), require('../../svg'))
      })
    }
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('../../view/base'), require('../menu/menu'), require('../menu/manager'), require('./manager'), require('../tip/quickTipManager'), require('taurus'), require('underscore'), require('../../svg'))
  }
}(this, function (Base, Menu, MenuManager, ButtonManager, quickTipManager, taurus, _, SVG) {
  return Base.extend({
    /*
	     * @property {Boolean}
	     * `true` in this class to identify an object as an instantiated Button, or subclass thereof.
	     */
    isButton: true,
    /**
     * @cfg {String} iconCls
     * @inheritdoc Ext.panel.Header#cfg-iconCls
     */
    /**
     * @cfg {String} clickEvent
     * The DOM event that will fire the handler of the button. This can be any valid event name (dblclick, contextmenu).
     */
    clickEvent: 'click',
    /**
     * @property {Boolean} disabled
     * True if this button is disabled.
     * @readonly
     */
    disabled: false,
    /**
     * @cfg {Boolean} [enableToggle=false]
     * True to enable pressed/not pressed toggling.
     */
    enableToggle: false,
    /**
     * @cfg {Number/String} glyph
     * @inheritdoc Ext.panel.Header#glyph
     */
    glyph: null,
    /**
     * @property {Boolean} pressed
     * True if this button is pressed (only if enableToggle = true).
     * @readonly
     */
    pressed: false,
    iconBeforeText: false,
    iconAlign: 'left',
    _baseIconCls: taurus.baseCSSPrefix + 'btn-icon-el',
    _glyphCls: taurus.baseCSSPrefix + 'btn-glyph',
    overCls: taurus.baseCSSPrefix + 'btn-over',
    _hasIconCls: taurus.baseCSSPrefix + 'btn-icon',
    _innerCls: taurus.baseCSSPrefix + 'btn-inner',

    tpl: '<%if(iconBeforeText){%><%=icon%><%}%><span class="<%=innerCls%> <%=innerCls%>-<%=ui%>"><%=text%></span><%if(split){%> <span class="caret"></span><%}%>',
    iconTpl: '<i id="<%=id%>-btnIconEl" class="<%=_baseIconCls%> <%=iconCls%>" style="<%if(glyph){if(glyphFontFamily){%>font-family:<%=glyphFontFamily%>;<%}}%>"></i>',
    pressedCls: 'active',
    tagName: 'button',
    className: 'btn',
    svg: null,
    //uiClass: 'btn-default',
    /**
     * @cfg {String} [baseCls='x-btn']
     * The base CSS class to add to all buttons.
     */
    baseCls: taurus.baseCSSPrefix + 'btn',
    _disabledCls: taurus.baseCSSPrefix + 'btn-disabled',
    menuAlign: {
      'my': 'left top',
      'at': 'left bottom',
      'collision': 'none none'
    },
    events: {
      'mousedown': 'onMouseDown'
    },
    defaultBindProperty: 'text',
    childEls: {
      'btnIconEl': '[id$="btnIconEl"]',
      'btnInnerEl': '.btn-inner'
    },
    constructor: function (options) {
      if (options.href) {
        this.tagName = 'a'
      }
      Base.call(this, options)
      if (options.href) {
        this.$el.attr('href', this.href)
      }
    },
    didIconStateChange: function (old, current) {
      var currentEmpty = _.isEmpty(current)
      return _.isEmpty(old) ? !currentEmpty : currentEmpty
    },
    disable: function () {
      var me = this
      Base.prototype.disable.apply(me, arguments)
      me.$el.addClass(me._disabledCls)
    },
    doToggle: function (e) {
      var me = this
      if (me.enableToggle && (me.allowDepress !== false || !me.pressed)) {
        me.toggle()
      }
    },

    doPreventDefault: function (e) {
      if (e && (this.preventDefault || (this.disabled && this.getHref()))) {
        e.preventDefault()
      }
    },
    enable: function () {
      var me = this
      Base.prototype.enable.apply(me, arguments)
      me.$el.removeClass(me._disabledCls)
    },
    _ensureElement: function () {
      var me = this
      if (me.split) {
        me.tagName = 'div'
        me.baseCls = taurus.baseCSSPrefix + 'btn-group'
      }
      me._super.apply(me, arguments)
    },

    /**
     * @private
     * If there is a configured href for this Button, returns the href with parameters appended.
     * @return {String/Boolean} The href string with parameters appended.
     */
    getHref: function () {
      var me = this,
        href = me.href

      // return href ? Ext.urlAppend(href, Ext.Object.toQueryString(Ext.apply({}, me.params, me.baseParams))) : false
      return href
    },
    getTplData: function () {
      var me = this
      var glyph = me.glyph
      var glyphFontFamily = me.glyphFontFamily
      return $.extend({
        text: me.text || '',
        split: me.isSplitButton || me.menu,
        menu: !_.isUndefined(me.menu),
        comp: me,
        innerCls: me._innerCls,
        ui: me.ui,
        icon: me.renderIcon({
          id: me.id,
          iconCls: me.iconCls,
          iconUrl: me.iconUrl,
          _baseIconCls: me._baseIconCls,
          glyph: glyph,
          glyphCls: glyph ? me._glyphCls : '',
          glyphFontFamily: glyphFontFamily
        }),
        iconBeforeText: me.iconBeforeText
      }, Base.prototype.getTplData.apply(me, arguments))
    },

    fireHandler: function (e) {
      var me = this, handler = me.handler

      if (me.trigger('click', me, e) !== false) {
        if (handler) {
          handler.apply(me, [e, me])
        }
      // me.blur()
      }
    },

    /**
     * Returns true if the button has a menu and it is visible
     * @return {Boolean}
     */
    hasVisibleMenu: function () {
      var menu = this.menu
      return menu && menu.rendered && menu.isVisible()
    },

    maybeShowMenu: function () {
      var me = this
      if (me.menu && !me.hasVisibleMenu() && !me.ignoreNextClick) {
        me.showMenu()
      }
    },

    // @private
    onClick: function (e) {
      var me = this
      me.doPreventDefault(e)

      // Can be triggered by ENTER or SPACE keydown events which set the button property.
      // Only veto event handling if it's a mouse event with an alternative button.
      // Checking e.button for a truthy value (instead of != 0) also allows touch events
      // (tap) to continue, as they do not have a button property defined.
      if (e.type !== 'keydown' && e.button) {
        return
      }
      if (!me.disabled) {
        me.doToggle(e)
        me.maybeShowMenu()
        me.fireHandler(e)
      }
      me.trigger('click')
    },
    /*onClick : function(e) {
    	var me = this
    	if (!me.disabled) {
    		me.doToggle(e)
    		me.maybeShowMenu()
    		me.fireHandler(e)
    	}
    },*/

    // private
    onMouseDown: function (e) {
      var me = this, target = $(e.target)
      if (!me.disabled) {
        me.$el.addClass(me.pressedCls)
        var onMouseUp = _.bind(function (e) {
          var me = this
          if (!this.pressed) {
            me.$el.removeClass(me.pressedCls)
          }
          this.doc.off('mouseup', onMouseUp)
        }, me)
        me.doc.on('mouseup', onMouseUp)
      }
    },

    beforeRender: function () {
      var me = this
      if (me.disabled) {
        me.$el.attr('disabled', true)
      }

      if (me.pressed) {
        me.$el.addClass(this.pressedCls)
      }
      me._super.apply(me, arguments)
    },
    render: function () {
      var me = this
      Base.prototype.render.apply(me, arguments)
      ButtonManager.register(me)
      if (me.size) {
        me.$el.addClass('btn-' + me.size)
      }
      if (me.tooltip) {
        me.setTooltip(me.tooltip, true);
      }
    },

    /**
     * Sets the background image (inline style) of the button. This method also changes the value of the {@link #icon}
     * config internally.
     * @param {String} icon The path to an image to display in the button
     * @return {Ext.button.Button} this
     */
    setIcon: function (icon) {
      icon = icon || ''
      var me = this
      var btnIconEl = me.btnIconEl
      var oldIcon = me.icon || ''
      var svgEl
      if(typeof icon === 'function'){
        icon = icon.call(this, btnIconEl)
        return
      }

      me.icon = icon
      if (icon !== oldIcon) {
        if (btnIconEl) {
          btnIconEl.css('background-image', icon ? 'url(' + icon + ')' : '')
          me._syncHasIconCls()
          if (me.didIconStateChange(oldIcon, icon)) {
            me.updateLayout()
          }
        }
        me.trigger('iconchange', me, oldIcon, icon)
      }
      return me
    },

    /**
     * Sets the `pressed` state of this button.
     * @param {Boolean} [pressed=true] Pass `false` to clear the `pressed` state.
     * @return {Ext.button.Button} this
     */
    setPressed: function (pressed) {
      return this.toggle(pressed !== false);
    },

    setText: function (text) {
      var me = this
      var btnInnerEl = me.btnInnerEl
      this.text = text
      btnInnerEl.html(text || '&#160;')
    },

    /**
     * Sets the tooltip for this Button.
     *
     * @param {String/Object} tooltip This may be:
     *
     *   - **String** : A string to be used as innerHTML (html tags are accepted) to show in a tooltip
     *   - **Object** : A configuration object for {@link Ext.tip.QuickTipManager#register}.
     *
     * @return {Ext.button.Button} this
     */
    setTooltip: function(tooltip, initial) {
      var me = this;

      if (me.rendered) {
        if (!initial || !tooltip) {
          me.clearTip();
        }
        if (tooltip) {
          if (taurus.quickTipsActive && _.isObject(tooltip)) {
            quickTipManager.register(_.extend({
                target: '#' + me.el.id
            }, tooltip));
            me.tooltip = tooltip;
          } else {
            me.el.dom.setAttribute(me.getTipAttr(), tooltip);
          }
        }
      } else {
        me.tooltip = tooltip;
      }
      return me;
    },

    setUI: function (ui) {
      var me = this

      // we need to append the scale to the UI, if not already done
      /*if (me.scale && !ui.match(me.scale)) {
        ui = ui + '-' + me.scale
      }*/

      me._super.apply(me, [ui])
    },

    /**
     * Shows this button's menu (if it has one)
     */
    showMenu: function ( /* private */ fromEvent) {
      var me = this,
        menu = me.menu
      if (menu) {
        delete me.menu
        me.setMenu(menu)
        menu = me.menu
      }

      if (me.rendered) {
        /*if (me.tooltip && Ext.quickTipsActive && me.getTipAttr() != 'title') {
            Ext.tip.QuickTipManager.getQuickTip().cancelShow(me.el)
        }*/
        if (menu.isVisible()) {
          menu.hide()
        }

        if (!fromEvent || me.showEmptyMenu || menu.items.getCount() > 0) {
          menu.showBy(me, me.menuAlign)
        }
      }
      return me
    },
    /**
	     * Set a child menu for this item. See the {@link #cfg-menu} configuration.
	     * @param {Ext.menu.Menu/Object} menu A menu, or menu configuration. null may be
	     * passed to remove the menu.
	     * @param {Boolean} [destroyMenu] True to destroy any existing menu. False to
	     * prevent destruction. If not specified, the {@link #destroyMenu} configuration
	     * will be used.
	     */
    setMenu: function (menu, destroyMenu) {
      var me = this,
        oldMenu = me.menu

      if (oldMenu) {
        delete oldMenu.parentMenu
        delete oldMenu.ownerItem

        if (destroyMenu === true || (destroyMenu !== false && me.destroyMenu)) {
          // Ext.destroy(oldMenu)
        }
      }
      if (menu) {
        me.menu = MenuManager.get(menu)
        me.menu.ownerItem = me
      } else {
        me.menu = null
      }
    },

    renderIcon: function (values) {
      return _.template(this.iconTpl)(values)
    },

    /**
     * If a state it passed, it becomes the pressed state otherwise the current state is toggled.
     * @param {Boolean} [state] Force a particular state
     * @param {Boolean} [suppressEvent=false] True to stop events being fired when calling this method.
     * @return {Ext.button.Button} this
     */
    toggle: function (state, suppressEvent) {
      var me = this
      state = state === undefined ? !me.pressed : !!state
      if (state !== me.pressed) {
        me.$el[state ? 'addClass' : 'removeClass'](me.pressedCls)
        me.pressed = state
        if (!suppressEvent) {
          me.trigger('toggle', me, state)
          me.toggleHandler && me.toggleHandler.apply(me, [state])
        }
      }
      return me
    },
    delegateEvents: function (events) {
      events = events || {}
      events[this.clickEvent] = 'onClick'
      Base.prototype.delegateEvents.call(this, events)
    },
    _hasIcon: function () {
      return !!(this.icon || this.iconCls || this.glyph)
    },

    _syncHasIconCls: function () {
      var me = this,
        btnEl = me.$el,
        hasIconCls = me._hasIconCls

      if (btnEl) {
        btnEl[me._hasIcon() ? 'addClass' : 'removeClass']([
          hasIconCls,
          hasIconCls + '-' + me.iconAlign
        ].join(' '))
      }
    }
  })
}))
