/**
 * @author nttdocomo
 */
define(function (require) {
  var FileField = require('../../src/classic/form/field/fileUpload')
  var FileButton = require('../../src/classic/button/fileButton')
  var ProgressBar = require('../../src/spinner/progressBar')
  Backbone = require('../../src/backbone'),
  $body = $('#main')
  new FileField({
    renderTo: $body.find('#example-1'),
    fieldLabel: '应用平台',
    buttonOnly: true,
    fineUploaderOptions: {
      callbacks: {
        onProgress: function (id, name, uploadedBytes, totalBytes) {
          progressBar.show()
          progressBar.set(uploadedBytes / totalBytes)
        },
        onSubmit: function (id, name) {
          console.log(arguments)
        },
        onError: function (id, name, errorReason, xhr) {
          console.log(arugments)
        }
      }
    }
  })
  new FileButton({
    renderTo: $body.find('#example-2'),
    text: '上传',
    fineUploaderOptions: {
      callbacks: {
        onProgress: function (id, name, uploadedBytes, totalBytes) {
          progressBar.show()
          progressBar.set(uploadedBytes / totalBytes)
        },
        onSubmit: function (id, name) {
          console.log(arguments)
        },
				onError: function (id, name, errorReason, xhr) {
					console.log(arugments)
				}
      }
    }
  })
  var progressBar = new ProgressBar({
    renderTo: $body,
    isTrickle: false
  })
  progressBar.hide()
})
