/**
 * @author nttdocomo
 */
define(function (require) {
  var ProgressBar = require('../../src/spinner/progressBar')
  var Button = require('../../src/classic/button/button')
  var $body = $('#main')
  var progressBar = new ProgressBar({
    renderTo: $body
  })
  new Button({
    renderTo: $body,
    text: 'Start',
    listeners: {
      'click': function () {
				progressBar.show()
        progressBar.start()
      }
    }
  })
  new Button({
    renderTo: $body,
    text: 'Done',
    listeners: {
      'click': function () {
        progressBar.done()
      }
    }
  })
  progressBar.start()
/*setTimeout(function(){
	progressBar.done()
},5000)*/
})
