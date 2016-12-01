/**
 * @author nttdocomo
 */
/**
 * @author nttdocomo
 */
define(function (require) {
  require('backbone')
  var tDate = require('../../src/classic/form/field/date')
  var Button = require('../../src/classic/button/button')
  var $body = $('#main')
  var date = new tDate({
    renderTo: $body,
    name: 'textfield2',
    displayField: 'name',
    fieldLabel: 'date'
  })
  new Button({
    renderTo: $body,
    text: '禁用',
    handler: function () {
      if (date.isDisabled()) {
        date.enable()
      } else {
        date.disable()
      }
    }
  })
})
