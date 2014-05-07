/**
 * @author nttdocomo
 */
seajs.config({
	plugins: ['shim'],
	alias : {
		'jquery': {
			exports: 'jQuery'
	    },
	    'underscore':{
			exports: 'underscore'
	    },
	    'backbone':{
	    	deps: ['jquery','underscore']
	    },
	    'jquery.ui.position':{
	    	deps: ['jquery']
	    },
	    'jquery.scrollIntoView':{
	    	deps: ['jquery']
	    },
	    'modernizr':{
	    	exports: 'Modernizr'
	    }
	},
	preload:['jquery','underscore','modernizr'],
	base : 'https://github.com/nttdocomo/taurus/tree/master/src/',
	charset : 'utf-8'
});