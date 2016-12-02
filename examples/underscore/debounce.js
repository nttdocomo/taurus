/**
 * @author nttdocomo
 */
define(function(require) {
	var $ = require("../../src/jquery"),
	_ = require("../../src/underscore");
	$('span:eq(0)').on('click',_.debounce(function(){
		console.log('span')
	},100))
});
