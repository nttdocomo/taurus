/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('../view/base');
	return taurus.view('taurus.spinner.Wave',Base.extend({
		tpl:'<div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div>',
		className:'spinner wave'
	}))
})
