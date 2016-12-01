/**
 * @author nttdocomo
 */
;(function (root, factory) {
  if (typeof define === 'function') {
    if (define.amd) {
      define(['./base', 'taurus', 'underscore', 'modernizr'], factory)
    }
    if (define.cmd) {
      define(function (require, exports, module) {
        return factory(require('./base'), require('taurus'), require('underscore'), require('modernizr'))
      })
    }
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('./base'), require('taurus'), require('underscore'), require('modernizr'))
  }
}(this, function (Base, taurus, _, Modernizr) {
  return Base.extend({
    allowBlank: true,
    blankText: 'This field is required',
    emptyCls: taurus.baseCSSPrefix + 'form-empty-field',
    minLengthText: 'The minimum length for this field is <%=len%>',
    maxLengthText: 'The maximum length for this field is <%=len%>',
    /**
     * @private
     */
    valueContainsPlaceholder: false,
    applyEmptyText: function () {
      var me = this,
        emptyText = me.emptyText,
        isEmpty

      if (me.rendered && emptyText) {
        isEmpty = me.getRawValue().length < 1 /* && !me.hasFocus*/

        if (Modernizr.input.placeholder) {
          me.inputEl.attr('placeholder', emptyText)
        } else if (isEmpty) {
          me.setRawValue(emptyText)
          me.valueContainsPlaceholder = true
        }

        // all browsers need this because of a styling issue with chrome + placeholders.
        // the text isnt vertically aligned when empty (and using the placeholder)
        if (isEmpty) {
          me.inputEl.addClass(me.emptyUICls)
        }else {
          me.inputEl.removeClass(me.emptyUICls)
        }

      // me.autoSize()
      }
    },
    applyState: function (state) {
      this._super.apply(this, arguments)
      if (state.hasOwnProperty('value')) {
        this.setValue(state.value)
      }
    },
    beforeFocus: function () {
      var me = this,
        inputEl = me.inputEl,
        emptyText = me.emptyText,
        isEmpty

      me._super.apply(me, arguments)
      if ((emptyText && !Modernizr.input.Placeholder) && (inputEl.val() === me.emptyText && me.valueContainsPlaceholder)) {
        me.setRawValue('')
        isEmpty = true
        inputEl.removeClass(me.emptyUICls)
        me.valueContainsPlaceholder = false
      } else if (Modernizr.input.Placeholder) {
        inputEl.removeClass(me.emptyUICls)
      }
    },
    initComponent: function () {
      var me = this,
        emptyCls = me.emptyCls
      me._super.apply(me, arguments)
      me.fieldFocusCls = me.baseCls + '-focus'
      me.emptyUICls = emptyCls + ' ' + emptyCls + '-' + me.ui
    },
    getErrors: function (value) {
      var errors = Base.prototype.getErrors.apply(this, arguments), regex = this.regex, validator = this.validator
      if (value.length < 1 || value === this.emptyText) {
        if (!this.allowBlank) {
          errors.push(this.blankText)
        }
      // if value is blank, there cannot be any additional errors
      }
      if (_.isFunction(validator)) {
        msg = validator.call(this, value)
        if (msg !== true) {
          errors.push(msg)
        }
      }

      if (value.length < this.minLength) {
        errors.push(_.template(this.minLengthText)({
          len: this.minLength
        }))
      }

      if (value.length > this.maxLength) {
        errors.push(_.template(this.maxLengthText)({
          len: this.maxLength
        }))
      }
      if (value && regex && !regex.test(value)) {
        errors.push(this.regexText || this.invalidText)
      }
      return errors
    },
    getRawValue: function () {
      var v = Base.prototype.getRawValue.apply(this, arguments)
      if (v === this.emptyText) {
        v = ''
      }
      return v
    },
    getSubTplData: function () {
      var me = this, value = me.getRawValue(), isEmpty = me.emptyText && value.length < 1, placeholder,
        maxLength = me.maxLength

      if (isEmpty) {
        if (Modernizr.input.placeholder) {
          placeholder = me.emptyText
        } else {
          value = me.emptyText
          me.valueContainsPlaceholder = true
        }
      }
      if (me.enforceMaxLength && Modernizr.input.max) {
        if (maxLength === Number.MAX_VALUE) {
          maxLength = undefined
        }
      } else {
        maxLength = undefined
      }

      return $.extend(me._super.apply(this, arguments), {
        placeholder: placeholder,
        maxLength: maxLength,
        value: value,
        fieldCls: me.fieldCls + ((isEmpty && (placeholder || value)) ? ' ' + me.emptyUICls : '') + (me.allowBlank ? '' : ' ' + me.requiredCls)
      })
    },
    onFocus: function () {
      var me = this,
        emptyText = me.emptyText
      me._super.apply(me, arguments)
      me.addClass(me.fieldFocusCls)
      if ((emptyText && !Modernizr.input.Placeholder) && (me.inputEl.val() == emptyText && me.valueContainsPlaceholder)) {
        me.setRawValue('')
        inputEl.removeClass(me.emptyUICls)
        me.valueContainsPlaceholder = false
      } else if (Modernizr.input.Placeholder) {
        inputEl.removeClass(me.emptyUICls)
      }
    },
    onFocusLeave: function () {
      var me = this
      me._super.apply(me, arguments)
      me.removeClass(me.fieldFocusCls)
    },

    onKeyDown: function (e) {
      this.trigger('keydown', e)
    },

    onKeyUp: function (e) {
      this.trigger('keyup', e)
    },

    onKeyPress: function (e) {
      this.trigger('keypress', e)
    },
    processRawValue: function (value) {
      var me = this, stripRe = me.stripCharsRe, newValue
      if (stripRe) {
        newValue = value.replace(stripRe, '')
        if (newValue !== value) {
          me.setRawValue(newValue)
          value = newValue
        }
      }
      return value
    },
    delegateEvents: function (events) {
      var me = this
      if (me.enableKeyEvents) {
        events = $.extend(events, {
          'keyup': 'onKeyUp',
          'keydown': 'onKeyDown',
          'keypress': 'onKeyPress'
        })
      }
      events = $.extend(events, {
        'focusin input': 'onFocus'
      })
      me._super.call(me, events)
    },
    setValue: function (value) {
      var me = this,
        inputEl = me.inputEl

      if (inputEl && me.emptyText && !_.isEmpty(value)) {
        inputEl.removeClass(me.emptyUICls)
        me.valueContainsPlaceholder = false
      }

      me._super.apply(this, arguments)

      me.applyEmptyText()
      return me
    }
  })
}))
