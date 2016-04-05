/**
 * @author nttdocomo
 */
seajs.config({
	plugins: ['shim'],
	alias : {
	    'button':'taurus/button/button'/*,
	    'underscore':'underscore',
	    'button':'taurus/button/button'*/
	},
	paths: {
		'taurus':'./'
	},
	base : '/src/',
	charset : 'utf-8',
	vars : {
		'locale' : (navigator.language || navigator.browserLanguage).toLowerCase()
	}
});
