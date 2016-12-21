/**
 * @author nttdocomo
 */
;(function (root, factory) {
  if (typeof define === 'function') {
    if (define.amd) {
      define(['../state/stateful', '../util/focusable', '../util/itemCollection', 'underscore', 'taurus', 'backbone', '../class/configurator', 'backbone-super', '../lang/number', '../mixins', '../jquery.ui.position'], factory)
    }
    if (define.cmd) {
      define(function (require, exports, module) {
        return factory(require('../state/stateful'), require('../util/focusable'), require('../util/itemCollection'), require('underscore'), require('taurus'), require('backbone'), require('../class/configurator'), require('backbone-super'), require('../lang/number'), require('../mixins'), require('../jquery.ui.position'))
      })
    }
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('../state/stateful'), require('../util/focusable'), require('../util/itemCollection'), require('underscore'), require('taurus'), require('backbone'), require('../class/configurator'), require('backbone-super'), require('../lang/number'), require('../mixins'), require('../jquery.ui.position'))
  }
}(this, /*taurus.klass(['../state/stateful','../util/focusable','../util/itemCollection','underscore','taurus','backbone','backbone-super','../lang/number','../mixins','../jquery.ui.position'],*/function (Stateful, Focusable, ItemCollection, _, taurus, Backbone, Configurator) {
  return Backbone.View.extend({
    isRendered: false,
    doc: taurus.$doc,
    baseCls: taurus.baseCSSPrefix + 'component',
    ui: 'default',
    items: undefined,
    constructor: function (config) {
      Backbone.View.call(this, config)
      this.initConfig(config)
    },
    initConfig: function (instanceConfig) {
      var me = this
      var cfg = me.getConfigurator()
      me.initConfig = taurus.emptyFn
      // ignore subsequent calls to initConfig
      me.initialConfig = instanceConfig || {}
      cfg.configure(me, instanceConfig)
      return me
    },
    getConfigurator: function () {
      // the Ext.Configurator ctor will set $config so micro-opt out fn call:
      return this.$config || new Configurator(this)
    },
    _ensureElement: function () {
      var me = this
      if (!me.el) {
        var attrs = _.extend({}, _.result(me, 'attributes'))
        if (me.id)
          attrs.id = _.result(me, 'id')
        else
          me.id = attrs.id = _.result(me, 'cid')
        if (me.className)
          attrs['class'] = _.result(me, 'className')
        var $el = Backbone.$('<' + _.result(me, 'tagName') + '>').attr(attrs)
        me.setElement($el, false)
      } else {
        me.setElement(_.result(me, 'el'), false)
      }
    },
    addClass: function (cls) {
      if (_.isArray(cls)) {
        cls = cls.join(' ')
      }
      this.$el.addClass(cls)
    },
    removeClass: function (cls) {
      this.$el.removeClass(cls)
    },
    disable: function () {
      var me = this
      if (!me.disabled) {
        if (me.rendered) {
          me.onDisable()
        } else {
          me.disableOnRender = true
        }
      }
      me.$el.attr('disabled', true)
      me.disabled = true
    },
    enable: function () {
      var me = this
      me.$el.attr('disabled', false)
      if (me.disabled) {
        me.disabled = false
      }
    },
    getRefOwner: function () {
      var me = this

      // Look for both ownerCt (classic toolkit) and parent (modern toolkit)
      // Look for ownerCmp before floatParent for scenarios like a button menu inside a floating window.
      return me.ownerCt || me.parent || me.$initParent || me.ownerCmp || me.floatParent
    },
    initCls: function () {
      var me = this,
        cls = [me.baseCls]; /*,
                targetCls = me.getComponentLayout().targetCls

            if (targetCls) {
                cls.push(targetCls)
            }

            //<deprecated since=0.99>
            if (Ext.isDefined(me.cmpCls)) {
                if (Ext.isDefined(Ext.global.console)) {
                    Ext.global.console.warn('Ext.Component: cmpCls has been deprecated. Please use componentCls.')
                }
                me.componentCls = me.cmpCls
                delete me.cmpCls
            }
            //</deprecated>

            if (me.componentCls) {
                cls.push(me.componentCls)
            } else {
                me.componentCls = me.baseCls
            }*/

      return cls
    },
    setElement: function (element) {
      var cls = this.initCls()

      this.undelegateEvents()
      this._setElement(element)

      this.$el.addClass(cls.join(' '))
      return this
    },

    /**
     * Retrieves the `id` of this component. Will auto-generate an `id` if one has not already been set.
     * @return {String}
     */
    getId: function () {
      var me = this,
        xtype

      // If we have no id, attempt to gather it from our configuration.
      // Autogenerate it if none was configured.
      if (!(me.id || (me.id = me.initialConfig.id))) {
        xtype = me.getXType()
        if (xtype) {
          xtype = xtype.replace(Ext.Component.INVALID_ID_CHARS_Re, '-')
        } else {
          xtype = Ext.name.toLowerCase() + '-comp'
        }
        me.id = xtype + '-' + me.getAutoId()
      }
      return me.id
    },

    /**
     * Gets the xtype for this component as registered with {@link Ext.ComponentManager}. For a list of all available
     * xtypes, see the {@link Ext.Component} header. Example usage:
     *
     *     var t = new Ext.form.field.Text()
     *     alert(t.getXType());  // alerts 'textfield'
     *
     * @return {String} The xtype
     */
    getXType: function () {
      return this.xtype
    },
    initialize: function (options) {
      var me = this
      this.initialConfig = options
      _.extend(this, options)
      this.initComponent()
      if (me.style) {
        me.initialStyle = me.style
        me.$el.css(me.style)
      }
    // Stateful.prototype.initialize.apply(this,arguments)
    },
    /*on:function(options){
    	var me = this,delegateEvents = {},events = {}
    	for (var ename in options) {
                var config = options[ename]
                if(typeof config.selector !== 'undefined'){
                	if(config.selector){
                		delegateEvents[[ename,options.selector].join(' ')] = config.fn
                	} else {
                		delegateEvents[ename] = config.fn
                	}
                } else {
                	events[ename] = config
                }
            }
            me.delegateEvents(delegateEvents)
            Backbone.View.prototype.on.call(this, events,arguments[1])
    },*/
    initComponent: function () {
      /*
       * if has selector then render, for let the user see the ui as soon as possible
       */
      //this.initItems()
      if (this.renderTo) {
        this.render(this.renderTo, this.operation)
      }
      if (this.autoShow && !this.isContained) {
        this.show()
      }
      this.$el.data('component', this)
      if (this.cls) {
        this.$el.addClass(this.cls)
      }
      this.on(this.listeners)
      this.delegateEvents()
    },

    /**
     * This is used to determine where to insert the 'html', 'contentEl' and 'items' in this component.
     * @private
     */
    getTargetEl: function () {
      return this.frameBody || this.$el
    },
    initItems: function () {
      var me = this, items = me.items
      if (!items || !(items instanceof ItemCollection)) {
        me.items = new ItemCollection()
        if (items) {
          if (!_.isArray(items)) {
            items = [items]
          }
          me.add(items)
        }
      }
      // me.items = []
    },

    /**
     * Method to determine whether this Component is currently disabled.
     * @return {Boolean} the disabled state of this Component.
     */
    isDisabled: function () {
      return this.disabled
    },

    /**
     * Returns `true` if this component is visible.
     *
     * @param {Boolean} [deep=false] Pass `true` to interrogate the visibility status of all parent Containers to
     * determine whether this Component is truly visible to the user.
     *
     * Generally, to determine whether a Component is hidden, the no argument form is needed. For example when creating
     * dynamically laid out UIs in a hidden Container before showing them.
     *
     * @return {Boolean} `true` if this component is visible, `false` otherwise.
     *
     * @since 1.1.0
     */
    isVisible: function (deep) {
      var me = this,
        hidden = !this.$el.is(':visible')

      /*if (me.hidden || !me.rendered || me.isDestroyed) {
          hidden = true
      } else if (deep) {
          hidden = me.isHierarchicallyHidden()
      }*/

      return !hidden
    },
    delegateEvents: function (events) {
      var events = $.extend(events || {}, this.events /*, this.listeners*/)
      Backbone.View.prototype.delegateEvents.call(this, events)
    },
    getTpl: function (data) {
      return this.tpl
    },
    getTplData: function (data) {
      return _.extend({
        id: this.cid
      }, data)
    },

    /**
     * Allows addition of behavior to the disable operation.
     * After calling the superclass's `onDisable`, the Component will be disabled.
     *
     * @template
     * @protected
     */
    onDisable: function () {},
    onShow: function () {},
    setConfig: function(name, value, options) {
      // options can have the following properties:
      // - defaults `true` to only set the config(s) that have not been already set on
      // this instance.
      // - strict `false` to apply properties to the instance that are not configs,
      // and do not have setters.
      var me = this
      var config;
      if (name) {
        if (typeof name === 'string') {
          config = {};
          config[name] = value;
        } else {
          config = name;
        }
        _.each(config, function(value, key){
          me['set' + taurus.util.capitalize(key)](value)
        })
        //me.getConfigurator().reconfigure(me, config, options);
      }
      return me;
    },
    setLocalXY: function (x, y) {
      this.$el.css({ top: y, left: x })
    },

    /**
     * Sets the page XY position of the component. To set the left and top instead, use {@link #setPosition}.
     * This method fires the {@link #event-move} event.
     * @param {Number/Number[]} x The new x position or an array of `[x,y]`.
     * @param {Number} [y] The new y position.
     * @param {Boolean/Object} [animate] True to animate the Component into its new position. You may also pass an
     * animation configuration.
     * @return {Ext.Component} this
     */
    setPagePosition: function (x, y, animate) {
      var me = this,
        p,
        floatParentBox

      me.setPosition(x, y, animate)

      return me
    },

    /**
     * @member Ext.Component
     * Sets the left and top of the component. To set the page XY position instead, use {@link Ext.Component#setPagePosition setPagePosition}. This
     * method fires the {@link #event-move} event.
     * @param {Number/Number[]/Object} x The new left, an array of `[x,y]`, or animation config object containing `x` and `y` properties.
     * @param {Number} [y] The new top.
     * @param {Boolean/Object} [animate] If `true`, the Component is _animated_ into its new position. You may also pass an
     * animation configuration.
     * @return {Ext.Component} this
     */
    setPosition: function (x, y, animate) {
      var me = this
      me.setLocalXY(x, y)
      return me
    },
    show: function () {
      var me = this
      // me.beforeShow()
      me.$el.show()
      me.trigger('show', this)
      me.hidden = false
      me.onShow()
      return me
    },
    showAt: function (x, y, animate) {
      var me = this

      // Not rendered, then animating to a position is meaningless,
      // just set the x,y position and allow show's processing to work.
      if (!me.rendered && (me.autoRender || me.floating)) {
        me.x = x
        me.y = y
        return me.show()
      }
      if (me.floating) {
        me.setPosition(x, y, animate)
      } else {
        me.setPagePosition(x, y, animate)
      }
      return me.show()
    },

    /**
     * Shows this component by the specified {@link Ext.Component Component} or {@link Ext.dom.Element Element}.
     * Used when this component is {@link #floating}.
     * @param {Ext.Component/Ext.dom.Element} component The {@link Ext.Component} or {@link Ext.dom.Element} to show the component by.
     * @param {String} [position] Alignment position as used by {@link Ext.util.Positionable#getAlignToXY}.
     * Defaults to `{@link #defaultAlign}`. See {@link #alignTo} for possible values.
     * @param {Number[]} [offsets] Alignment offsets as used by {@link Ext.util.Positionable#getAlignToXY}. See {@link #alignTo} for possible values.
     * @return {Ext.Component} this
     */
    showBy: function (cmp, pos, off) {
      var me = this

      // <debug>
      /*if (!me.floating) {
          Ext.log.warn('Using showBy on a non-floating component')
      }*/
      // </debug>

      /*if (me.floating && cmp) {
          me.alignTarget = cmp

          if (pos) {
              me.defaultAlign = pos
          }

          if (off) {
              me.alignOffset = off
          }*/
      if (!me.isVisible()) {
        me.show()
      }

      // Could have been vetoed.
      if (!me.hidden) {
        me.alignTo(cmp, pos || me.defaultAlign, off || me.alignOffset)
      }
      // }

      return me
    },
    hide: function () {
      var me = this
      me.hidden = true
      me.$el.hide()
      me.trigger('hide')
      return me
    },
    beforeRender: function () {
      var me = this
      me.setScale(me.scale)
      me.setUI(me.ui)
    },

    /**
     * Method to change the scale of the button. See {@link #scale} for allowed configurations.
     * @param {String} scale The scale to change to.
     */
    setScale: function (scale) {
      if(!scale){
        return
      }
      var me = this
      var ui = me.ui.replace('-' + me.scale, '')

      // check if it is an allowed scale
      /*if (!Ext.Array.contains(me.allowedScales, scale)) {
        throw('#setScale: scale must be an allowed scale (' + me.allowedScales.join(', ') + ')')
      }*/

      me.scale = scale
      me.$el.addClass(me.baseCls + '-' + scale)
    },
    render: function (renderTo, operation) {
      var me = this
      renderTo = renderTo || this.renderTo || $(document.body)
      this.operation = operation || 'append'
      if (this.isRendered || this.rendered) {
        $(renderTo)[this.operation](this.$el)
        return false
      }
      me.beforeRender()
      /*run html brfore append el because the el must has html*/
      $(renderTo)[this.operation](this.$el)
      this.renderHtml()
      this.rendered = true
      this.setSize(this.width, this.height)
      return this
    },
    renderHtml: function (data) {
      this.inserHtml(data)
      var el = document.createElement('div')
      if (this.uiClass) {
        this.$el.addClass(this.uiClass)
      }
      el.appendChild(this.el.cloneNode(true))
      this.isRendered = true
      this.afterRender()
      /*var height = this.height
      if (height) {
      	this.$el.css('height', height)
      }*/
      this.initItems()
      return el.innerHTML
    },
    setUI: function (ui) {
      var me = this,
        uiCls = me.uiCls,
        activeUI = me.activeUI,
        classes
      if (ui === activeUI) {
        // The ui hasn't changed
        return;
      }

      // activeUI will only be set if setUI has been called before. If it hasn't there's no need to remove anything
      if (activeUI) {
        me.removeUIFromElement();
      }
      // Set the UI
      me.ui = ui
      me.activeUI = ui
      me.addUIToElement()
      classes = me.addClsWithUI(uiCls, true)
    },
    addClsWithUI: function (classes, skip) {
      var clsArray = [],
        i = 0
      for (; i < length; i++) {
        cls = classes[i]
        clsArray = clsArray.concat(me.addUIClsToElement(cls))
      }
      return clsArray
    },
    removeUIFromElement: function(){
      var me = this,
        baseClsUI = me.baseCls + '-' + me.ui,
        childEls, childElName, el, suffix

      me.removeClass(baseClsUI)
    },

    /**
     * Method which adds a specified UI to the components element.
     * @private
     */
    addUIToElement: function () {
      var me = this,
        baseClsUI = me.baseCls + '-' + me.ui,
        childEls, childElName, el, suffix

      me.addClass(baseClsUI)
    },
    /**
	     * Method which adds a specified UI + `uiCls` to the components element. Can be overridden
	     * to add the UI to more than just the component's element.
	     * @param {String} uiCls The UI class to add to the element.
	     * @protected
	     */
    addUIClsToElement: function (uiCls) {
      var me = this,
        baseClsUI = me.baseCls + '-' + me.ui + '-' + uiCls,
        result = [ taurus.baseCSSPrefix + uiCls, me.baseCls + '-' + uiCls, baseClsUI ],
        childEls, childElName, el, suffix

      if (me.rendered && me.frame && !Ext.supports.CSS3BorderRadius) {
        // Loop through each frame element, and if they are defined add the ui:
        baseClsUI += '-'
        childEls = me.getChildEls()

        for (childElName in childEls) {
          suffix = childEls[childElName].frame
          if (suffix && suffix !== true) {
            el = me[childElName]
            if (el) {
              el.addCls(baseClsUI + suffix)
            }
          }
        }
      }

      return result
    },
    inserHtml: function (data) {
      var html = ''
      if (this.innerHtml) {
        this.el.innerHTML = this.innerHtml
      } else {
        data = data || this.getTplData()
        if (data) {
          html = this.getTpl() ? _.template(this.getTpl())(data || this) : ''
        }
      }
      if (this.html) {
        html = this.html + html
      }
      this.$el.html(html)
    },
    $html: function (options) {
      return $(this.renderHtml())
    },
    afterRender: function () {
      this.applyChildEls()
      if (this.contentEl) {
        var contentEl = $('#' + this.contentEl)
        this.getContentTarget().append(contentEl)
      }
    },
    applyChildEls: function (childEls) {
      var childEls = $.extend({}, this.childEls, childEls)
      for (var k in childEls) {
        this[k] = this.$el.find(childEls[k])
      }
    },
    getHeight: function () {
      return this.$el.height()
    },
    getWidth: function () {
      return this.$el.width()
    },
    getOuterHeight: function () {
      return this.$el.outerHeight()
    },
    getOuterWidth: function () {
      return this.$el.outerWidth()
    },
    setSize: function (width, height) {
      var me = this

      // support for standard size objects
      if (width && typeof width == 'object') {
        height = width.height
        width = width.width
      }

      // Constrain within configured maxima
      if (typeof width == 'number') {
        me.width = taurus.Number.constrain(width, me.minWidth, me.maxWidth)
      } else if (width === null) {
        delete me.width
      }

      if (typeof height == 'number') {
        me.height = taurus.Number.constrain(height, me.minHeight, me.maxHeight)
      } else if (height === null) {
        delete me.height
      }
      this.updateLayout()
    },
    update: function (htmlOrData) {
      var me = this
      if (_.isString(htmlOrData)) {
        (me.bodyEl || me.$el).html(htmlOrData)
      }
    },
    updateLayout: function () {
      var me = this, width = me.width, height = me.height
      if (typeof width == 'number') {
        me.setWidth(width)
      }
      if (typeof height == 'number') {
        me.setHeight(height)
      }
    },
    setHeight: function (height) {
      return this.$el.css('height', height)
    },
    setWidth: function (width) {
      var borderWidth = parseInt(this.$el.css('borderLeftWidth').replace('px', '')) + parseInt(this.$el.css('borderLeftWidth').replace('px', ''))
      if (!_.isNaN(borderWidth)) {
        width = width - borderWidth
      }
      return this.$el.width(width)
    },
    alignTo: function (element, position, offsets) {

      // element may be a Component, so first attempt to use its el to align to.
      // When aligning to an Element's X,Y position, we must use setPagePosition which disregards any floatParent
      this.$el.css({
        position: 'absolute'
      })
      this.$el.position($.extend({
        'of': element.$el || element
      }, position))
      // this.setPagePosition(this.$el.getAlignToXY(element.$el || element, position, offsets))
      return this
    },
    undelegateEvents: function (useDefault) {
      if (useDefault) {
        Backbone.View.prototype.undelegateEvents.apply(this, arguments)
      }
    },
    getItemContainer: function () {
      return this.$el
    },
    prepareItems: function (items, applyDefaults, cb) {
      if (_.isArray(items)) {
        items = items.slice()
      } else {
        items = [items]
      }
      var me = this, i = 0, len = items.length, item
      for (; i < len; i++) {
        item = items[i]
        if (item == null) {
          items.splice(i, 1); --i; --len
        } else {
          if (item instanceof Backbone.View) {
            items[i] = item
            me.onAdd(item, i, len)
          } else {
            item.initOwnerCt = me
            // item.renderTo = me.$el
            item = me.lookupComponent(item)
            if (item) {
              items[i] = item
            }
            delete item.initOwnerCt
          }
        }
      } /*
			 _.each(items, function(item, i) {
			 if ( item instanceof Backbone.View) {
			 me.onAdd(item, i, len)
			 }
			 var cmp = me.lookupComponent(item)
			 if (cmp) {
			 items[i] = new cmp(_.omit(item, 'cls'))
			 me.onAdd(items[i], i, len)
			 }
			 });*/
      return items
    },
    lookupComponent: function (cmp) {
      var Cls
      if (_.has(cmp, 'class')) {
        Cls = cmp['class']
      } else {
        Cls = this.defaultType
      }
      if (Cls) {
        return new Cls($.extend(_.omit(cmp, 'class'), {
          // renderTo:this.getItemContainer(cmp)
        }))
      }
      return false
    },
    onAdd: function (item, pos, len) {},
    onAdded: function (container) {
      this.ownerCt = container
    },
    getLayout: function () {
      return this.layout
    },
    add: function () {
      var me = this, args = Array.prototype.slice.apply(arguments), index = (typeof args[0] == 'number') ? args.shift() : -1, layout = me.getLayout(),addingArray, items, i, length, item, pos, ret

      if (args.length == 1 && _.isArray(args[0])) {
        items = args[0]
        addingArray = true
      } else {
        items = args
      }
      ret = items = me.prepareItems(items, true)
      length = items.length

      if (!addingArray && length == 1) {
        ret = items[0]
      }

      for (i = 0; i < length; i++) {
        item = items[i]

        pos = (index < 0) ? me.items.length : (index + i)

        if (item.floating) {
          me.floatingItems.add(item)
          item.onAdded(me, pos)
        } else {
          me.items.splice(pos, 0, item)
          try {
            item.onAdded(me, pos)
          } catch(e) {
            console.log(e)
          }
          me.onAdd(item, pos)
          layout && layout.onAdd(item, pos)
        }
      }
      // me.items = items
      me.updateLayout()
      if (me.isRendered) {
        me.updateItems()
      }
      return ret
    /*var me = this, len = this.items.length
     _.each(this.items, function(item, i) {
     me.getItemContainer().append(item.render().$el)
     })
     this.afterRender();*/
    },
    removeItem: function (component, autoDestroy) {
      var me = this,
        c = me.getComponent(component)
      me.doRemove(c, autoDestroy)
      me.updateItems()
      return c
    },
    removeAll: function (autoDestroy) {
      var me = this,removeItems = me.items.slice(),items = [],i = 0,len = removeItems.length
      for (; i < len; i++) {
        item = removeItems[i]
        me.removeItem(item, autoDestroy)

        if (item.ownerCt !== me) {
          items.push(item)
        }
      }
      return items
    },
    doRemove: function (component, doDestroy) {
      var me = this,
        doDestroy = doDestroy === true || (doDestroy !== false && this.autoDestroy),
        isDestroying = component.destroying || doDestroy,
        index = _.indexOf(me.items, component)
      me.items.splice(index, 1)
      component.onRemoved(isDestroying)
    },
    onRemoved: function (destroying) {
      if (destroying) {
        this.remove()
      }
    },
    updateItems: function () {
      var me = this
      _.each(this.items, function (item) {
        var el = $('<div></div>')
        el.append(item.$el)
        item.render(me.getTargetEl(item))
        el.remove()
      })
    },
    insert: function (index, comp) {
      var compIdx
      if (comp) {
        compIdx = _.indexOf(this.items, comp)
        if (compIdx !== -1) {
          return this.move(compIdx, index)
        }
      }
      return this.add(index, comp)
    },
    remove: function () {
      this.components && _.each(this.components, function (item, i) {
        item.remove()
      })
      return Backbone.View.prototype.remove.apply(this, arguments)
    },

    // @private
    getContentTarget: function () {
      return this.$el
    },

    /**
     * Returns the value of {@link #itemId} assigned to this component, or when that
     * is not set, returns the value of {@link #id}.
     * @return {String}
     */
    getItemId: function () {
      return this.cid
    },
    getComponent: function (comp) {
      if (_.isObject(comp)) {
        comp = comp.getItemId()
      }

      var c = _.find(this.items, function (item) {
        return item.cid == comp
      }) || this.items[comp]

      // Only allow finding by index on the main items container
      if (!c && typeof comp != 'number') {
        c = this.floatingItems.get(comp)
      }

      return c
    },
    up: function (selector, limit) {
      return this.$el.parentsUntil(selector).parent().data('component')
    }
  }, {
    INVALID_ID_CHARS_Re: /[\.,\s]/g,
    updateLayout: function () {},
    decorate: function (decorator) {
      var Decorator = function () {},
        overrides = decorator,
        list = this.decoratorList,
        i, newobj

      if (list.indexOf(decorator) == -1) {
        this.decoratorList.push(decorator)
        Decorator.prototype = this
        newobj = new Decorator()
        newobj.parent = Decorator.prototype
        for (i in overrides) {
          if (overrides.hasOwnProperty(i)) {
            newobj[i] = overrides[i]
          }
        }
        return newobj
      }
    }
  }).mixins(Stateful).mixins(Focusable)
}))
