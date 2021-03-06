/**
 * @author nttdocomo
 */
;(function (root, factory) {
  if (typeof define === 'function') {
    if (define.amd) {
      define(['../../../mixin/mix', '../label', './field', 'underscore', 'backbone', 'modernizr', '../../../i18n', 'taurus', '../../../util/format'], factory)
    }
    if (define.cmd) {
      define(function (require, exports, module) {
        return factory(require('../../../mixin/mix'), require('../label'), require('./field'), require('underscore'), require('backbone'), require('modernizr'), require('../../../i18n'), require('taurus'), require('../../../util/format'))
      })
    }
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('../../../mixin/mix'), require('../label'), require('./field'), require('underscore'), require('backbone'), require('modernizr'), require('../../../i18n'), require('taurus'), require('../../../util/format'))
  }
}(this, function (mix, Label, Field, _, Backbone, Modernizr, i18n, taurus, format) {
  /**
   * A namespace.
   * @namespace form
   */
  /**
   * A namespace.
   * @namespace field
   * @memberof form
   * @toc form.field
   */
  /**
   * Base class for form fields that provides default event handling, rendering, and other common functionality
   * needed by all form field types.
   *
   * @constructor Base
   * @param {Object} config
   * @memberof field
   * @toc form.field.Base
   */
  return mix(Label).with(Field).extend({
    inputType: 'text',
    readOnly: false,
    editable: true,
    submitValue: true,
    /**
     * @name name
     * @property {string} name
     * The name of the field. This is used as the parameter name when including the field value
     * in a {@link Ext.form.Basic#submit form submit()}. If no name is configured, it falls back to the {@link Base#inputId}.
     * To prevent the field from being included in the form submit, set {@link Base#submitValue} to false.
     * @memberof field.Base#
     */
    fieldCls: taurus.baseCSSPrefix + 'form-field',
    baseCls: 'form-field',
    invalidText: i18n.__('The value in this field is invalid'),

    /**
     * @name inputId
     * @property {String} inputId
     * The id that will be given to the generated input DOM element. Defaults to an automatically generated id. If you
     * configure this manually, you must make sure it is unique in the document.
     * @memberof field.Base#
     */
    checkChangeBuffer: 50,
    fieldSubTpl: '<input id="<%=id%>" type="<%=type%>" class="form-control <%=fieldCls%> <%=inputCls%>"<%if(typeof(placeholder) !== "undefined"){%> placeholder="<%=placeholder%>"<%}%><%if(typeof(value) !== "undefined"){%> value="<%=value%>"<%}%><%if(typeof(checked) !== "undefined"){%> checked="<%=checked%>"<%}%><%if(readOnly){%> readonly="readonly"<%}%> name="<%=name%>"<%if(typeof(maxLength) !== "undefined"){%> maxlength="<%=maxLength%>"<%}%><%if(disabled){%> disabled="<%=disabled%>"<%}%> autocomplete="off" />',
    checkChangeEvents: !Modernizr.hasEvent('dragdrop', document.createElement('input')) && (!document.documentMode || document.documentMode < 9) ? ['change', 'propertychange', 'keyup'] : ['change', 'input', 'textInput', 'keyup', 'dragdrop'],
    /**
     * @private
     */
    suspendCheckChange: 0,
    validateOnChange: true,
    initComponent: function () {
      this.getInputId()
      Label.prototype.initComponent.apply(this, arguments)
      this.initField()
    },
    disable: function () {
      var inputEl = this.inputEl
      if(inputEl) {
        inputEl.prop('disabled', true)
        inputEl.addClass('disabled')
      }
      Label.prototype.disable.apply(this, arguments)
    },
    enable: function () {
      var inputEl = this.inputEl
      if(inputEl) {
        inputEl.prop('disabled', false)
        inputEl.removeClass('disabled')
      }
      Label.prototype.enable.apply(this, arguments)
    },
    getName: function () {
      return this.name
    },
    render: function () {
      var me = Label.prototype.render.apply(this, arguments)
      return me
    },
    initField: function () {
      this.initValue()
    },
    rawToValue: function (rawValue) {
      return rawValue
    },
    processRawValue: function (value) {
      return value
    },
    // private override to use getSubmitValue() as a convenience
    getSubmitData: function () {
      var me = this,
        data = null,
        val
      if (!me.disabled && me.submitValue && !me.isFileUpload()) {
        val = me.getSubmitValue()
        if (val !== null) {
          data = {}
          data[me.getName()] = val
        }
      }
      return data
    },
    getSubmitValue: function () {
      return this.getValue()
    },
    getValue: function () {
      var me = this, val = me.rawToValue(me.processRawValue(me.getRawValue()))
      me.value = val
      return val
    },
    getRawValue: function () {
      var v = (this.inputEl ? this.inputEl.val() : taurus.valueFrom(this.rawValue, ''))
      this.rawValue = v
      return v
    },
    delegateEvents: function (events) {
      var events = events || {}, me = this
      events['blur' + ' #' + me.inputId] = 'onFocusLeave'
      _.each(this.checkChangeEvents, function (item) {
        events[item + ' #' + me.inputId] = taurus.util.throttle(me.checkChange, me.checkChangeBuffer, me)
      })
      events = $.extend({}, this.events, events)
      Label.prototype.delegateEvents.apply(this, [events])
    },
    isFileUpload: function () {
      return this.inputType === 'file'
    },
    onFocusLeave: function () {
      this.completeEdit()
    },
    completeEdit: taurus.emptyFn,
    /**
     * Sets a data value into the field and runs the change detection and validation. To set the value directly
     * without these inspections see {@link #setRawValue}.
     * @method
     * @param {Object} value The value to set
     * @memberof field.Base#
     */
    setValue: function (value) {
      var me = this
      me.setRawValue(me.valueToRaw(value))
      return me._super.call(me, value)
    },
    /**
     * Resets the current field value to the originally loaded value and clears any validation messages. See {@link
     * Ext.form.Basic}.{@link Ext.form.Basic#trackResetOnLoad trackResetOnLoad}
     */
    reset: function () {
      var me = this

      me.beforeReset()
      me.setValue(me.originalValue)
      me.clearInvalid()
      // delete here so we reset back to the original state
      delete me.wasValid
    },
    
    /**
     * Template method before a field is reset.
     * @method
     * @memberof field.Base#
     */
    beforeReset: taurus.emptyFn,
    setRawValue: function (value) {
      this.rawValue = value
      this.inputEl && this.inputEl.val(value)
    },

    /**
     * Converts a mixed-type value to a raw representation suitable for displaying in the field. This allows controlling
     * how value objects passed to {@link #setValue} are shown to the user, including localization. For instance, for a
     * {@link Ext.form.field.Date}, this would control how a Date object passed to {@link #setValue} would be converted
     * to a String for display in the field.
     *
     * See {@link #rawToValue} for the opposite conversion.
     *
     * The base implementation simply does a standard toString conversion, and converts {@link Ext#isEmpty empty values}
     * to an empty string.
     * @method
     * @param {Object} value The mixed-type value to convert to the raw representation.
     * @return {Object} The converted raw value.
     * @memberof field.Base#
     */
    valueToRaw: function (value) {
      return '' + taurus.valueFrom(value, '')
    },
    getTplData: function (data) {
      data = $.extend({
        inputId: this.cid,
        field: this.getSubTplMarkup()
      }, data)
      return Label.prototype.getTplData.call(this, data)
    },

    /**
     * Returns the input id for this field. If none was specified via the {@link #inputId} config, then an id will be
     * automatically generated.
     * @method
     * @memberof field.Base#
     */
    getInputId: function () {
      return this.inputId || (this.inputId = this.cid + '-inputEl')
    },
    /**
	     * Gets the markup to be inserted into the outer template's bodyEl. For fields this is the actual input element.
	     */
    getSubTplMarkup: function () {
      return _.template(this.fieldSubTpl)(this.getSubTplData())
    },
    /**
     * Creates and returns the data object to be used when rendering the {@link #fieldSubTpl}.
     * @return {Object} The template data
     * @template
     */
    getSubTplData: function () {
      var me = this,
        type = me.inputType,
        inputId = me.getInputId(),
        data

      data = $.extend({
        id: inputId,
        cmpId: me.cid,
        name: me.name || inputId,
        disabled: me.disabled,
        readOnly: me.readOnly || !me.editable,
        value: format.htmlEncode(me.getRawValue()),
        type: type,
        fieldCls: me.fieldCls,
        inputCls: me.inputCls || '',
        fieldStyle: me.getInputStyle(),
        tabIdx: me.tabIndex,
        typeCls: 'form-' + (type === 'password' ? 'text' : type)
      }, me.subTplData)

      // me.getInsertionRenderData(data, me.subTplInsertions)

      return data
    },
    getFieldHtml: function () {
      var div = document.createElement('div')
      div.appendChild((new Backbone.View({
        id: 'inputEl',
        className: (this.readOnly || !this.editable) ? 'trigger-noedit form-control' : 'form-control',
        attributes: {
          style: this.getInputStyle(),
          type: this.inputType,
          value: this.value,
          readonly: (this.readOnly || !this.editable)
        },
        tagName: this.editable ? 'input' : 'div'
      })).render().el)
      return div.innerHTML
    },
    getInputStyle: function () {
      var style = ''
      if (this.labelAlign) {
        style += 'margin-bottom:0px;'
      }
      return style
    },
    getControlsStyle: function () {
      var controlsStyle = Label.prototype.getControlsStyle.apply(this, arguments)
      /*if (this.width) {
        controlsStyle += 'width:' + this.width + 'px;'
      }*/
      return controlsStyle
    },
    isValid: function () {
      return this.disabled || this.validateValue(this.processRawValue(this.getRawValue()))
    },
    validateValue: function (value) {
      var me = this,
        errors = me.getErrors(value),
        isValid = _.isEmpty(errors)
      if (!me.preventMark) {
        if (isValid) {
          me.clearInvalid()
        } else {
          me.markInvalid(errors)
        }
      }

      return isValid
    },
    clearInvalid: function () {
      // Clear the message and fire the 'valid' event
      this.unsetActiveError()
      if (this.hasActiveError()) {
        this.renderActiveError()
      }
    },
    markInvalid: function (errors) {
      var oldMsg = this.getActiveError()
      this.setActiveErrors($.makeArray(errors))
      if (oldMsg !== this.getActiveError()) {
        this.renderActiveError()
      }
    },
    getErrors: function (value) {
      return []
    },
    afterRender: function () {
      Label.prototype.afterRender.apply(this, arguments)
    },
    validate: function () {
      var me = this, isValid = me.isValid()
      if (isValid !== me.wasValid) {
        me.wasValid = isValid
        me.trigger('validitychange', isValid)
      }
      return isValid
    }
  })
}))
