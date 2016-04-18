/**
 * @author nttdocomo
 */
seajs.config({
	alias : {
	    'button':'taurus/button/button',
	    //'backbone-pageable':'../../src/backbone-pageable'/*,
	    //'underscore':'../../src/backbone-pageable'
	},
	paths: {
		'taurus':'./'
	},
	base : location.pathname.replace(/^(\/taurus)?\/.*/,'$1') + '/src',
	charset : 'utf-8',
	vars : {
		'locale' : (navigator.language || navigator.browserLanguage).toLowerCase()
	}
});
