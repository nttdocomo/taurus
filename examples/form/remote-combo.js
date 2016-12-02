/**
 * @author nttdocomo
 */
define(function (require) {
  var Backbone = require('backbone')
  var chance = require('chance')
  require('../mock')
  var ComboBox = require('../../src/classic/form/field/comboBox'),
    Button = require('../../src/classic/button/button'),
		Collection = Backbone.Collection.extend({
			url:'/states_remote'
		}),
    $body = $('#main'), collection = new Collection(),
		comboBox = new ComboBox({
      renderTo: $body,
      //queryMode: 'local',
      name: 'textfield1',
      id: 'textfield1',
      displayField: 'name',
      fieldLabel: 'country',
      emptyText: 'aaaaa',
      value: 'AK',
      valueField: 'abbr',
      width: 250,
      collection: collection
    });
  new Button({
    renderTo: $body,
    text: 'Clear Value',
    handler: function () {
      city.setValue(null)
    }
  })
})
