;(function (root, factory) {
  if (typeof define === 'function') {
    if (define.amd) {
      define(['./base', '../trigger/trigger', 'taurus', 'underscore', 'modernizr'], factory)
    }
    if (define.cmd) {
      define(function (require, exports, module) {
        return factory(require('./base'), require('../trigger/trigger'), require('taurus'), require('underscore'), require('modernizr'))
      })
    }
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('./base'), require('../trigger/trigger'), require('taurus'), require('underscore'), require('modernizr'))
  }
}(this, function (Base, Trigger, taurus, _, Modernizr) {
  /**
   * A basic text field
   *
   * @constructor Text
   * @param {Object} config
   * @example
   * new FormPanel({
   *   title:'Contact Info'
   *   width: 300,
   *   renderTo: $(document.body),
   *   items: [{
   *     'class': Text,
   *     name: 'name',
   *     fieldLabel: 'Name',
   *     allowBlank: false
   *   }, {
   *     'class': Text,
   *     name: 'email',
   *     fieldLabel: 'Email Address'
   *   }]
   * })
   */
  return Base.extend({
    /**
     * Specify false to validate that the value's length must be > 0. If `true`, then a blank value is **always** taken to be valid regardless of any {@link #vtype}
     * validation that may be applied.
     *
     * If {@link #vtype} validation must still be applied to blank values, configure {@link #validateBlank} as `true`;
     * @name Text#allowBlank
     * @type Boolean
     * @default false
     */
    allowBlank: true,
    blankText: 'This field is required',
    emptyCls: taurus.baseCSSPrefix + 'form-empty-field',

    /**
     * @property {string} emptyText
     * The default text to place into an empty field
     * @memberof Text#
     */
    emptyText : '',
    /**
     * @property {string} minLengthText
     * Error text to display if the **{@link #minLength minimum length}** validation fails.
     * @memberof Text#
     */
    minLengthText: 'The minimum length for this field is <%=len%>',
    /**
     * @property {string} maxLengthText
     * Error text to display if the **{@link #maxLength maximum length}** validation fails
     * @memberof Text#
     */
    maxLengthText: 'The maximum length for this field is <%=len%>',

    /**
     * @name  enforceMaxLength
     * @property {Boolean} enforceMaxLength
     * True to set the maxLength property on the underlying input field. Defaults to false
     * @memberof Text#
     */

    /**
     * @name  regex
     * @property {RegExp} regex
     * A JavaScript RegExp object to be tested against the field value during validation.
     * If the test fails, the field will be marked invalid using
     * either **{@link Text#regexText}** or **{@link Text#invalidText}**.
     * @memberof Text#
     */

    /**
     * @property {String} regexText
     * The error text to display if **{@link Text#regex}** is used and the test fails during validation
     * @memberof Text#
     */
    regexText : '',
    hideTrigger: false,
    valueContainsPlaceholder: false,
    /**
     * Sets the default text to place into an empty field
     * @method
     * @memberof Text#
     */
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

    refreshEmptyText: function() {
      var me = this
      var inputEl = me.inputEl
      var emptyClsElements = me.emptyClsElements
      var value, isEmpty, i

      if (inputEl) {
        value = me.getValue();
        isEmpty = !(inputEl.val() || (_.isArray(value) && value.length));
        
        if (me.placeholderLabel) {
          me.placeholderLabel.setDisplayed(isEmpty);
        }

        for (i=0; i < emptyClsElements.length; i++) {
          emptyClsElements[i].toggleClass(me.emptyUICls);
        }
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
      var me = this
      var emptyCls = me.emptyCls
      me.emptyUICls = emptyCls + ' ' + emptyCls + '-' + me.ui
      me.applyTriggers(me.triggers)
      me._super.apply(me, arguments)
      me.fieldFocusCls = me.baseCls + '-focus'
    },
    /**
    * Validates a value according to the field's validation rules and returns an array of errors
     * for any failing validations.
     *
     * @method
     * @memberof Text#
     * @param {Object} value The value to validate. The processed raw value will be used if nothing is passed.
     * @return {String[]} Array of any validation errors
     */
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
    getSubTplMarkup:function(){
      var me = this;
      me.fieldSubTpl = (me.triggers ? '<div class="input-group">' : '') + me.fieldSubTpl + '<%_.each(triggers, function(trigger){%><%=trigger.renderTrigger()%><%})%>' + (me.triggers ? '</div>' : '');
      return me._super.apply(me,arguments);
      //return this.getFieldHtml();
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
        triggers: me.orderedTriggers,
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
    render: function(){
      var me = this
      me._super.apply(me, arguments)
      me.emptyClsElements = [me.inputEl]
    },

    afterRender: function() {
      var me = this
      var triggers = me.triggers
      if (triggers) {
          me.invokeTriggers('onFieldRender');

          /**
           * @property {Ext.CompositeElement} triggerEl
           * @deprecated 5.0
           * A composite of all the trigger button elements. Only set after the field has
           * been rendered.
           */
          /*for(id in triggers) {
              elements.push(triggers[id].el);
          }
          // for 4.x compat, also set triggerCell
          me.triggerEl = me.triggerCell = new Ext.CompositeElement(elements, true);*/
      }
      this._super();
      this.invokeTriggers('afterFieldRender');
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
    },
    applyTriggers: function(triggers){
      var me = this
      var orderedTriggers = me.orderedTriggers = []
      var hideAllTriggers = me.hideTrigger
      var repeatTriggerClick = me.repeatTriggerClick
      var id, triggerCfg, readOnly, trigger
      if(triggers){
        for(id in triggers) {
          if (triggers.hasOwnProperty(id)) {
            triggerCfg = triggers[id];
            triggerCfg.field = me;
            triggerCfg.id = id;

            /*
             * An explicitly-configured 'triggerConfig.hideOnReadOnly : false' allows {@link #hideTrigger} analysis
             */
            if ((readOnly && triggerCfg.hideOnReadOnly !== false) || (hideAllTriggers && triggerCfg.hidden !== false)) {
              triggerCfg.hidden = true;
            }
            if (repeatTriggerClick && (triggerCfg.repeatClick !== false)) {
              triggerCfg.repeatClick = true;
            }

            trigger = triggers[id] = new Trigger(triggerCfg);
            orderedTriggers.push(trigger);
          }
        }
      }
    },
    invokeTriggers: function(methodName, args){
      var me = this
      var triggers = me.triggers
      var id, trigger;

      if (triggers) {
        for (id in triggers) {
          if (triggers.hasOwnProperty(id)) {
            trigger = triggers[id];
            // IE8 needs "|| []" if args is undefined
            trigger[methodName].apply(trigger, args || []);
          }
        }
      }
    }
  })
}))
