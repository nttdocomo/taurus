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
	base : 'http://dev.taurus.com/src/',
	charset : 'utf-8'
});