/**
 * @author nttdocomo
 */
define(function(require) {
	var File = require("../../src/classic/form/field/fileUpload"),
	ProgressBar = require("../../src/spinner/progressBar")
	Backbone = require("../../src/backbone"),
	$body = $("#main");
	new File({
		renderTo : $body,
		fieldLabel : '应用平台',
		buttonOnly:true,
		onProgress:function(id,name,uploadedBytes,totalBytes){
			progressBar.show();
			progressBar.set(uploadedBytes/totalBytes)
		}
	});
	var progressBar = new ProgressBar({
		renderTo : $body,
		isTrickle:false
	});
	progressBar.hide();
});
