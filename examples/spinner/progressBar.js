/**
 * @author nttdocomo
 */
define(function(require) {
	var ProgressBar = require("../../src/spinner/progressBar"),
	$body = $("#main");
	var progressBar = new ProgressBar({
		renderTo : $body
	});
	progressBar.start();
});
