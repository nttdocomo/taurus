/**
 * @author nttdocomo
 */
define(function(require) {
	require("backbone");
	var ProgressBar = require("../../src/progressBar.js");
	var $body = $("#main");
	var progressBar = new ProgressBar({
		renderTo:$body
	})
	progressBar.updateProgress(0.5,'50%',true)
})