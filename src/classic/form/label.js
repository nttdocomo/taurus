/**
 * @author nttdocomo
 */
;(function (root, factory) {
  if (typeof define === 'function') {
    if (define.amd) {
      define(['../../define', '../container/container', '../view/activeErrors'], factory)
    }
    if (define.cmd) {
      define(function (require, exports, module) {
        return factory(require('../../define'), require('../container/container'), require('../view/activeErrors'))
      })
    }
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('../../define'), require('../container/container'), require('../view/activeErrors'))
  }
}(this, function (define, Base, ActiveErrors) {
  /**
   * A basic labeled form field
   *
   * @constructor Label
   * @param {Object} config
   */
  return define(Base, {
    tpl: '<%if(fieldLabel){%><label class="control-label"<%if(inputId){%> for="<%=inputId%>"<%}%><%if(labelStyle){%> style="<%=labelStyle%>"<%}%>><%if(typeof beforeLabelTextTpl !== "undefined"){%><%=beforeLabelTextTpl%><%}%><%=fieldLabel%><%if(labelSeparator){%><%=labelSeparator%><%}%></label><%}%><div style="<%=controlsStyle%>" id="<%=id%>-bodyEl"><%=field%></div><%if(fieldLabel){%><%}%><%if(renderError){%><div class="help-block" id="<%=id%>-errorEl" style="<%=controlsStyle%>"></div><%}%>',
    className: 'form-group',
    /**
     * @property {number} labelWidth
     * The width of the {@link Label#fieldLabel} in pixels. Only applicable if {@link Label#labelAlign}
     * is set to "left" or "right".
     * @memberof Label#
     */
    labelWidth: 100,
    /**
     * @property {string} labelAlign
     *
     * Controls the position and alignment of the {@link Label#fieldLabel}. Valid values are:
     *   - `left` (the default) - The label is positioned to the left of the field, with its text aligned to the left. Its width is determined by the {@link Label#labelWidth} config.
     *   - `top` - The label is positioned above the field.
     *   - `right` - The label is positioned to the left of the field, with its text aligned to the right. Its width is determined by the {@link Label#labelWidth} config.
     * @memberof Label#
     */
    labelAlign: 'left',
    labelPad: 5,
    /**
     * The location where the error message text should display. Must be one of the following values:
     * @property {string} msgTarget
     * - `title` Display the message in a default browser title attribute popup.
     * - `under` Add a block div beneath the field containing the error message.
     * - `side` Add an error icon to the right of the field, displaying the message in a popup on hover.
     * @memberof Label#
     */
    msgTarget: 'qtip',
    showLabel: true,

    /**
     * @property {Boolean} autoFitErrors
     * Whether to adjust the component's body width to make room for 'side'
     * {@link #msgTarget error messages}.
     * @memberof Label#
     */
    autoFitErrors: true,
    /**
     * @property {String} labelSeparator
     * Character(s) to be inserted at the end of the {@link Label#fieldLabel label text}. Set to empty string to hide the separator completely.
     * @memberof Label#
     */
    labelSeparator: ':',
    /**
     * @cfg {String/String[]/Ext.XTemplate} activeErrorsTpl
     * The template used to format the Array       of error messages passed to {@link #setActiveErrors} into a single HTML
     * string. if the {@link #msgTarget} is title, it defaults to a list separated by new lines. Otherwise, it
     * renders each message as an item in an unordered list.
     */
    activeErrorsTpl: undefined,

    htmlActiveErrorsTpl: [
      '<%if(errors && errors.length){%>',
        '<ul class="<%=listCls%>">',
          '<%_.each(errors, function(error){%><li><%=error%></li><%})%>',
        '</ul>',
      '<%}%>'
    ].join(''),

    plaintextActiveErrorsTpl: [
      '<%if(errors && errors.length){%>',
        '<%_.each(errors, function(error, i){%><%if(i > 0){%>\n<%}%><%=error%><%})%>',
      '<%}%>'
    ].join(''),
    /**
     * The label for the field. It gets appended with the {@link Label#labelSeparator}, and its position and sizing is
     * @property {string} fieldLabel
     * determined by the {@link Label#labelAlign} and {@link Label#labelWidth} configs.
     * @memberof Label#
     */
    fieldLabel: undefined,
    topLabelSideErrorCls: taurus.baseCSSPrefix + 'form-item-label-top-side-error',

    /**
     * @property {String} invalidCls
     * The CSS class to use when marking the component invalid.
     */
    invalidCls : taurus.baseCSSPrefix + 'has-error',
    config:{
      childEls: {
        'inputEl': '.form-control',
        'labelEl': '.control-label',
        'errorEl': '[id$="errorEl"]',
        'errorWrapEl': '[id$="errorEl"]'
      }
    },
    getLabelStyle: function () {
      var labelPad = this.labelPad, labelStyle = ''
      if (this.labelAlign === 'top') {
        labelStyle = 'margin-bottom:' + labelPad + 'px;'
      } else {
        if (this.fieldLabel) {
          this.$el.addClass('form-group-horizontal')
        }
        if (this.labelWidth) {
          labelStyle = 'width:' + this.labelWidth + 'px;'
        }
        labelStyle += 'margin-right:' + labelPad + 'px;float:left;text-align:right;'
      }
      return labelStyle
    },
    getControlsStyle: function () {
      var controlsStyle = ''
      if (this.labelAlign !== 'top' && this.fieldLabel) {
        controlsStyle = 'margin-left:' + (this.labelWidth + 5) + 'px;'
      }
      return controlsStyle
    },
    getTplData: function (data) {
      var me = this,
        sideError = (me.msgTarget === 'side'),
        underError = (me.msgTarget === 'under')
      data = $.extend({
        field: '',
        inputId: me.cid,
        fieldLabel: me.fieldLabel,
        labelStyle: me.getLabelStyle(),
        controlsStyle: me.getControlsStyle(),
        renderError: sideError || underError,
        labelSeparator: me.labelSeparator,
        beforeLabelTextTpl: me.beforeLabelTextTpl
      }, data)
      return Base.prototype.getTplData.call(me, data)
    },
    initLabelable: function(){
      var me = this
      if (!me.activeErrorsTpl) {
        if (me.msgTarget === 'title') {
          me.activeErrorsTpl = me.plaintextActiveErrorsTpl;
        } else {
          me.activeErrorsTpl = me.htmlActiveErrorsTpl;
        }
      }
    },
    unsetActiveError: function () {
      var me = this
      if (me.hasActiveError()) {
        delete this.activeError
        delete this.activeErrors
        this.renderActiveError()
      }
    },
    setActiveError: function (msg) {
      this.setActiveErrors(msg)
    },
    setActiveErrors: function (errors) {
      var me = this
      var errorWrapEl = me.errorWrapEl
      var msgTarget = me.msgTarget
      var tpl
      var isSide = msgTarget === 'side',
      errors = $.makeArray(errors)
      tpl = me.lookupTpl('activeErrorsTpl');
      activeError = me.activeError = tpl({
        fieldLabel: me.fieldLabel,
        errors: errors,
        listCls: taurus.baseCSSPrefix + 'list-plain'
      });
      me.activeErrors = errors


      if (errorWrapEl) {
        errorWrapEl[errors.length > 0 ? 'show' : 'hide'];
        if (isSide && me.autoFitErrors) {
          me.labelEl.addCls(me.topLabelSideErrorCls);
        }
      }
      //this.activeError = (new ActiveErrors({})).renderHtml(errors.length ? [errors[0]] : [])
      //this.renderActiveError()
    },

    /**
     * Tells whether the field currently has an active error message. This does not trigger validation on its own, it
     * merely looks for any message that the component may already hold.
     * @method
     * @return {Boolean}
     * @memberof Label#
     */
    hasActiveError: function () {
      return !!this.getActiveError()
    },
    renderActiveError: function () {
      var me = this
      var activeError = me.getActiveError()
      var sideError = me.msgTarget === 'side'
      var underError = me.msgTarget === 'under'
      var renderError = sideError || underError
      /*if(this.$el.hasClass('has-error')){
      	this.bodyEl.find('.help-block').remove()
      }*/
      if (activeError !== me.lastActiveError) {
        me.trigger('errorchange', activeError)
        me.lastActiveError = activeError
      }
      if (activeError && renderError) {
        me.$el.addClass(me.invalidCls)
      } else {
        me.$el.removeClass(me.invalidCls)
      }
      if (me.errorEl) {
        me.errorEl.html(activeError)
      }
    },

    /**
     * Gets an Array of any active error messages currently applied to the field. This does not trigger validation on
     * its own, it merely returns any messages that the component may already hold.
     * @method
     * @return {String[]} The active error messages on the component; if there are no errors, an empty Array is
     * returned.
     * @memberof Label#
     */
    getActiveErrors: function () {
      return this.activeErrors || []
    },
    getActiveError: function () {
      return this.activeError || ''
    }/*,
    applyChildEls: function (childEls) {
      var childEls = $.extend(childEls || {}, {
        'bodyEl': '>[id$="bodyEl"]',
        'errorEl': '>[id$="errorEl"]'
      })
      Base.prototype.applyChildEls.call(this, childEls)
    }*/,

    /**
     * Returns the label for the field. Defaults to simply returning the {@link #fieldLabel} config. Can be overridden
     * to provide a custom generated label.
     * @method
     * @return {String} The configured field label, or empty string if not defined
     * @memberof Label#
     */
    getFieldLabel: function () {
      return this.trimLabelSeparator()
    },

    /**
     * Returns the trimmed label by slicing off the label separator character. Can be overridden.
     * @method
     * @return {String} The trimmed field label, or empty string if not defined
     * @memberof Label#
     */
    trimLabelSeparator: function () {
      var me = this,
        separator = me.labelSeparator,
        label = me.fieldLabel || '',
        lastChar = label.substr(label.length - 1)

      // if the last char is the same as the label separator then slice it off otherwise just return label value
      return lastChar === separator ? label.slice(0, -1) : label
    }
  })
}))
