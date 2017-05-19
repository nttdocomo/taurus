/**
 * @author nttdocomo
 */
/**
 * @author nttdocomo
 */
define(function (require) {
  require('backbone')
  var Button = require('../../src/classic/button/button')
  var Split = require('../../src/classic/button/split')
  var FileButton = require('../../src/classic/button/fileButton')
  var SVG = require('../../src/svg')
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
  var i = document.createElement('i')
  var svg = SVG(i).size(14, 14).attr({
    class:'circle-loader'
  })
  var icon = svg.circle().attr({
    cx: "7",
    cy: "7",
    r: "6"
  })
  console.log(svg.has(icon))
  var button = new Button({
    renderTo: $body.find('#example-4'),
    iconBeforeText: true,
    text: 'Primary',
    ui:'primary'
  })
  button.btnIconEl.append(svg.node)
  svg.clear()
  svg.add(icon)
  new Button({
    renderTo: $body.find('#example-4'),
    text: '开始加载',
    handler: function(){
      /*button.setIcon(function(btnIconEl){
        var icon
        if(!this.svg){
          this.svg = SVG(btnIconEl.get(0)).size(14, 14).attr({
            class:'circle-loader'
          })
        }
        icon = this.svg.clear().show().circle().attr({
          cx: "7",
          cy: "7",
          r: "6"
        })
        return icon
      })*/
      button.setIcon(i)
    }
  })
  new Button({
    renderTo: $body.find('#example-4'),
    text: '结束加载',
    handler: function(){
      console.log(button.svg.clear().hide())
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
  new Split({
    renderTo: $body,
    text: chance.word()
  })
})
