/**
 * @author nttdocomo
 */
/**
 * @author nttdocomo
 */
define(function (require) {
  require('backbone')
  var Button = require('../../src/classic/button/button')
  var FileButton = require('../../src/classic/button/fileButton')
	var chance = require('chance')
  var $body = $('#main')
  var likelihood = 30
  function randomMenu () {
    var len = chance.natural({min: 1, max: 10})
    var items = []
    for (var i = len; i >= 0; i--) {
      var item = {
        text: chance.word()
      }
      if (chance.bool({likelihood: likelihood})) {
        item.menu = {
          items: randomMenu()
        }
        if (likelihood > 0) {
          --likelihood
        }
      }
      items.push(item)
    }
    return items
  }

  /*new Menu({
  	renderTo : $body,
  	items: randomMenu()
  });*/
  new Button({
    renderTo: $body.find('#example-1'),
    text: 'Default'
  })
  new Button({
    renderTo: $body.find('#example-1'),
    text: 'Primary',
		ui:'primary'
  })
  new Button({
    renderTo: $body.find('#example-1'),
    text: 'Link',
		ui:'link'
  })
  new Button({
    renderTo: $body.find('#example-2'),
    text: 'Default'
  })

  new Button({
    renderTo: $body.find('#example-2'),
    text: 'Default',
    scale:'sm'
  })
  new Button({
    renderTo: $body.find('#example-2'),
    text: 'Default',
    scale:'xs'
  })
  new Button({
    renderTo: $body.find('#example-3'),
    text: 'Default',
    menu: {
      items: [{
				text:'Item 1'
			}]
    }
  })

  new Button({
    renderTo: $body,
    text: chance.word(),
		ui:'link',
    menu: {
      items: [{
				text:'Item 1'
			}]
    }
  })
  new FileButton({
    renderTo: $body,
    text: chance.word(),
    onProgress: function () {
      console.log('0')
    }
  })
  new Button({
    renderTo: $body,
    text: chance.word(),
    href: '/google.com'
  })
})
