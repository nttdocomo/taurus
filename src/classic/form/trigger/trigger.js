/**
 * @author nttdocomo
 */
;(function (root, factory) {
  if (typeof define === 'function') {
    if (define.amd) {
      define(['../../../view/base', 'taurus', 'underscore'], factory)
    }
    if (define.cmd) {
      define(function (require, exports, module) {
        return factory(require('../../../view/base'), require('taurus'), require('underscore'))
      })
    }
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('../../../view/base'), require('taurus'), require('underscore'))
  }
}(this, function (Base, taurus, _) {
  return Base.extend({
    renderTpl: [
      '<div id="{triggerId}" class="{baseCls} {baseCls}-{ui} {cls} {cls}-{ui} {extraCls} ',
            '{childElCls}"<tpl if="triggerStyle"> style="{triggerStyle}"</tpl>',
            '<tpl if="ariaRole"> role="{ariaRole}"<tpl else> role="presentation"</tpl>',
        '>',
        '{[values.$trigger.renderBody(values)]}',
      '</div>'
    ],
    getBodyRenderData: taurus.emptyFn,
    renderTpl:_.template('<span id="<%=triggerId%>" class="input-group-addon"><%=$trigger.renderBody()%></span>'),

    /**
     * @protected
     * Called when this trigger's field is rendered
     */
    afterFieldRender: function() {
      var me = this
      var tip = me.tooltip

      me.initEvents()

      if (tip) {
        me.tooltip = null
        me.setTooltip(tip)
      }
    },
    initEvents: function() {
        var me = this
        var el = me.$el
            /*isFieldEnabled = me.isFieldEnabled,
            stateEl = me.getStateEl(),
            el = me.el;

        stateEl.addClsOnOver(me.overCls, isFieldEnabled, me);
        stateEl.addClsOnClick(me.clickCls, isFieldEnabled, me);

        if (me.repeatClick) {
            me.clickRepeater = new Ext.util.ClickRepeater(el, {
                preventDefault: true,
                handler: me.onClick,
                listeners: {
                    mousedown: me.onClickRepeaterMouseDown,
                    mouseup: me.onClickRepeaterMouseUp,
                    scope: me
                },
                scope: me
            });
        } else {
            me.field.mon(el, {
                click: me.onClick,
                mousedown: me.onMouseDown,
                scope: me
            });
        }*/
        el.on({
          'click':_.bind(me.onClick, me)
        })
    },
    onClick: function(){
      var me = this
      var args = arguments
      var e = me.clickRepeater ? args[1] : args[0]
      var handler = me.handler
      var field = me.field

      if (handler/* && !field.readOnly && me.isFieldEnabled()*/) {
        handler.apply(me.scope, [field, me, e])
      }
    },

    /**
     * @protected
     * Called when this trigger's field is rendered
     */
    onFieldRender: function() {
      var me = this
      /**
       * @property {Ext.dom.Element} el
       * @private
       * The trigger's main element
       */
      me.setElement(me.field.$el.find('#' + me.domId))
      //var el = me.$el = me.field.$el.find('#' + me.domId)

      // ensure that the trigger does not consume space when hidden
      //el.setVisibilityMode(Ext.Element.DISPLAY);
      me.rendered = true;
    },

    /**
     * Renders the bodyTpl
     * @param renderData
     * @private
     * @return {String}
     */
    renderBody: function() {
      var me = this
      var bodyTpl = _.template(me.bodyTpl)

      

      return bodyTpl ? bodyTpl(me.getBodyRenderData()) : '';
    },
    /**
     * Generates the trigger markup. Called during rendering of the field the trigger
     * belongs to.
     * @param {Object} fieldData The render data object of the parent field.
     * @private
     * @return {String}
     */
    renderTrigger: function(fieldData) {
      var me = this
      var width = me.width
      var triggerStyle = me.hidden ? 'display:none;' : '';
      var fieldData = me.field

      if (width) {
        triggerStyle += 'width:' + width;
      }

      return me.renderTpl({
        $trigger: me,
        fieldData: fieldData,
        ui: fieldData.ui,
        childElCls: fieldData.childElCls,
        triggerId: me.domId = me.field.id + '-trigger-' + me.id,
        cls: me.cls,
        triggerStyle: triggerStyle,
        extraCls: me.extraCls,
        baseCls: me.baseCls,
        ariaRole: me.ariaRole
      });
    }
  })
}))