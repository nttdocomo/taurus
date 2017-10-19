/**
 * @author nttdocomo
 */
;(function (root, factory) {
  if (typeof define === 'function') {
    if (define.amd) {
      define(['./toolTip', 'underscore', 'taurus'], factory)
    }
    if (define.cmd) {
      define(function (require, exports, module) {
        return factory(require('./toolTip'), require('underscore'), require('taurus'))
      })
    }
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('./toolTip'), require('underscore'), require('taurus'))
  }
}(this, function (ToolTip, _, taurus) {
  function id(obj, prefix){
    return obj;
  }
  return ToolTip.extend({
    /**
     * @cfg {Boolean} interceptTitles
     * `true` to automatically use the element's DOM title value if available.
     */
    interceptTitles : false,
    tagConfig : {
      namespace : 'data-',
      attribute : 'qtip',
      width : 'qwidth',
      target : 'target',
      title : 'qtitle',
      hide : 'hide',
      cls : 'qclass',
      align : 'qalign',
      anchor : 'anchor',
      showDelay: 'qshowDelay',
      hideAction: 'hideAction',
      anchorTarget: 'anchorTarget'
    },
    initComponent : function(){
      var me = this
      var cfg = me.tagConfig
      var attr = cfg.attr || (cfg.attr = cfg.namespace + cfg.attribute)

      // delegate selector is a function which detects presence
      // of attributes which provide QuickTip text.
      me.delegated = _.bind(me.delegated, me);

      me.target = me.target || taurus.$doc;
      me.targets = me.targets || {};
      
      me.header = me.header || {};
      me.header.focusableContainer = false;
      
      me._super.apply(this, arguments);
      this.hide()
    },
    activateTarget: function(){
      var me = this
      var activeTarget = me.activeTarget
      var delay = activeTarget.showDelay
      var hideAction = activeTarget.hideAction

      // If moved from target to target rapidly, the hide delay will not
      // have fired, so just update content and alignment.
      if (me.isVisible()) {
        me.updateContent();
        me.realignToTarget();
      } else {
        if (activeTarget.showDelay) {
            delay = me.showDelay;
            me.showDelay = parseInt(activeTarget.showDelay, 10);
        }
        me.delayShow();
        if (activeTarget.showDelay) {
            me.showDelay = delay;
        }
        if (!(hideAction = activeTarget.hideAction)) {
            delete me.hideAction;
        } else {
            me.hideAction = hideAction;
        }
      }
      if(_.isBoolean(activeTarget.autoHide)){
        me.autoHide = activeTarget.autoHide;
      } else {
        me.autoHide = true;
      }
    },

    /**
     * @private
     * Reads the tip text from the target.
     */
    getTipText: function (target) {
      var titleText = target.title
      var cfg = this.tagConfig
      var attr = cfg.attr || (cfg.attr = cfg.namespace + cfg.attribute)
      var text;

      if (this.interceptTitles && titleText) {
        target.attr(attr, titleText);
        target.removeAttr('title');
        return taurus.htmlEncode(titleText)
      }
      else {
        return taurus.htmlEncode(target.attr(attr))
      }
    },
    onTargetEnter: function(e){
      var me = this
      var currentTarget = me.currentTarget
      var target
      var related = e.relatedTarget
      var match, $target
      /*if (!target || target.nodeType !== 1 || target === document.documentElement || target === document.body){
        return;
      }*/
      var targets = me.targets
      for (key in targets) {
        if (targets.hasOwnProperty(key)) {
          registeredTarget = targets[key];
          target = e.target
          $target = $(registeredTarget.target)
          while ( target && target != document && !( match = $target.is(target) ) ) {
            target = target.parentNode;
          }

          // exit if no matching node has been found
          if ( !match ) { continue; }
          // loop through the parent of the related target to make sure that it's not a child of the target
          while ( related && related != target && related != document ) {
            related = related.parentNode;
          }

          // exit if this is the case
          if ( related == target ) { continue; }
          // If we moved over a registered target from outside of it, activate it.
          //if (registeredTarget.target && $target.length && ($target.is(target) || ($.contains($target.get(0), target) && !$.contains($target.get(0), event.relatedTarget)))) {

            //currentTarget.attach(target);
            me.currentTarget = $target
            me.activeTarget = registeredTarget;
            registeredTarget.el = currentTarget;
            me.anchor = me.updateAnchor(registeredTarget.anchor);
            me.activateTarget();
            //return;
          //}
        }
        me._super(e)
      }
    },
    handleTargetOver: function(target, event){
      var me = this
      var currentTarget = me.currentTarget
      var cfg = me.tagConfig
      var ns = cfg.namespace
      var tipText = me.getTipText(target, event)
      var autoHide

      if (tipText) {

        autoHide = currentTarget.attr(ns + cfg.hide);

        me.activeTarget = {
          el: currentTarget,
          text: tipText/*,
          width: +currentTarget.getAttribute(ns + cfg.width) || null,
          autoHide: autoHide !== "user" && autoHide !== 'false',
          title: currentTarget.getAttribute(ns + cfg.title),
          cls: currentTarget.getAttribute(ns + cfg.cls),
          align: currentTarget.getAttribute(ns + cfg.align),
          showDelay: currentTarget.getAttribute(ns + cfg.showDelay),
          hideAction: currentTarget.getAttribute(ns + cfg.hideAction),
          alignTarget: currentTarget.getAttribute(ns + cfg.anchorTarget)*/
        };

        // If we were not configured with an anchor, allow it to be set by the target's properties
        if (!me.initialConfig.hasOwnProperty('anchor')) {
            me.anchor = currentTarget.attr(ns + cfg.anchor);
        }

        // If we are anchored, and not configured with an anchorTarget, anchor to the target element, or whatever its 'data-anchortarget' points to
        if (me.anchor && !me.initialConfig.hasOwnProperty('anchorTarget')) {
            me.alignTarget = me.activeTarget.alignTarget || target;
        }

        me.activateTarget();
      }
    },

    /**
     * @private
     */
    handleTargetOut : function(e){
      var me = this
      var active = me.activeTarget
      var autoHide = me.autoHide
      var hideDelay = me.hideDelay
      console.log(autoHide)
      if (active && autoHide !== false) {
        me.autoHide = true;
        if (active.hideDelay) {
          me.hideDelay = parseInt(active.hideDelay, 10);
        }
        me._super(e);
        me.autoHide = autoHide;
        me.hideDelay = hideDelay;
      }
    },
    updateAnchor: function(anchor){
      var me = this
      me.$el.removeClass(me.anchor).addClass(anchor)
      return anchor
    },

    /**
     * @cfg html
     * @hide
     * -- hidden for Ext.tip.QuickTip - see #cfg-text
     */

    /**
     * Configures a new quick tip instance and assigns it to a target element.
     *
     * For example usage, see the {@link Ext.tip.QuickTipManager} class header.
     *
     * @param {Object} config The config object with the following properties:
     * @param config.target (required) The target HTMLElement, {@link Ext.dom.Element} or 
     * id to associate with this Quicktip.  See {@link Ext.tip.QuickTip#target}.
     * @param config.text Tip body content.  See {@link Ext.tip.QuickTip#text}.
     * @param config.title Tip header.  See {@link Ext.tip.QuickTip#title}.
     * @param config.autoHide False to prevent the tip from automatically hiding on 
     * mouseleave.  See {@link Ext.tip.QuickTip#autoHide}.
     * @param config.cls An optional extra CSS class that will be added to the tip.  See 
     * {@link Ext.tip.QuickTip#cls}.
     * @param config.dismissDelay Delay in milliseconds before the tooltip automatically 
     * hides (overrides singleton value).  See {@link Ext.tip.QuickTip#dismissDelay}.
     * @param config.width Tip width in pixels.  See {@link Ext.tip.QuickTip#width}.
     */
    register : function(config){
      var configs = _.isArray(config) ? config : arguments
      var i = 0
      var len = configs.length
      var target, j, targetLen

      for (; i < len; i++) {
        config = configs[i];
        target = config.target;
        if (target) {
          if (_.isArray(target)) {
            for (j = 0, targetLen = target.length; j < targetLen; j++) {
              this.targets[id(target[j])] = config;
            }
          } else{
            this.targets[id(target)] = config;
          }
        }
      }
    },

    /**
     * Removes this quick tip from its element and destroys it.
     * @param {String/HTMLElement/Ext.dom.Element} el The element from which the quick tip
     * is to be removed or ID of the element.
     */
    unregister : function(id){
      delete this.targets[id];
    },

    /**
     * @private
     */
    updateContent : function() {
      var me = this
      var target = me.activeTarget
      var header = me.header
      var dismiss, cls

      if (target) {
        me.update(target.text);
        /*me.suspendLayouts();
        if (target.title) {
            me.setTitle(target.title);
            header.show();
        } else if (header) {
            header.hide();
        }
        me.update(target.text);
        me.autoHide = target.autoHide;
        dismiss = target.dismissDelay;
        
        me.dismissDelay = Ext.isNumber(dismiss) ? dismiss : me.dismissDelay;

        cls = me.lastCls;
        if (cls) {
            me.removeCls(cls);
            delete me.lastCls;
        }

        cls = target.cls;
        if (cls) {
            me.addCls(cls);
            me.lastCls = cls;
        }

        me.setWidth(target.width);

        me.align = target.align;
        me.resumeLayouts(true);*/
      }
    },

    /**
     * @inheritdoc Ext.tip.Tip#method-beforeShow
     */
    beforeShow : function() {
      this.updateContent();
      this._super.apply(this, arguments);
    },
    
    delegated: function(target) {
      var me = this
      var cfg = me.tagConfig
      var attr = cfg.attr || (cfg.attr = cfg.namespace + cfg.attribute)
      var text;

      // We can now only activate on elements which have the required attributes
      text = target.attr(attr) || (me.interceptTitles && target.attr(title))
      return !!text;
    }
  })
}))