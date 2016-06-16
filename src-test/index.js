"use strict";
seajs.config({
	paths: {
		'taurus':'./'
	},
	base : location.pathname.replace(/^(\/taurus)?\/.*/,'$1') + '/src',
	charset : 'utf-8',
	vars : {
		'locale' : (navigator.language || navigator.browserLanguage).toLowerCase()
	}
});
//QUnit.config.autoload = false;
//QUnit.config.autostart = false;
seajs.use([
	'./form/field/combos',
	'./form/field/radio',
	'./form/field/text',
	'./tip/toolTip'
], function(combos,radio,text,toolTip){
	combos.run()
	radio.run()
	text.run()
	toolTip.run()
    // start QUnit.
    //QUnit.load();
    //QUnit.start();
});
