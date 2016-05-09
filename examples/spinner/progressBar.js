/**
 * @author nttdocomo
 */
define(function(require) {
	var ProgressBar = require("../../src/spinner/progressBar"),
    Button = require("../../src/classic/button/button"),
	$body = $("#main"),
	progressBar = new ProgressBar({
		renderTo : $body
	});
    new Button({
		renderTo : $body,
        text:'Sart',
        listeners:{
            'click':function(){
        		progressBar.start();
            }
        }
    })
    new Button({
		renderTo : $body,
        text:'Done',
        listeners:{
            'click':function(){
        		progressBar.done();
            }
        }
    })
	progressBar.start();
	/*setTimeout(function(){
		progressBar.done();
	},5000)*/
});
