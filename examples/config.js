/**
 * @author nttdocomo
 */
seajs.config({
	plugins: ['shim'],
	alias : {
	    'button':'taurus/button/button'
	},
	paths: {
		'taurus':'./'
	},
	base : 'http://battle.ship.com/src/',
	charset : 'utf-8'
});