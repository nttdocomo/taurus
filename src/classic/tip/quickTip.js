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
      var me = this,
          cfg = me.tagConfig,
          attr = cfg.attr || (cfg.attr = cfg.namespace + cfg.attribute);

      // delegate selector is a function which detects presence
      // of attributes which provide QuickTip text.
      //me.delegate = Ext.Function.bind(me.delegate, me);

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
    },
    onTargetEnter: function(e){
      var me = this
      var currentTarget = me.currentTarget
      var target = event.target
      if (!target || target.nodeType !== 1 || target === document.documentElement || target === document.body){
        return;
      }
      var targets = me.targets
      for (key in targets) {
        if (targets.hasOwnProperty(key)) {
          registeredTarget = targets[key];

          // If we moved over a registered target from outside of it, activate it.
          if (registeredTarget.target && $('#'+registeredTarget.target).length && ($('#'+registeredTarget.target).is(target) || ($.contains($('#'+registeredTarget.target).get(0), target) && !$.contains($('#'+registeredTarget.target).get(0), event.relatedTarget)))) {
            target = $('#'+registeredTarget.target);

            //currentTarget.attach(target);
            me.currentTarget = target
            me.activeTarget = registeredTarget;
            registeredTarget.el = currentTarget;
            me.anchor = me.updateAnchor(registeredTarget.anchor);
            me.activateTarget();
            me._super(e)
            return;
          }
        }
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
    }
  })
}))