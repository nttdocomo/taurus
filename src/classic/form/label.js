/**
 * @author nttdocomo
 */
;(function (root, factory) {
  if (typeof define === 'function') {
    if (define.amd) {
      define(['../container/container', '../view/activeErrors'], factory)
    }
    if (define.cmd) {
      define(function (require, exports, module) {
        return factory(require('../container/container'), require('../view/activeErrors'))
      })
    }
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('../container/container'), require('../view/activeErrors'))
  }
}(this, function (Base, ActiveErrors) {
  /**
   * Produces a standalone `<label />` element which can be inserted into a form and be associated with a field
   * in that form using the {@link #forId} property.
   *
   * @constructor Label
   */
  return Base.extend({
    tpl: '<%if(fieldLabel){%><label class="control-label"<%if(inputId){%> for="<%=inputId%>"<%}%><%if(labelStyle){%> style="<%=labelStyle%>"<%}%>><%if(typeof beforeLabelTextTpl !== "undefined"){%><%=beforeLabelTextTpl%><%}%><%=fieldLabel%><%if(labelSeparator){%><%=labelSeparator%><%}%></label><%}%><div style="<%=controlsStyle%>" id="<%=id%>-bodyEl"><%=field%></div><%if(fieldLabel){%><%}%><%if(renderError){%><div class="help-block" id="<%=id%>-errorEl" style="<%=controlsStyle%>"></div><%}%>',
    className: 'form-group',
    /**
     * The width of the {@link Label#fieldLabel} in pixels. Only applicable if {@link Label#labelAlign}
     * is set to "left" or "right".
     * @name Label#labelWidth
     * @type Number
     */
    labelWidth: 100,
    /**
     * Controls the position and alignment of the {@link Label#fieldLabel}. Valid values are:
     *   - `left` (the default) - The label is positioned to the left of the field, with its text aligned to the left. Its width is determined by the {@link Label#labelWidth} config.
     *   - `top` - The label is positioned above the field.
     *   - `right` - The label is positioned to the left of the field, with its text aligned to the right. Its width is determined by the {@link Label#labelWidth} config.
     * @name Label#labelAlign
     * @type String
     * @default left
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
     * @property {String} labelSeparator
     * Character(s) to be inserted at the end of the {@link Label#fieldLabel label text}. Set to empty string to hide the separator completely.
     * @memberof Label#
     */
    labelSeparator: ':',
    /**
     * The label for the field. It gets appended with the {@link Label#labelSeparator}, and its position and sizing is
     * determined by the {@link Label#labelAlign} and {@link Label#labelWidth} configs.
     * @name Label#fieldLabel
     * @type String
     */
    fieldLabel: undefined,
    childEls: {
      'inputEl': '.form-control',
      'labelEl': '.control-label'
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
      errors = $.makeArray(errors)
      this.activeError = errors[0]
      this.activeErrors = errors
      this.activeError = (new ActiveErrors({})).renderHtml(errors.length ? [errors[0]] : [])
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
      var activeError = this.getActiveError(),
        sideError = this.msgTarget === 'side',
        underError = this.msgTarget === 'under',
        renderError = sideError || underError
      /*if(this.$el.hasClass('has-error')){
      	this.bodyEl.find('.help-block').remove()
      }*/
      if (activeError !== this.lastActiveError) {
        this.trigger('errorchange', activeError)
        this.lastActiveError = activeError
      }
      if (activeError && renderError) {
        this.$el.addClass('has-error')
      } else {
        this.$el.removeClass('has-error')
      }
      this.errorEl.html(activeError)
    },

    /**
     * Gets an Array of any active error messages currently applied to the field. This does not trigger validation on
     * its own, it merely returns any messages that the component may already hold.
     * @method
     * @return {string[]} The active error messages on the component; if there are no errors, an empty Array is
     * returned.
     * @memberof Label#
     */
    getActiveErrors: function () {
      return this.activeErrors || []
    },
    getActiveError: function () {
      return this.activeError || ''
    },
    applyChildEls: function (childEls) {
      var childEls = $.extend(childEls || {}, {
        'bodyEl': '>[id$="bodyEl"]',
        'errorEl': '>[id$="errorEl"]'
      })
      Base.prototype.applyChildEls.call(this, childEls)
    },

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
